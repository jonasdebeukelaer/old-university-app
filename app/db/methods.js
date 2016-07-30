'use strict';
const conf = require('../conf');
const Q = require('q');
const escape = require('mysql').escape;
const pwh = require('password-hash');
const hashPassword = pwh.generate;
const verifyPassword = pwh.verify;

const makeFilter = filterList => {
    const filter = filterList.map(curr => `${curr.key} ${curr.op} ${escape(curr.value)}`);
    filter.push(' True ');
    return filter.join(' and ');
};

const query = (select, table, filterList) =>
    `SELECT ${select.join(', ')} FROM ${table} WHERE ${makeFilter(filterList)}`;

const update = (table, filterList) =>
    `UPDATE ${table} SET ? WHERE ${makeFilter(filterList)}`;

const insert = table =>
    `INSERT INTO ${table} SET ?`;

const destroy = (table, filterList) =>
    `DELETE FROM ${table} WHERE ${makeFilter(filterList)}`;

const generateVerificatonCode = email => {
    let hash = hashPassword(email);
    return hash.substr(hash.length - 8, 8);
};

function crudMethods (con) {
    return {
        validateUser: (email, pwd) => {
            const deferred = Q.defer();
            const filterOpts = [
                {key:conf.db.keys.users.email, op: '=', value: email},
                {key:conf.db.keys.users.verified, op: '=', value: '1'}];
            const queryString = query([conf.db.keys.users.uid, conf.db.keys.users.password], conf.db.tables.users, filterOpts);
            con.query(queryString, (err, rows) => {
                if (err) return deferred.reject(new Error(err));
                if (!rows || rows.length == 0) return deferred.reject(new Error("No match"));
                if (!verifyPassword(pwd, rows[0][conf.db.keys.users.password])) return deferred.reject(new Error('Wrong password'));
                deferred.resolve(rows[0][conf.db.keys.users.uid]);
            });
            return deferred.promise;
        },

        emailNotInUse: email => {
            const deferred = Q.defer();
            const filterOpts = [
                {key: conf.db.keys.users.email, op: '=', value: email}
            ];
            const queryString = query([conf.db.keys.users.uid], conf.db.tables.users, filterOpts);
            con.query(queryString, (err, rows) => {
                if (err) return deferred.reject(new Error(err));
                if (rows.length > 0) return deferred.reject(new Error("Email already in use"));
                deferred.resolve();
            });
            return deferred.promise;
        },

        createUser: (email, pwd) => {
            console.log("create user " + email + " " + "pwd")
            const deferred = Q.defer();
            const user = {
                [conf.db.keys.users.email]: email,
                [conf.db.keys.users.password]: hashPassword(pwd),
                [conf.db.keys.users.verification]: generateVerificatonCode(email)
            };
            const insertString = insert(conf.db.tables.users);
            con.query(insertString, user, (err, row) => {
                if (err) return deferred.reject(new Error(err));
                deferred.resolve({
                    id: row[conf.db.keys.users.uid],
                    email: user.email,
                    verification: user.verification
                });
            });
            return deferred.promise;
        },

        verifyEmail: (email, verificationCode) => {
            const deferred = Q.defer();
            const filterOpts = [
                {key: conf.db.keys.users.email, op: '=', value: email},
                {key: conf.db.keys.users.verification, op: '=', value: verificationCode}
            ];
            const updateString = update(conf.db.tables.users, filterOpts);
            const put = {verified: 1};
            con.query(updateString, put, (err, res) => {
                if (err) return deferred.reject(new Error(err));
                deferred.resolve();
            });
            return deferred.promise;
        },

        isNotBanned: uid => {
            const deferred = Q.defer();
            const filterOpts = [
                {key: conf.db.keys.users.uid, op: '=', value: uid}
            ];
            const queryString = query([conf.db.keys.users.blocked], conf.db.tables.users, filterOpts);
            con.query(queryString, (err, rows) => {
                if (err) return deferred.reject(new Error(err));
                if (!rows || rows.length == 0) return deferred.reject(new Error('User not found'));
                if (rows[0][conf.db.keys.users.blocked] == 1) return deferred.reject(new Error('User is banned'));
                deferred.resolve();
            });
            return deferred.promise;
        },

        getSourceRole: ids => {
            const deferred = Q.defer();
            const sourceId = ids.source;
            const targetId = ids.target;
            const sourceFilter = [
                {key: conf.db.keys.users.uid, op: '=', value: sourceId}
            ];
            const sourceQuery = query([conf.db.keys.users.admin], conf.db.tables.users, sourceFilter);
            con.query(sourceQuery, (err, rows) => {
                if (err) return deferred.reject(new Error(err));
                if (!rows || rows.length == 0) return deferred.reject(new Error("Source user not found"));
                const sourceRole = rows[0][conf.db.keys.users.admin] == 1 ? 'admin' : 'user';
                deferred.resolve({sourceRole: sourceRole, sourceId: sourceId, targetId: targetId});
            });
            return deferred.promise;
        },

        getTargetRole: rolesAndIds => {
            const deferred = Q.defer();
            const sourceRole = rolesAndIds.sourceRole;
            const sourceId = rolesAndIds.sourceId;
            const targetId = rolesAndIds.targetId;
            const targetFilter = [
                {key: conf.db.keys.users.uid, op: '=', value: targetId}
            ];
            const targetQuery = query([conf.db.keys.users.admin], conf.db.tables.users, targetFilter);
            con.query(targetQuery, (err, rows) => {
                if (err) return deferred.reject(new Error(err));
                if (sourceId == targetId) return deferred.resolve({source: sourceRole, target: 'self'});
                if (targetId == 'every') return deferred.resolve({source: sourceRole, target: 'every'});
                if (!rows || rows.length == 0) return deferred.reject(new Error("Target user not found"));
                const targetRole = rows[0][conf.db.keys.users.admin] == 1 ? 'admin' : 'user';
                deferred.resolve({source: sourceRole, target: targetRole});
            });
            return deferred.promise;
        },

        getUserData: (uid, fields) => {
            const deferred = Q.defer();
            const filterOpts = [
                {key: conf.db.keys.users.uid, op: '=', value: uid}
            ];
            const queryString = query(fields, conf.db.tables.users, filterOpts);
            con.query(queryString, (err, rows) => {
                if (err) return deferred.reject(new Error(err));
                if (!rows || rows.length == 0) return deferred.reject(new Error('User not found'));
                deferred.resolve(rows[0]);
            });
            return deferred.promise;
        },

        getAllUserData: fields => {
            const deferred = Q.defer();
            const queryString = query(fields, conf.db.tables.users, []);
            con.query(queryString, (err, rows) => {
                if (err) return deferred.reject(new Error(err));
                if (!rows) return deferred.reject(new Error());
                deferred.resolve(rows);
            });
            return deferred.promise;
        },

        updateUserData: (uid, data) => {
            const deferred = Q.defer();
            const filterOpts = [
                {key: conf.db.keys.users.uid, op: '=', value: uid}
            ];
            if (!!data.password)
                data.password = hashPassword(data.password);
            const updateString = update(conf.db.tables.users, filterOpts);
            con.query(updateString, data, (err, _) => {
                if (err) return deferred.reject(new Error(err));
                deferred.resolve();
            });
            return deferred.promise;
        },

        deleteUser: uid => {
            const deferred = Q.defer();
            const filterOpts = [
                {key: conf.db.keys.users.uid, op: '=', value: uid}
            ];
            const deleteString = destroy(conf.db.tables.users, filterOpts);
            con.query(deleteString, (err, res) => {
                if (err) return deferred.reject(new Error(err));
                deferred.resolve();
            });
            return deferred.promise;
        },

        getUserFromPost: postId => {
            const deferred = Q.defer();
            const filterOpts = [
                {key: conf.db.keys.posts.postId, op: '=', value:postId}
            ];
            const queryString = query([conf.db.keys.posts.uid],conf.db.tables.posts, filterOpts);
            con.query(queryString, (err, rows) => {
                if (err) return deferred.reject(new Error(err));
                if (!rows || rows.length == 0) return deferred.reject(new Error());
                deferred.resolve(rows[0][conf.db.keys.posts.uid]);
            });
            return deferred.promise;
        },

        getPost: postId => {
            const deferred = Q.defer();
            const filterOpts = [
                {key: conf.db.keys.posts.postId, op: '=', value:postId}
            ];
            const queryString = query([conf.db.keys.posts.postId, conf.db.keys.posts.uid, conf.db.keys.posts.content],
                conf.db.tables.posts, filterOpts);
            con.query(queryString, (err, rows) => {
                if (err) return deferred.reject(new Error(err));
                if (!rows) return deferred.reject(new Error());
                deferred.resolve(rows[0]);
            });
            return deferred.promise;
        },

        getPostsByUser: uid => {
            const deferred = Q.defer();
            const filterOpts = [
                {key: conf.db.keys.posts.uid, op: '=', value: uid}
            ];
            const queryString = query([conf.db.keys.posts.postId, conf.db.keys.posts.content],
                conf.db.tables.posts, filterOpts);
            con.query(queryString, (err, rows) => {
                if (err) return deferred.reject(new Error(err));
                if (!rows) return deferred.reject(new Error());
                deferred.resolve(rows);
            });
            return deferred.promise;
        },

        addPost: (uid, content) => {
            const deferred = Q.defer();
            const post = {[conf.db.keys.posts.uid]: uid, [conf.db.keys.posts.content]: content};
            const insertString = insert(conf.db.tables.posts);
            con.query(insertString, post, (err, res) => {
                if (err) return deferred.reject(new Error(err));
                deferred.resolve();
            });
            return deferred.promise;
        },

        editPost: (postId, content) => {
            const deferred = Q.defer();
            const post = {[conf.db.keys.posts.content]: content};
            const filterOpts = [
                {key: conf.db.keys.posts.postId, op: '=', value: postId}
            ];
            const updateString = update(conf.db.tables.posts, filterOpts);
            con.query(updateString, post, (err, res) => {
                if (err) return deferred.reject(new Error(err));
                deferred.resolve();
            });
            return deferred.promise;
        },

        deletePost: postId => {
            const deferred = Q.defer();
            const filterOpts = [
                {key: conf.db.keys.posts.postId, op: '=', value: postId}
            ];
            const deleteString = destroy(conf.db.tables.posts, filterOpts);
            con.query(deleteString, (err, res) => {
                if (err) return deferred.reject(new Error(err));
                deferred.resolve();
            });
            return deferred.promise;
        }
    }
}

module.exports = crudMethods;

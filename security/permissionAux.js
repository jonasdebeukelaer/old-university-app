const Q = require('q');
const conf = require('../conf');
const db = require('../db');

function isAllowed (sourceRole, action, targetRole, targetFields) {
    return targetFields.every(field => {
        return !!conf.permissions[sourceRole][action][targetRole].all
         || !!conf.permissions[sourceRole][action][targetRole][field];
    });
}

function verifyAccess (next, sourceRole, targetRole, fields, action) {
    try{
        if (isAllowed(sourceRole, action, targetRole, fields))
            return next();
        return next(new Error('Permission denied'));
    } catch (err) {
        next(new Error('Permission denied'));
    }
}

function getTargetId (req, sourceId, entity) {
    const deferred = Q.defer();
    if (!!req.params.uid) {
        deferred.resolve({source: sourceId, target: req.params.uid});
    } else if (entity === 'posts') {
        db.getUserFromPost(req.params.postId).then(targetId => {
            deferred.resolve({source: sourceId, target: targetId});
        });
    } else {
        deferred.resolve({source: sourceId, target: 'every'});
    }
    return deferred.promise;
}

module.exports = {
    verifyAccess: verifyAccess,
    getTargetId: getTargetId
};


const conf = require('../conf');
const aux = require('./permissionAux');
const db = require('../db');

// Permission middleware

function verifyUserReadAccess (req, res, next) {
    const sourceRole = req.roles.source;
    const targetRole = req.roles.target;
    let targetFields = [];
    if (!!req.params.field)
        targetFields = [req.params.field];
    else
        targetFields = conf.permissions.defaultGetKeys;
    req.targetFields = targetFields;
    aux.verifyAccess(next, sourceRole, targetRole, targetFields, 'view');
}

function verifyUserWriteAccess(req, res, next) {
    const sourceRole = req.roles.source;
    const targetRole = req.roles.target;
    const postData = req.body;
    req.data = postData;
    aux.verifyAccess(next, sourceRole, targetRole, Object.keys(postData), 'edit');
}

function verifyDeleteAccess (entity) {
    return (req, res, next) => {
        const sourceRole = req.roles.source;
        const targetRole = req.roles.target;
        aux.verifyAccess(next, sourceRole, targetRole, [entity], 'destroy');
    };
}

function verifyPostAccess (action) {
    return (req, res, next) => {
        const sourceRole = req.roles.source;
        const targetRole = req.roles.target;
        req.content = req.body.content;
        aux.verifyAccess(next, sourceRole, targetRole, ['posts'], action);
    };
}

function setRoles (entity) {
    return (req, res, next) => {
        const sourceId = req.user.id;
        aux.getTargetId(req, sourceId, entity)
        .then(db.getSourceRole)
        .then(db.getTargetRole)
        .then(roles => {
            req.roles = {
                source: roles.source,
                target: roles.target
            };
            next();
        }).catch(err => {
            next(err);
        });
    };
}

function filterBanned(req, res, next) {
    db.isNotBanned(req.user.id)
        .then(() => next())
        .catch(err => {
            next(err);
        });
}

function permissionError(err, req, res, next) {
    if (err) res.status(403).send(err);
    else next();
}

module.exports = {
    verifyUserReadAccess: verifyUserReadAccess,
    verifyUserWriteAccess: verifyUserWriteAccess,
    verifyDeleteAccess: verifyDeleteAccess,
    verifyPostAccess: verifyPostAccess,
    setRoles: setRoles,
    filterBanned: filterBanned,
    permissionError: permissionError
};
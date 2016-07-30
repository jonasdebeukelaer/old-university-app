const jwt = require('jsonwebtoken');
const conf = require('../conf');
const db = require('../db');

// Auth token middleware

function serialize(req, res, next) {
    return db.validateUser(req.body.email, req.body.password)
    .then(uid => {
        req.user = {
            id: uid
        };
        next();
    }).catch(err => next(new Error(err)));
}

function generateToken(req, res, next) {
    req.token = jwt.sign({
        id: req.user.id
    }, conf.token.secret);
    next();
}

function returnToken(req, res) {
    res.status(200).json({
        user: req.user.id,
        token: req.token
    });
}

function loginError(err, req, res, next) {
    if (err) return res.status(403).send(err);
    next();
}

function verifyToken(req, res, next) {
    const token = req.get(conf.token.header);
    console.log(token) //TODO remove this when comfortable with auth
    jwt.verify(token, conf.token.secret, function (err, decoded) {
        if (err) return(next(new Error(err)));
        req.user = {id: decoded.id};
        next();
    });
}

module.exports = {
    serialize : serialize,
    generateToken : generateToken,
    returnToken : returnToken,
    loginError: loginError,
    verifyToken: verifyToken
};

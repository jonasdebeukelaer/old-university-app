const db = require('../db');
const conf = require('../conf');
const emailTemplate = require('../emailTemplate');
const mailgun = require('mailgun-js')({apiKey: conf.mailgun.apiKey, domain: conf.mailgun.domain});
const Q = require('q');

function sendMail(user) {
    const deferred = Q.defer();
    const data = {
        from: conf.mailgun.sender,
        to: user.email,
        subject: conf.mailgun.subject,
        html: emailTemplate(user.verification, user.email)
    };
    mailgun.messages().send(data, (error, body) => {
        if (error) return deferred.reject(new Error(error));
        deferred.resolve(user);
    });
    return deferred.promise;
}

function setup(req, res) {
    const pwd = req.body.password;
    const email = req.body.email;
    console.log(email + "\t" + pwd)
    db.emailNotInUse(email)
        .then(() => db.createUser(email, pwd))
        .then(sendMail)
        .then(user => res.status(200).send(user.id))
        .catch(err => res.status(500).send(err));
}

function verify(req, res) {
    const email = req.query.email;
    const verification = req.query.verification;
    db.verifyEmail(email, verification).then(() => {
        res.redirect(conf.emailVerificationRedirect);
    }).catch(err => {
        res.status(500).send(err);
    });
}

module.exports = {
    setup: setup,
    verify: verify
};
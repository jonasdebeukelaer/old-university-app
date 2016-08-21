var env = require('node-env-file');
env(__dirname + '/.envlocal');

const conf = {};

conf.port = 5000;

conf.mailgun = {
    apiKey: process.env.MAILGUN_API_KEY,
    domain: process.env.MAILGUN_DOMAIN,
    sender: 'postmaster@unisalad.com',
    subject: 'UniSalad - confirm email'
};

conf.emailVerificationRedirect = '0.0.0.0:9000/#/do/login?hello';
conf.apiEndpoint = 'localhost:5000';

// SSL certificate paths
conf.cert = {
    keypath : 'certfiles/server.key',
    certpath: 'certfiles/server.crt'
};

conf.token = {
    secret: process.env.TOKEN_SECRET,
    header: 'authorization'
};

conf.db = {
    host: 'localhost',
    user: process.env.DB_USER,
    password: process.env.DB_PWD,
    database: 'salad_db'
};

// MySQL string literals
conf.db.keys = {};
conf.db.keys.users = {
    uid : 'uid',
    creationDate: 'creationDate',
    forename: 'forename',
    surname: 'surname',
    email: 'email',
    password : 'password',
    verified: 'verified',
    verification: 'verification',
    admin: 'admin',
    blocked: 'blocked',
    posts: 'posts'
};

conf.db.keys.posts = {
    uid: 'uid',
    postId: 'postId',
    content: 'content',
    creationDate: 'creationDate'
};

// MySQL string literals
conf.db.tables = {
    users: 'users',
    posts: 'posts'
};

conf.permissions = {
    defaultGetKeys: [
        'email', 'forename', 'surname', 'admin', 'uid'
    ],
    user: {
        view:{
            user: {
                uid: false,
                email: false,
                forename: true,
                surname: true,
                admin: false,
                posts: true
            },
            self: {
                all: true
            },
            admin: {
                uid: false,
                email: false,
                forename: true,
                surname: true,
                admin: false,
                posts: false
            },
            every: {
                uid: false,
                email: false,
                forename: true,
                surname: true,
                admin: false
            }
        },
        edit: {
            user: {},
            self: {
                forename: true,
                surname: true,
                password: true,
                posts: true
            },
            admin: {}
        },
        destroy: {
            self: {
                posts: true,
                user: true
            },
            user: {},
            admin: {}
        }
    },
    admin: {
        view: {
            user: {
                uid: true,
                email: true,
                forename: true,
                surname: true,
                admin: true,
                posts: true
            },
            self: {
                all: true
            },
            admin: {
                uid: true,
                email: true,
                forename: true,
                surname: true,
                admin: true,
                posts: true
            },
            every: {
                uid: true,
                email: true,
                forename: true,
                surname: true,
                admin: true
            }
        },
        edit: {
            user: {
                email: true,
                forename: true,
                surname: true,
                admin: true,
                blocked: true,
                posts: true,
                verified: true
            },
            self: {
                email: true,
                forename: true,
                surname: true,
                admin: true,
                password: true,
                posts: true
            },
            admin: {
                email: true,
                forename: true,
                surname: true,
                admin: true,
                blocked: true,
                posts: true
            }
        },
        destroy: {
            self: {
                posts: true,
                user: true
            },
            user: {
                posts: true,
                user: true
            },
            admin: {
                posts: true,
                user: true
            }
        }
    }
};


module.exports = conf;
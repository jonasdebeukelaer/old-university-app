const exec = require('child_process').exec;
const hashPassword = require('password-hash').generate;
const conf = require('./conf');
const adminPwd = hashPassword(process.env.ADMIN_INIT_PWD);
const adminEmail = process.env.ADMIN_INIT_EMAIL;

const sql = `INSERT INTO ${conf.db.tables.users}
    (${conf.db.keys.users.uid}, ${conf.db.keys.users.email}, ${conf.db.keys.users.password}, ${conf.db.keys.users.admin},
       ${conf.db.keys.users.verified}, ${conf.db.keys.users.blocked})
    VALUES (1, "${adminEmail}", "${adminPwd}", 1, 1, 0)`;

const command = `mysql -p${conf.db.password} -u ${conf.db.user} -e '${sql}' ${conf.db.database}`;
exec(command, function (err, stdout, stderr) {
    console.log('stdout: ' + stdout);
    console.log('stderr: ' + stderr);
    if (err !== null) {
        console.log('exec error: ' + err);
    }
});
const fs = require('fs');
const https = require('https');
const http = require('http');
const express = require('express');
const bodyParser = require('body-parser');

const conf = require('./conf');
const routes = require('./routes');


const credentials = {
    key: fs.readFileSync(conf.cert.keypath, 'utf8'),
    cert: fs.readFileSync(conf.cert.certpath, 'utf8')
};

const app = express();

app.use(bodyParser.json());

app.use('/api', routes);

https.createServer(credentials, app).listen(process.env.PORT || conf.port);

console.log('Started server on port ' + conf.port);
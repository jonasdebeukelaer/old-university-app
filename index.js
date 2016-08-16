const fs = require('fs');
const https = require('https');
const http = require('http');
const express = require('express');
const bodyParser = require('body-parser');
const morgan = require('morgan');

const conf = require('./conf');
const routes = require('./routes');

const credentials = {
    key: fs.readFileSync(conf.cert.keypath, 'utf8'),
    cert: fs.readFileSync(conf.cert.certpath, 'utf8')
};

const app = express();

app.use(bodyParser.json());
app.use(morgan('dev')); 
app.use(express.static(__dirname + '/static'));
app.use('/api', routes);

app.listen(process.env.PORT || conf.port);
//https.createServer(credentials, app).listen(process.env.PORT || conf.port);

console.log('Started server on port ' + (process.env.PORT || conf.port));
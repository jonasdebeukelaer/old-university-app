const https = require('https');
const express = require('express');
const bodyParser = require('body-parser');
const morgan = require('morgan');

const conf = require('./conf');


const app = express();

app.use(bodyParser.json());
app.use(morgan('dev')); 

app.use(express.static('static'));

https.createServer({}, app).listen(process.env.PORT || conf.port);

console.log('Started server on port ' + (process.env.PORT || conf.port));
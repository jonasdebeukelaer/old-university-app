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
app.get('/',function(req,res){
  res.sendFile(path.join(__dirname+'/index.html'));
});

app.use('/api', routes);

https.createServer(credentials, app).listen(process.env.PORT || conf.port);

console.log('Started server on port ' + (process.env.PORT || conf.port));

// var express = require("express");
// var app     = express();
// var path    = require("path");

// app.use(express.static(__dirname + '/static'));
// app.get('/',function(req,res){
//   res.sendFile(path.join(__dirname+'/index.html'));
// });

// app.listen(process.env.PORT ||  3000);



// console.log("Running at Port " + (process.env.PORT || "3000");
const fs = require('fs');
const https = require('https');
const http = require('http');
const express = require('express');
const bodyParser = require('body-parser');

// const cors = require('cors');  //TODO remove in prod

const conf = require('./conf');
const routes = require('./routes');


const credentials = {
    key: fs.readFileSync(conf.cert.keypath, 'utf8'),
    cert: fs.readFileSync(conf.cert.certpath, 'utf8')
};

const app = express();

app.use(bodyParser.json());
// app.use(cors()); //TODO remove in prod
// app.use(function (req, res, next) {
// 	// Website you wish to allow to connect
//     res.setHeader('Access-Control-Allow-Origin', 'http://0.0.0.0:9000');

//     // Request methods you wish to allow
//     res.setHeader('Access-Control-Allow-Methods', 'GET, POST, OPTIONS, PUT, PATCH, DELETE');

//     // Request headers you wish to allow
//     res.setHeader('Access-Control-Allow-Headers', 'X-Requested-With,content-type');

//     // Set to true if you need the website to include cookies in the requests sent
//     // to the API (e.g. in case you use sessions)
//     res.setHeader('Access-Control-Allow-Credentials', true);

//     // Pass to next layer of middleware
//     next();
// })
app.use('/api', routes);

https.createServer(credentials, app).listen(process.env.PORT || conf.port);

console.log('Started server on port ' + conf.port);
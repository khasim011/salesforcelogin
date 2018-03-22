const express = require('express');
const bodyParser = require('body-parser');
const path = require('path');
const http = require('http');
const app = express();

// API file for interacting
const api = require('./RestAPI/api');

// Parsers
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: false}));

//CORS access permission
app.all('/*', function(req, res, next) {
	res.setHeader("Access-Control-Allow-Origin", "*");
    res.setHeader("Access-Control-Allow-Credentials", "true");
    res.setHeader("Access-Control-Allow-Methods", "GET,HEAD,OPTIONS,POST,PUT");
    res.setHeader("Access-Control-Allow-Headers", "Access-Control-Allow-Headers, Origin,Accept, X-Requested-With, Content-Type, Access-Control-Request-Method, Access-Control-Request-Headers");
  next();
});

// API location
app.use('/api', api);

//Set Port
const port = process.env.PORT || '5000';
app.set('port', port);

const server = http.createServer(app);

server.listen(port, () => console.log('Running on localhost:' + port));
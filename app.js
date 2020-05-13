var express = require('express');
var config = require('./config/main.config');
var helmet = require('helmet');
var app = express();

// Middlewares
app.use(helmet());
app.disable('x-powered-by');

// CORS & HEADER SECURITY
app.all('/*',(req, res, next) => {
    res.setHeader("X-Powered-By","abhijeet");
    res.header('Access-Control-Allow-Origin', '*');
    res.header('Access-Control-Allow-Methods', 'GET,PUT,POST,DELETE');
    res.header('Access-Control-Allow-Headers', 'Content-Type');
    next();
});

// ROUTES OF API
app.get('/',(req, res) => {
    res.send("Hello world");
});

// SERVER 
app.listen(config.port, () => console.log("server running at "+config.port));
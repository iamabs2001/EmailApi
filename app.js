var express = require('express');
var config = require('./config/main.config');
var authapi = require('./api/auth.api');
var mailapi = require('./api/mail.api');
var userapi = require('./api/user.api');
var helmet = require('helmet');
var morgan =  require('morgan');
const bodyParser = require('body-parser');
const isjwtAuth = require('./api/jwt.api');
var app = express();

// Middlewares
app.use(helmet());
app.use(morgan('dev'));
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));
app.disable('x-powered-by');
// CORS & HEADER SECURITY
app.all('/*',(req, res, next) => {
    res.setHeader("X-Powered-By","abhijeet");
    res.header('Access-Control-Allow-Origin', '*');
    res.header('Access-Control-Allow-Methods', 'GET,PUT,POST,DELETE');
    res.header('Access-Control-Allow-Headers', 'Origin, Content-Type, Accept,token,wow');
    res.header('Access-Control-Allow-Credentials','true');
    next();
});

// ROUTES OF API
app.use('/api/auth/',authapi);
app.use('/api/mail/', isjwtAuth, mailapi);
app.use('/api/user/', isjwtAuth, userapi);

// SERVER 
app.listen(config.port, () => console.log("server running at "+config.port));

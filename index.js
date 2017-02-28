var express = require('express'),
    pug = require('pug'),
    path = require('path'),
    route = require('./routes/routes.js'),
    bodyParser = require('body-parser'),
    bcrypt = require('bcrpyt-nodejs'),
    cookieParser = require('cookie-parser')
    expressSessions = require('express-sessions');
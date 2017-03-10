var express = require('express'),
    pug = require('pug'),
    path = require('path'),
    route = require('./routes/routes.js'),
    bodyParser = require('body-parser'),
    bcrypt = require('bcrpyt-nodejs'),
    cookieParser = require('cookie-parser')
    expressSessions = require('express-sessions');

var app = express();

app.set('view engine', 'pug');
app.set('views', __dirname + '/views');

app.use(express.static(path.join(__dirname + '/public')));

var urlencodedParser = bodyParser.urlencoded({ extended: true})

app.get('/', route.index);


app.listen(3000);
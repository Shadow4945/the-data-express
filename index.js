var express = require('express'),
    pug = require('pug'),
    path = require('path'),
    route = require('./routes/routes.js'),
    bodyParser = require('body-parser'),
    bcrypt = require('bcrypt-nodejs'),
    cookieParser = require('cookie-parser')
    expressSessions = require('express-session');

var app = express();

app.set('view engine', 'pug');
app.set('views', __dirname + '/views');

app.use(cookieParser());
app.use(express.static(path.join(__dirname + '/public')));
app.use(expressSessions({secret:'ihavenoideawhatimdoing'}));

var urlencodedParser = bodyParser.urlencoded({ extended: true})

    app.get('/', route.index);
    app.get('/login', route.login);
    app.post('/login',urlencodedParser, route.loggedIn);
    app.get('/admin', route.admin);
    app.get('/createAccount', route.create);
    app.post('/createAccount', urlencodedParser, route.createAccount);
    app.get('/edit/:id', route.edit);
    app.post('/edit/:id', urlencodedParser, route.editAccount);
    app.get('/delete/:id', route.delete);
    app.get('/logout', route.logout);

app.listen(3000);
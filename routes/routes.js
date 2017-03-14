var mongoose = require('mongoose');
mongoose.Promise = global.Promise;
mongoose.connect('mongodb://localhost/data');

var mdb = mongoose.connection;
mdb.on('error', console.error.bind(console, 'connection error:'));
mdb.once('open', function (callback) {

});
var bcrypt = require('bcrypt-nodejs');
var hash;
// var ctx1 = document.getElementById('question1').getContext("2d");
// var ctx2 = document.getElementById('question2').getContext("2d");
// var ctx3 = document.getElementById('question3').getContext("2d");


var userSchema = mongoose.Schema({
    username: String,
    password: String,
    access_level: String,
    email: String,
    age: String,
    answer1: String,
    answer2: String,
    answer3: String
});

var User = mongoose.model('Data_Express_Collection', userSchema);


exports.index = function (req, res) {
    var currentUser;
    if(req.session.username){
        if(req.session.username == "admin"){
        User.find(function (err, _user) {
        if (err) return console.error(err);
        for(var i = 0; i < _user.length; i++){
            if(_user[i].username == req.session.username){
                currentUser = _user[i]._id;
            }   
        }
        //console.log(currentUser);
        res.render('index', {
            navbar1: "div class='navbar'",
            navbar2: "ul",
            navbar3: "li",
            navbar4: "a href='/'",
            navbar5: "Home",
            navbar6: "a href='/admin'",
            navbar7: "Admin Page",
            navbar8: "a href='/edit/" + currentUser + "'",
            navbar9: "Edit",
            navbar10: "a href='/logout'",
            navbar11: "Logout",
           // canvasScript: "var ctx = document.getElementById('question1').getContext('2d')",
            cookie: "Last Visited: " + req.session.lastVisited
        });
    });
    }else{
        User.find(function (err, _user) {
        if (err) return console.error(err);
        for(var i = 0; i < _user.length; i++){
            if(_user[i].username == req.session.username){
                currentUser = _user[i]._id;
            }   
        }
        res.render('index', {
            navbar1: "div class='navbar'",
            navbar2: "ul",
            navbar3: "li",
            navbar4: "a href='/'",
            navbar5: "Home",
            navbar6: "a href='/edit/" + currentUser + "'",
            navbar7: "Edit",
            navbar8: "a href='/logout'",
            navbar9: "Logout",
            //canvasScript: "var ctx = document.getElementById('question1').getContext('2d')",
            cookie: "Last Visited: " + req.session.lastVisited
        });
    });
    }
    }else{
        User.find(function (err, _user) {
        if (err) return console.error(err);
        res.render('index', {
            navbar1: "div class='navbar'",
            navbar2: "ul",
            navbar3: "li",
            navbar4: "a href='/'",
            navbar5: "Home",
            navbar6: "a href='/login'",
            navbar7: "Login",
            navbar8: "a href='/createAccount'",
            navbar9: "Create Account",
            //canvasScript: "var ctx1 = document.getElementById('question1').getContext('2d'); var ctx2 = document.getElementById('question2').getContext('2d'); var ctx3 = document.getElementById('question3').getContext('2d'); var graph1 = new BarGraph(ctx1); graph1.margin = 2; graph1.width = 450; graph1.height = 150; graph1.xAxisLabelArr = ['Red', 'Blue', 'Green']; "
        });
    });
    }
    
}
exports.create = function (req, res) {
    res.render('createAcc');
}

exports.admin = function (req, res) {
    User.find(function (err, user) {
        if (err) return console.error(err);
        res.render('admin', {
            library: user
        });
    })

}

exports.createAccount = function (req, res) {
    //CRUD here
    var _user; 

    bcrypt.hash(req.body.password, null, null, function (err, hash) {
        console.log(hash);
        _user = new User({
        username: req.body.username,
        password: hash,
        access_level: req.body.access_level,
        email: req.body.email,
        age: req.body.age,
        answer1: req.body.colorQ,
        answer2: req.body.degreeQ,
        answer3: req.body.petQ
    });

     _user.save(function (err, _user) {
        if (err) return console.error(err);
        console.log(_user + ' added');
    });

    });
    // var _user = new User({
    //     username: req.body.username,
    //     password: hash,
    //     access_level: req.body.access_level,
    //     email: req.body.email,
    //     age: req.body.age,
    //     answer1: req.body.answer1,
    //     answer2: req.body.answer2,
    //     answer3: req.body.answer3
    // });
   
    res.redirect('/');
}

exports.edit = function (req, res) {
    //CRUD
    User.findById(req.params.id, function (err, _user) {
        if (err) return console.error(err);
        res.render('edit', {
            user: _user
        });
    });
}

exports.editAccount = function (req, res) {
    //CRUD
    User.findById(req.params.id, function (err, _user) {
        if (err) return console.error(err);
        _user.username = req.body.username;
        bcrypt.compare(req.body.password, _user.password, function (err, res) {
            if (res) {

            } else {
                _user.password = req.body.password;
            }
        });
        _user.access_level = req.body.access_level;
        _user.email = req.body.email;
        _user.age = req.body.age;
        _user.answer1 = req.body.answer1;
        _user.answer2 = req.body.answer2;
        _user.answer3 = req.body.answer3;
        _user.save(function (err, _user) {
            if (err) return console.error(err);
            console.log(req.body.username + 'updated');
        });

    });
    res.redirect('/');
}

exports.delete = function (req, res) {
    //CRUD
    User.findByIdAndRemove(req.params.id, function (err, _user) {
        if (err) return console.error(err);
        res.redirect('/');
    });
}

exports.login = function (req, res) {
    if(req.session.username){
        console.log("WAT IS GOING ON");
    }
    res.render('login');
}

exports.loggedIn = function (req, res) {
    var j;
    var rn = new Date();
    rn = rn.getFullYear()+'-'+(rn.getMonth()+1)+'-'+rn.getDate()+ ' ' + rn.getHours() + ":"+rn.getMinutes()+":"+rn.getSeconds();
    req.session.username = req.body.username;
    req.session.lastVisited = req.session.visited || rn;
    req.visited = rn;
    User.find(function (err, _users) {
        if (err) return console.error(err);
        for (var i = 0; i < _users.length; i++) {
            if (_users[i].username == req.body.username) {
                //console.log(_users[i].password);
                j = i;
                bcrypt.compare(req.body.password, _users[i].password, function (err, res) {
                    if (res) {
                        console.log(_users[j].access_level);
                        req.session.username = _users[j].access_level;
                    }
                });
                
            }
        }
    });
    res.redirect('/');
}

exports.logout = function(req,res){
    req.session.destroy(function(err){

    });
    res.redirect('/');
}

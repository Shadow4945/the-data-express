var mongoose = require('mongoose');
mongoose.Promise = global.Promise;
mongoose.connect('mongodb://localhost/data');

var mdb = mongoose.connection;
mdb.on('error', console.error.bind(console, 'connection error:'));
mdb.once('open', function (callback) {
    
});

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


exports.index = function(req, res){
    User.find(function (err, _user) {
        if (err) return console.error(err);
        res.render('index',{ title: 'Users', users: _user});
    }); 
}
exports.create = function(req, res){
    res.render('createAcc');
}

exports.admin = function(req,res){
    res.render('admin');
}

exports.createAccount = function(req, res){
    //CRUD here
    var _user = new User({ username: req.body.username, password: req.body.password, access_level: req.body.access_level, email: req.body.email, 
        age: req.body.age, answer1: req.body.answer1, answer2: req.body.answer2, answer3: req.body.answer3 });
    _user.save(function (err, _user){
        if(err) return console.error(err);
            console.log(req.body.username + 'added');
        });
    res.redirect('/');
}

exports.edit = function(req, res){
    //CRUD
    User.findById(req.params.id, function (err, _user) {
        if (err) return console.error(err);
        res.render('edit', { _user: _user });
    }); 
    res.render('edit');
}

exports.editAccount = function(req,res){
    //CRUD
    User.findById(req.params.id, function (err, _user){
        if (err) return console.error(err);
        _user.username = req.body.username;
        _user.password = req.body.password;
        _user.access_level = req.body.access_level;
        _user.email = req.body.email;
        _user.age = req.body.age;
        _user.answer1 = req.body.answer1;
        _user.answer2 = req.body.answer2;
        _user.answer3 = req.body.answer3;
        _user.save(function (err, _user){
            if (err) return console.error(err);
                console.log(req.body.username + 'updated');
        });
        
    });
    res.redirect('/');
}

exports.delete = function(req, res){
    //CRUD
    User.findByIdAndRemove(req.params.id, function (err, _user){
        if (err) return console.error(err);
        res.redirect('/');
    });
}

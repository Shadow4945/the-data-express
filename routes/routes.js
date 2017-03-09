var mongoose = require('mongoose');
mongoose.Promise = global.Promise;
mongoose.connect('mongodb://localhost/data');

var mdb = mongoose.connection;
mdb.on('error', console.error.bind(console, 'connection error:'));
mdb.once('open', function (callback) {
    
});

exports.index = function(req, res){
    res.render('index');
}
exports.create = function(req, res){
    res.render('createAcc');
}

exports.admin = function(req,res){
    res.render('admin');
}

exports.createAccount = function(req, res){
    //CRUD here
    res.redirect('/');
}

exports.edit = function(req, res){
    //CRUD
    res.render('edit');
}

exports.editAccount = function(req,res){
    //CRUD
    res.redirect('/');
}

exports.delete = function(req, res){
    //CRUD
    res.redirect('/');
}
var mongoose = require('mongoose');
//mongodb://<dbuser>:<dbpassword>@ds263847.mlab.com:63847/heroku_5b7815xd
// var db = mongoose.connect('mongodb://localhost:27017/webdev');
var db = mongoose.connect('mongodb://heroku_5b7815xd:jielumangodb1@ds263847.mlab.com:63847/heroku_5b7815xd');

module.exports = db;

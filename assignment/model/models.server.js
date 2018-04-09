var mongoose = require('mongoose');

var db = mongoose.connect('mongodb://localhost:27017/webdev');
// var db = mongoose.connect('mongodb://jielu:jielumangodb1@ds263847.mlab.com:63847/heroku_5b7815xd');

module.exports = db;




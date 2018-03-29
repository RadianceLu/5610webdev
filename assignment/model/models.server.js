var mongoose = require('mongoose');

// mongoose.connect('mongodb://localhost:27017/webdev');
var db = mongoose.connect('mongodb://jielu:jielumangodb1@ds263847.mlab.com:63847/heroku_5b7815xd');

module.exports = db;

// var db = {
//   local: 'mongodb://localhost:27017/webdev',
//   server: ''
// }
//
//
//
// var mongoDB = {
//   local: 'mongodb://localhost/webdev',
//   server: 'mongodb://aix:xihaxiao@ds139801.mlab.com:39801/heroku_8htvz1gn'
// };
//
// if (process.env.MONGODB_URI) {
//   console.log('-------------------------------');
//   console.log(process.env.MONGODB_URI);
//   mongoose.connect(mongoDB.server);
// } else {
//   mongoose.connect(mongoDB.local);
// }



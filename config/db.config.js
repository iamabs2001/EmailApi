var mongoose = require('mongoose');

var uri = "mongodb://localhost:27017/email";
// var uri = "mongodb+srv://abhijeetsharma248@gmail.com:iamabs2001@abhijeet-2pphm.mongodb.net/test?retryWrites=true&w=majority";

mongoose.connect(uri, { useUnifiedTopology: true , useNewUrlParser: true });

var db = mongoose.connection;

db.on('error', console.error.bind(console, 'connection error:'));

db.once('open', function() {
    console.log("Connection Successful!");
});

module.exports = db;
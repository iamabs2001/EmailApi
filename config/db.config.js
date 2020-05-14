var mongoose = require('mongoose');

var uri = "mongodb://localhost:27017/email";

mongoose.connect(uri, { useUnifiedTopology: true, useNewUrlParser: true });

var db = mongoose.connection;

db.on('error', console.error.bind(console, 'connection error:'));

db.once('open', function() {
    console.log("Connection Successful!");
});

module.exports = mongoose;
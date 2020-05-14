var mongoose = require('mongoose');
var config = require('./main.config');

mongoose.connect(config.dburl, { useUnifiedTopology: true, useNewUrlParser: true });

var db = mongoose.connection;

db.on('error', console.error.bind(console, 'connection error:'));

db.once('open', function() {
    console.log("Connection Successful!");
});

module.exports = mongoose;
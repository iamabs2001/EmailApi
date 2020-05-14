var mongoose = require('../config/db.config');

var userSchema = new mongoose.Schema({
    name : {
        type : String,
        required : true,
        maxlength : 50
    },
    email : {
        type : String,
        required : true,
        maxlength : 50,
        unique : true
    },
    password : {
        type : String,
        required : true,
        maxlength : 50,
    },
    status : {
        type : String,
        default : 'active'
    },
    profile : {
        type : String,
        default : 'http://www.iamabs.in/assets/icons/angular.svg'
    },
    versionKey : false
});

module.exports = mongoose.model('user',userSchema,'user');
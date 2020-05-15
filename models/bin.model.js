var mongoose = require('../config/db.config');

var binSchema = new mongoose.Schema({
   
   from : {
    type : String,
    required : true,
   }, 
   to : {
       type : String,
       required : true
   },
   time : {
        type : Date,
        default :Date.now
   },
   cc : {
       type : String
   },
   bcc : {
       type : String
   },
   subject : {
        type : String,
        maxlength : 60,
        required : true
   },
   body : {
       type : String,
       maxlength : 1000,
       required  : true
   },
   delbysender : {
       type  : Boolean,
       default : false
   },
   delbyreceiver : {
       type : Boolean,
       default : false
   },
    versionKey : false
});

module.exports = mongoose.model('bin',binSchema,'bin');
var mongoose = require('../config/db.config');

var mailSchema = new mongoose.Schema({
   from : {
    type : String,
    required : true,
   }, 
   to : {
       type : String,
       required : true
   },
   time : {
       type : time,
       required : true
   },
   date : {
       type : date,
       required : true
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

module.exports = mongoose.model('mail',mailSchema,'mail');
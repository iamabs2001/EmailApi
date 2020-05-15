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
       default : Date.now
   },
   cc : {
       type : String
   },
   bcc : {
       type : String
   },
   subject : {
        type : String,
        maxlength : 100,
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
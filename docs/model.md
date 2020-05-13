#user-model
_id
name : max 30 : required : String
email : max 30 : required : unique : String
password : max 50 : required : String (Bcrypt)
status : String
profile : String (_id : img to url)

#mail 
_id
from : String : required
to : string : required
time : time : required : Default(Now : client)
date  : date : required : default(Now : client)
cc : String (#user)
bcc : String (#user)
subject : String : max 80
body : String : max 500
delbysender : Boolean(Default=false)
delbyreceiver : Boolean(Default=false)

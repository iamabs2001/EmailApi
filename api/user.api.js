const router = require('express').Router();
const User = require('../models/user.model');
const bcrypt = require('bcrypt');
const config = require('../config/main.config');
const {check, validationResult} = require('express-validator');

// get user profile data
router.get('/profile',(req, res, next) => {
        if(req.user._id == undefined || req.user._id == null) res.json({"message":"Access deny"});
        User.findOne({ _id : req.user._id },(err, user) => {
            if(err) res.json({"error":err});
            if(user) res.json({"name" : user.name, "email":user.email,"status":user.status,"profile":user.profile });
            if(!user) res.json({"messgae":"user not found"});
        });
});

// edit user profile
router.put('/profile',[
    check('name','name is required').not().isEmpty().isLength({min:3,max:50}).withMessage('name should be of 3 to 50 character'),
    check('password','password is required').not().isEmpty().isLength({min:6,max:50}).withMessage('password length must between 6 to 50')
],(req, res, next) => {    
    
    let errors = validationResult(req);
    if(!errors.isEmpty()) return res.json({"error" : errors,success:false})

    // Check user exits or not
    User.findOne({ _id : req.user._id },(err, user) => {
        if(err) res.json({"error":err, success:false});
        if(!user) res.json({"message":"user does not exists",success:false});
        if(user) {
            // exits now update data
            bcrypt.hash(req.body.password, config.salt, (err,hash) => {  
                if(err) res.json({"error":err,success:false});
                let UserData = { name : req.body.name , password : hash, email : user.email}
                User.findOneAndUpdate({_id : req.user._id},UserData,{new: true},(err, data) => {
                    if(err) res.json({"error":err,success:false});
                    if(data) res.json({success:true,"message":"user updated"});
                });
            });
        }
    });

    
});


module.exports = router;
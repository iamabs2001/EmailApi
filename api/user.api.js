const router = require('express').Router();
const User = require('../models/user.model');
const bcrypt = require('bcrypt');
const config = require('../config/main.config');
const {check, validationResult} = require('express-validator');

// get user profile data
router.get('/profile',[
    check('email','email is required').not().isEmpty().isEmail().withMessage('Invalid email')
],(req, res, next) => {

    const errors = validationResult(req);
    if(!errors.isEmpty()) return res.json({"error" : errors});

        User.findOne({ email : req.query.email },(err, user) => {
            if(err) res.json({"error":err});
            if(user) res.json({"name" : user.name, "email":user.email,"status":user.status,"profile":user.profile });
            if(!user) res.json({"messgae":"user not found"});
        });
});

// edit user profile
router.put('/profile',[
    check('name','name is required').not().isEmpty().isLength({min:3,max:50}).withMessage('name should be of 3 to 50 character'),
    check('password','password is required').not().isEmpty().isLength({min:6,max:50}).withMessage('password length must between 6 to 50'),
    check('email','email is required').not().isEmpty().isEmail().withMessage('Invalid email')
],(req, res, next) => {    
    let errors = validationResult(req);
    if(!errors.isEmpty()) return res.json({"error" : errors})

    // Check user exits or not
    User.findOne({email : req.body.email },(err, user) => {
        if(!user) res.json({"message":"email does not exits",success:false});
    });

    bcrypt.hash(req.body.password, config.salt, (err,hash) => {  
        if(err) res.json({"error":err});
        let UserData = { name : req.body.name , password : hash, email : req.body.email }
        User.findOneAndUpdate({email:req.body.email},UserData,{new: true},(err, user) => {
            if(err) res.json({"error":err,success:false});
            if(user) res.json({success:true,"message":"user updated"});
        });
    });
});


module.exports = router;
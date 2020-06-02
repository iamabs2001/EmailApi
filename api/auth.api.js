const router = require('express').Router();
const { check, validationResult } = require('express-validator');
const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');
const config = require('../config/main.config');
const User = require('../models/user.model');

//  Login & return jwt 
router.post("/login",[
    check('email','Email is required').not().isEmpty().isEmail().withMessage('its Not a valid email'),
    check('password','password is required').not().isEmpty()
],(req, res, next) => {
    
    let errors = validationResult(req);
    if(!errors.isEmpty()) return res.json({"error" : errors,success:false})

    User.findOne({email : req.body.email }).then((user) => {
        if(!user)
            res.json({"message":"User not found",success:false})
        else {
            bcrypt.compare(req.body.password, user.password, function (err, result) {
                if (result == false) {
                    res.json({"message":"Incorrect password",success:false});
                } else {
                    let token = jwt.sign({ _id : user._id },config.secret,{expiresIn : config.expire});
                    res.json({"message":"Login Success",success:true,"token":token});
                }
         });
        }
     }); 
});

// Register a new user 
router.post("/signup",[
    check('name','name is required').not().isEmpty().isLength({min:3,max:50}).withMessage('name should be of 3 to 50 character'),
    check('email','Email is required').not().isEmpty().isEmail().withMessage('its Not a valid email').isLength({max:50}).withMessage('max length of email is 50'),
    check('password','password is required').not().isEmpty().isLength({min:6,max:50}).withMessage('password length must between 6 to 50')
],(req, res, next) => {
    
    let errors = validationResult(req);
    if(!errors.isEmpty()) return res.json({"error" : errors, success:false})

    // Check user exits or not
    User.findOne({email : req.body.email },(err, user) => {
        if(user) res.json({"message":"email already exits",success:false});
    });

    bcrypt.hash(req.body.password, config.salt, (err,hash) => {    
        if(err) res.json({success:false,"message":"Hasing / salting falied","error":err});
        let theuser = new User({
            name : req.body.name,
            email : req.body.email,
            password : hash
        });
        theuser.save().then(resps => {
            if(resps) {
                // let token = jwt.sign({ _id : user._id },config.secret,{expiresIn : config.expire});
                res.json({"message" : "signup successfull",success:true});
            } 
                res.json({"message" : "signup failed!","error":err,success:false})
        });
    });
});

// remove jwt 
router.get("/logout",(req, res, next) => {
    // remove token store in angular client app
    res.json({"message":"Logout Successfully",success:true});
});

// Return true is uesr is exists
router.post("/isuser/",[
    check('email','email is requied to know user').not().isEmpty().isEmail().withMessage('not a valid email')
],(req, res, next) => {

    let errors = validationResult(req);
    if(!errors.isEmpty()) return res.json({"error" : errors,success:false});

    User.findOne({ email : req.body.email},(err, data) => {
        if(err) res.json({"error": err,success:false})
        if(data) res.json({"message":"user found","name": data.name,success:true})
        else res.json({success:false,"message":"user not found"})
    });
});

module.exports = router;
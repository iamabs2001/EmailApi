const router = require('express').Router();
const { check, validationResult } = require('express-validator');
const User = require('../models/user.model');

//  Login & return jwt 
router.get("/login",(req, res, next) => {
    res.send("Login");
});

// Register a new user 
router.post("/signup",[
    check('name','name is required').not().isEmpty().isLength({min:3,max:50}).withMessage('name should be of 3 to 50 character'),
    check('email','Email is required').not().isEmpty().isEmail().withMessage('its Not a valid email').isLength({max:50}).withMessage('max length of email is 50'),
    check('password','password is required').not().isEmpty().isLength({min:6,max:50}).withMessage('password length must between 6 to 50')
],(req, res, next) => {
    
    var errors = validationResult(req);
    if(!errors.isEmpty()) {
        return res.json({"error" : errors})
    }

    var theuser = new User({
        name : req.body.name,
        email : req.body.email,
        password : req.body.password
    });

    theuser.save().then(data => {
        res.json({"message" : "signup successfull"});
    }).catch(err => {
        res.json({"message" : "signup failed!","error":err})
    });
});

// remove jwt 
router.get("/logout",(req, res, next) => {
    
});

// Return true is uesr is exists
router.post("/isuser/",[
    check('email','email is requied to know user').not().isEmpty().isEmail().withMessage('not a valid email')
],(req, res, next) => {
    var errors = validationResult(req);
    if(!errors.isEmpty()) {
        return res.json({"error" : errors});
    }

    let email = req.body.email;
    User.findOne({ email : email}).then(data => {
        res.json({"message":"user found","name":data.name});
    }).catch(err => {
        res.json({"message":"user not found"})
    })
});

module.exports = router;
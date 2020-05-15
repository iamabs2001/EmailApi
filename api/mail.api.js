const router = require('express').Router();
const Mail = require('../models/mail.model');
const User = require('../models/user.model');
const {check, validationResult} = require('express-validator');

// Send mail to a user
router.post("/send",[
    check('to','sender email is required').not().isEmpty().isEmail().withMessage('invalid email'),
    check('subject','subject can not be blank').not().isEmpty().isLength({max:100}).withMessage('subject must be less then 100 characters'),
    check('body','mail body is required').not().isEmpty().isLength({max:1000}).withMessage('mail body must be less then 1000 characters'),
],(req, res, next) => {

    var errors = validationResult(req);
    if(!errors.isEmpty()) return res.json({success:false,"messgae":"mail failed","error":errors});

    User.findOne({_id : req.user._id},(err,user) => {
        if(err) res.json({success:false,"error":err});
        if(!user) res.json({success:false,"message":"Sorry you can't sent mail"});
        if(user) {
            let themail = new Mail({
                from : user.email,
                to : req.body.to,
                subject: req.body.subject,
                body: req.body.body
            });
            themail.save().then(data => {
                res.json({success:true,"message":"mail has been sent","data":data});
            }).catch(err => {
                res.json({"messgae":"Mail failed",success:false,"error":err});
            })
        }
    });
    
});

router.get("/outbox",(req, res, next) => {
    User.findOne({_id : req.user._id},(err,user) => {
        if(err) res.json({success:false,"error":err});
        if(!user) res.json({success:false,"message":"you cant access outbox"});
        if(user) {
            Mail.find({from:user.email}).sort({time:1}).exec((err,sortedmails)=> {
                if(err) res.json({success:false,"error":err});
                res.json({"mails":sortedmails});
            });
        }
    });
});

// Unsend a mail
router.delete("/unsend",[
    check('mid','mail  m_id is required').not().isEmpty()
],(req, res, next) => {
    let errors = validationResult(req);
    if(!errors.isEmpty()) return res.json({success:false,"error":errors});

    Mail.findOne({_id : req.body.mid},(err,mail) => {
        if(err) res.json({success:false,"error":err});
        if(!mail) res.json({success:false,"message":"Mail not found"});
        if(mail) {
            User.findOne({_id : req.user._id},(err,user) => {
                if(err) res.json({success:false,"error":err});
                if(!user) res.json({success:false,"message":"you can't unsent message"});
                if(user) {
                    if(mail.from == user.email) {
                        Mail.findByIdAndDelete({_id:req.body.mid},(err, data) => {
                            if(err) res.json({success:false,"error":err});
                            res.json({success:true,"message":"Mail has been unsent Successfully"});
                        })
                    } else {
                        res.json({success:false,"message":"This is not your mail"});
                    }
                }
            });      
        }
    })
});

// Get your inbox
router.get("/inbox",(req, res, next) => {
    User.findOne({_id : req.user._id},(err,user) => {
        if(err) res.json({success:false,"error":err});
        if(!user) res.json({success:false,"message":"you cant access outbox"});
        if(user) {
            Mail.find({to:user.email}).sort({time:1}).exec((err,sortedmails)=> {
                if(err) res.json({success:false,"error":err});
                res.json({"mails":sortedmails});
            });
        }
    });
});

// Deleted Mails in Bin
router.get("/bin",(req, res, next) => {
    res.send("Your bin");
});

// clear bin
router.get("/clearbin",(req, res, next) => {
    res.send("bin has been cleared!");
});

module.exports = router;
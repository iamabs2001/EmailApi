const router = require('express').Router();

// Send mail to a user
router.get("/send/:email",(req, res, next) => {
    res.send("under developement : "+req.params.email);
});

// Get your inbox
router.get("/inbox",(req, res, next) => {
    res.send("Your inbox");
});

module.exports = router;
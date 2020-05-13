const router = require('express').Router();

//  Login & return jwt 
router.get("/login",(req, res, next) => {
    res.send("Login");
});

// Register a new user 
router.get("/signup",(req, res, next) => {
    res.send("Sing up");
});

// remove jwt & redirect to login
router.get("/logout",(req, res, next) => {
    res.send("logout...");
});

module.exports = router;
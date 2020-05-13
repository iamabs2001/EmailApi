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

// Return true is uesr is exists
router.get("/isuser/",(req, res, next) => {
    res.send("maybe exits");
});

module.exports = router;
const router = require('express').Router();

// Send mail to a user
router.get("/send",(req, res, next) => {
    res.send("send mail is under developement");
});

// Unsend a mail
router.get("/unsend",(req, res, next) => {
    res.send("mail has been deleted");
});

// Get your inbox
router.get("/inbox",(req, res, next) => {
    res.send("Your inbox");
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
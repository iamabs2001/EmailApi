const jwt = require('jsonwebtoken');
const config = require('../config/main.config');

const isAuth = (req, res, next) => {
    
    // read the token from header or as token query in url
    const token = req.headers['token'] || req.query.token;

    // token does not exist then give 403
    if(!token) {
        return res.status(403).json({
            success: false,
            message: 'Login Required'
        });
    }

    // create a promise that decodes the token
    const p = new Promise(
        (resolve, reject) => {
            jwt.verify(token, config.secret, (err, decoded) => {
                if(err) reject(err)
                resolve(decoded)
            })
        }
    )

    // if it has failed to verify, it will return an error message
    const onError = (error) => {
        res.status(403).json({
            success: false,
            message: error.message
        })
    }

    // process the promise
    p.then((decoded)=> {
        // token is verified now send the user._id in payload & go next
        req.user = decoded
        next()
    }).catch(onError)
}

module.exports = isAuth;
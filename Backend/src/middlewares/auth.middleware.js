const jwt = require("jsonwebtoken")
const tokenBlacklistModel = require("../models/blacklist.model")

//what is the purpose of this middleware ? 
// This middleware is used to authenticate users by verifying their JWT token

//how this function works ?
// This function takes the token from the request cookies and verifies it using the JWT secret key. If the token is valid, it adds the decoded user information to the request object and calls the next middleware. If the token is invalid or not provided, it returns a 401 Unauthorized response.
async function authuser(req,res,next) {

    const token = req.cookies.token

    if(!token) {
        return res.status(401).json({
            message : "token not provided"
        })
    }

    const blacklistedToken = await tokenBlacklistModel.findOne({token})

    if(blacklistedToken) {
        return res.status(401).json({
            message : "token is invalid"
        })
    }

    jwt.verify(token, process.env.JWT_SECRET, (err, decoded) => {
        if(err) {
            return res.status(401).json({
                message : "invalid token"
            })
        }
        //this decoded object contains the user information that we encoded in the token during login, such as user id and username. We can use this information to identify the user in subsequent requests.
        req.user = decoded
        next() 
    })
}

module.exports = {authuser};
const jwt = require('jsonwebtoken')
const asyncHandler = require('express-async-handler')
const user = require('../models/userModel')

const protect = asyncHandler(async(req,res,next)=>{

    

    if(req.headers.authorization && req.headers.authorization.startsWith('Bearer'))
    {
        try{
            // Generating user token from Bearer token
           let token = req.headers.authorization.split(' ')[1]
            // console.log(req.headers.authorization.split(' '))
            // Decoding user token for getting id
            const decode = jwt.verify(token , process.env.JWT_Secret)

            //getting user details
            req.user= await (user.findById(decode.id).select('-password'))
            next()

            
        }

        catch(error){

            res.status(401)
            throw new Error('Not authorized')

        }
    }

    else{
        res.status(401)
        throw new Error('Not authorized')

    }

})

module.exports = {protect}
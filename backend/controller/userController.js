const asyncHandler = require('express-async-handler')
const brcypt = require('bcryptjs')
const Users = require('../models/userModel')
const jwt = require('jsonwebtoken')


// Regsitering Users

const registerUser = asyncHandler( async (req,res) =>{
    const{name,email,password} = req.body

    if(!name||!email||!password){
         res.status(400)
         throw new Error('Include all fields')
    }
    

    const userExists = await(Users.findOne({email}))
    if(userExists){
        res.status(400)
        throw new Error('User already Exists')

    }

    //Hashing password

    const salt = await(brcypt.genSalt(10))  //recommended 10 rounds
    const hashedPassword = await(brcypt.hash(password,salt))


    //Creating user

    const user = await Users.create({
        name,
        email,
        password:hashedPassword
    })

    if(user){
        
        res.status(201).json({
            _id:user._id,
            name:user.name,
            email:user.email,
            token :generateToken(user._id)
        })

    }

    else {
        res.status(400)
        throw new Error('Invalid user')
    }


    
})

// Logging in Users

const loginUser = asyncHandler(async(req,res) =>{
    const {email,password} = req.body

    const userExist = await Users.findOne({email})

    // Authentication

    if(userExist && (await brcypt.compare(password, userExist.password))){  //brcypt stores the salt with password hence can directly compare

        res.status(200).json({
            _id:userExist._id,
            name:userExist.name,
            email:userExist.email,
            token :generateToken(userExist._id)
            // decode: jwt.verify(generateToken(userExist._id),process.env.JWT_Secret)
        })
    }

    else{
        res.status(401)
        throw new Error ('Invalid Credentials')
    }
}
)

const getMe = asyncHandler(async(req,res)=>{
    // res.send('me')
    const user ={
        id : req.user._id,
        email : req.user.email,
        name : req.user.name
    }
    res.status(200).json(user)
})


// Generate Token

const generateToken=(id)=>{
    return jwt.sign({id}, process.env.JWT_Secret,{
        expiresIn:'30d'
    })
}


module.exports={

    registerUser,
    loginUser,
    getMe
}
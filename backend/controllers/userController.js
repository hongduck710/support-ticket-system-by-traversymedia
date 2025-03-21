const asyncHandler = require('express-async-handler')
const bcrypt = require('bcrypts')

const User = require('../models/userModel')

//@desc Register a new user
//@ropute /api/users
//@access Public
const registerUser = asyncHandler(async (req, res) => {
    const {name, email, password} = req.body
    //validation
    if(!name || !email || !password) {
        res.status(400)
        throw new error('Please include all fields!')
    }

    // Find if user already exists
    const userExists = await User.findOne({email})

    if(userExists) {
        res.status(400)
        throw new error('User already exists')
    }

    // Hash password
    const salt = await bcrypt.genSalt(10)
    const hashedPassword = await bcrypt.hash(password, salt)

    // Create user
    const user = await User.create({
        name,
        email,
        password: hashedPassword
    })

    if(user) {
        res.status(201).json({
            _id: user._id,
            name: user.name,
            email: user.email
        })
    } else {
        res.status(400)
        throw new error('Invalid user data')
    }
})

//@desc Login a user
//@ropute /api/users/login
//@access Public
const loginUser = asyncHandler(async (req, res) => {
    res.send('login Route')
})

module.exports = {
    registerUser,
    loginUser
}
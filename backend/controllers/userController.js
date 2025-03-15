const asyncHandler = require('express-async-handler')

//@desc Register a new user
//@ropute /api/users
//@access Public
const registerUser = asyncHandler(async (req, res) => {
    const {name, email, password} = req.body
    //validation
    if(!name || !email || !password) {
        res.status(400)
        throw new Error('Please include all fields!')
    }
    res.send('Register Route')
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
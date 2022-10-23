const asyncHandler = require('express-async-handler')
const bcypt = require('bcryptjs')
const jwt = require('jsonwebtoken')

const User = require('../models/userModel')


//http://localhost:3001/api/users for postman testing
const registerUser = asyncHandler(async (req, res) => {
    const { name, email, password } = req.body

    if (!name || !email || !password) {
        res.status(400)
        throw new Error('please enter all fields')
    }

    const userExists = await User.findOne({ email })

    if (userExists) {
        res.status(400)
        throw new Error('User already exists')
    }

    const salt = await bcypt.genSalt(10)
    const hashedPassword = await bcypt.hash(password, salt)

    const user = await User.create({
        name,
        email,
        password: hashedPassword,
        token: generateToken(user._id)
    })

    if (user) {
        res.status(201).json({
            _id: user._id,
            name: user.name,
            email: user.email
        })
    } else {
        res.status(400)
        throw new Error('Invalid user data')
    }
})

//http://localhost:3001/api/users/login for postman testing
const loginUser = asyncHandler(async (req, res) => {

    const { email, password } = req.body

    const user = await User.findOne({ email })

    if (user && (await bcypt.compare(password, user.password))) {
        res.status(200).json({
            _id: user._id,
            name: user.name,
            email: user.email,
            token: generateToken(user._id)
        })
    } else {
        res.status(401)
        throw new Error('Invalid log in credentials')
    }
})

const getMe = asyncHandler(async (req, res) => {
    res.send('me')
})

//generate token
const generateToken = (id) => {
    return jwt.sign({ id }, process.env.JWT_SECRET, {
        expiresIn: '30d'
    })
}

module.exports = {
    registerUser,
    loginUser,
    getMe
}
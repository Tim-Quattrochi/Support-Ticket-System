const asyncHandler = require('express-async-handler')


//http://localhost:3001/api/users for postman testing
const registerUser = asyncHandler(async (req, res) => {
    const { name, email, password } = req.body

    if (!name || !email || !password) {
        res.status(400)
        throw new Error('please enter all fields')
    }
    res.send('Register Route')
})

//http://localhost:3001/api/users/login for postman testing
const loginUser = asyncHandler(async (req, res) => {
    res.send('login Route')
})

module.exports = {
    registerUser,
    loginUser
}
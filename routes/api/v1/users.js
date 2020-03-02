// import dependencies
const express = require('express')
const bcrypt = require('bcryptjs')
const jwt = require('jsonwebtoken')
const { secretOrKey } = require('../../../config/keys')

// import user input validation
const validateSignUpInput = require('../../../validation/signUp')
const validateSignInInput = require('../../../validation/signIn')

// import models
const User = require('../../../models/User')

// instantiate a new Router class
const router = express.Router()

// @route:  GET api/v1/users/
// @desc:   Return all users
// @access: Public
router.get('/', (req, res) => {
    User.find({})
        .then(users => res.status(200).json(users))
        .catch(err => res.status(400).json(err))
})

// @route:  DELETE api/v1/users/:userId
// @desc:   Delete user
// @access: Public
router.delete('/:userId', (req, res) => {
    // destructure request params
    const { userId } = req.params

    // find user and delete
    User.findByIdAndDelete(userId)
        .then(() => res.status(200).json({ message: 'successfully deleted user' }))
        .catch(err => res.status(400).json({ message: 'falied to delete user', err }))
})

// @route:  GET api/v1/users/:userId
// @desc:   Return user
// @access: Public
router.get('/:userId', (req, res) => {
    // destructure request params
    const { userId } = req.params

    // find user
    User.findById(userId)
        .then(user => res.status(200).json(user))
        .catch(err => res.status(400).json(err))
})

// @route:  PUT api/v1/users/:userId
// @desc:   Update user
// @access: Public
router.put('/:userId', (req, res) => {
    // destructure request params
    const { userId } = req.params

    // find user and update
    User.findByIdAndUpdate(userId, { ...req.body }, { new: true })
        .then(user => res.status(200).json({ message: 'successfully updated user', user }))
        .catch(err => res.status(400).json({ message: 'falied to update user', err }))
})

// @route:  POST api/v1/users/sign-in
// @desc:   Sign in user and return JWT token
// @access: Public
router.post('/sign-in', (req, res) => {
    // destructure validateSignInInput()
    const {
        errors,
        isValid
    } = validateSignInInput(req.body)

    // check validation
    if (!isValid) {
        return res
            .status(400)
            .json(errors)
    }

    // destructure request body
    const {
        email,
        password
    } = req.body

    User.findOne({ email }).then(user => {
        // check for existing user
        if (!user) {
            return res
                .status(404)
                .json({ email: 'Email not found' })
        }

        // check password
        bcrypt.compare(password, user.password)
            .then(isMatch => {
                // matched user
                if (isMatch) {
                    // create jwt payload
                    const payload = {
                        id: user.id,
                        email: user.email,
                        firstName: user.firstName,
                        fullName: user.fullName,
                        lastName: user.lastName,
                        slug: user.slug
                    }

                    // 1 year in seconds
                    const oneYear = 31556926

                    // sign token
                    jwt.sign(
                        payload,
                        secretOrKey,
                        { expiresIn: oneYear },
                        (err, token) => {
                            return res
                                .status(200)
                                .json({ token: `Bearer ${token}` })
                        }
                    )
                }
                // unmatched user
                else {
                    return res
                        .status(400)
                        .json({ password: 'Password incorrect' })
                }
            })
            .catch(err => console.log(err))
    })
})

// @route:  POST api/v1/users/sign-up
// @desc:   Sign up new user
// @access: Public
router.post('/sign-up', (req, res) => {
    // destructure validateSignUpInput()
    const {
        errors,
        isValid
    } = validateSignUpInput(req.body)

    // check validation
    if (!isValid) {
        return res
            .status(400)
            .json(errors)
    }

    // destructure request body
    const {
        email,
        firstName,
        lastName,
        password
    } = req.body

    User.findOne({ email }).then(user => {
        // check for existing user
        if (user) {
            return res
                .status(400)
                .json({ email: 'Email already exists' })
        }

        // instantiate new User object 
        const newUser = new User({
            email,
            firstName,
            fullName: `${firstName} ${lastName}`,
            lastName,
            password,
            slug: `${firstName.toLowerCase()}-${lastName.toLowerCase()}`
        })

        // hash password before saving to database
        bcrypt.genSalt(10, (err, salt) => {
            bcrypt.hash(newUser.password, salt, (err, hash) => {
                if (err) throw err
                newUser.password = hash
                newUser.save()
                    .then(user => res.status(200).json(user))
                    .catch(err => console.log(err))
            })
        })
    })
})

// export router
module.exports = router

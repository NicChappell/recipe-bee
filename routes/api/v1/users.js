// import dependencies
const express = require('express')
const bcrypt = require('bcryptjs')
const jwt = require('jsonwebtoken')
const { secretOrKey } = require('../../../config/keys')

// import validation
const validateSignUpInput = require('../../../validation/signUp')
const validateSignInInput = require('../../../validation/signIn')

// import helpers
const { slugify } = require('../../../helpers/utilities')

// import models
const User = require('../../../models/User')

// instantiate a new Router class
const router = express.Router()

// @route:  GET api/v1/users/
// @desc:   Return all users
router.get('/', (req, res) => {
    User.find({})
        .then(users => res.status(200).json(users))
        .catch(err => res.status(400).json(err))
})

// @route:  DELETE api/v1/users/:userId
// @desc:   Delete user
router.delete('/:userId', (req, res) => {
    // destructure request params
    const { userId } = req.params

    // find user and delete
    User.findByIdAndDelete(userId)
        .then(() => res.status(200).json({ message: 'deleted user' }))
        .catch(err => res.status(400).json({ message: 'falied to delete user', err }))
})

// @route:  GET api/v1/users/:userId
// @desc:   Return user
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
router.put('/:userId', (req, res) => {
    // destructure request params
    const { userId } = req.params

    // find user and update
    User.findByIdAndUpdate(userId, { ...req.body }, { new: true })
        .then(newUser => {
            // create jwt payload

            // delete password before responding
            const user = {...newUser._doc}
            delete user.password

            res.status(200).json({ message: 'updated user', user })
        })
        .catch(err => res.status(400).json({ message: 'falied to update user', err }))
})

// @route:  POST api/v1/users/sign-in
// @desc:   Sign in user and return JWT token
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
        // confirm user exists
        if (!user) {
            return res
                .status(404)
                .json({ email: 'Email not found' })
        }

        // check password
        bcrypt.compare(password, user.password)
            .then(isMatch => {
                // password correct
                if (isMatch) {
                    // create jwt payload
                    const payload = {...user._doc}

                    // delete password from payload
                    delete payload.password

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
                // password incorret
                else {
                    return res
                        .status(400)
                        .json({ password: 'Password incorrect' })
                }
            })
            .catch(err => res.status(500).json({ recipe: 'There was a problem signing in, please try again later.', err }))
    })
})

// @route:  POST api/v1/users/sign-up
// @desc:   Sign up new user
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
        address1,
        address2,
        city,
        email,
        firstName,
        lastName,
        password,
        postalCode,
        state,
        username
    } = req.body

    // check for existing email
    User.findOne({ email }).then(user => {
        if (user) {
            return res
                .status(400)
                .json({ email: 'Email already exists' })
        }

        // check for existing username
        User.findOne({ username }).then(user => {
            if (user) {
                return res
                    .status(400)
                    .json({ username: 'Username already exists' })
            }

            // instantiate new User object 
            const newUser = new User({
                address1,
                address2,
                city,
                email,
                firstName,
                fullName: firstName + ' ' + lastName,
                lastName,
                password,
                postalCode,
                slug: slugify(firstName + ' ' + lastName),
                state,
                username
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
})

// export router
module.exports = router

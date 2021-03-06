// import dependencies
const express = require('express')
const bcrypt = require('bcryptjs')
const crypto = require('crypto')
const jwt = require('jsonwebtoken')
const nodemailer = require('nodemailer')

// import validation
const validateEmailAddress = require('../../../validation/email')
const validateSignIn = require('../../../validation/signIn')
const validateSignUp = require('../../../validation/signUp')
const validateResetPasswordInput = require('../../../validation/password')

// import helpers
const { slugify } = require('../../../helpers/utilities')

// import models
const User = require('../../../models/User')

// instantiate a new Router class
const router = express.Router()

// @route:  GET /api/v1/users/
// @desc:   Return all users
router.get('/', (req, res) => {
    User.find({})
        .then(users => res.status(200).json(users))
        .catch(err => res.status(400).json(err))
})

// @route:  DELETE /api/v1/users/:userId
// @desc:   Delete user
router.delete('/:userId', (req, res) => {
    // destructure request params
    const { userId } = req.params

    // find user and delete
    User.findByIdAndDelete(userId)
        .then(() => res.status(200).json({ message: 'deleted user' }))
        .catch(err => res.status(400).json({ message: 'falied to delete user', err }))
})

// @route:  GET /api/v1/users/:userId
// @desc:   Return user
router.get('/:userId', (req, res) => {
    // destructure request params
    const { userId } = req.params

    // find user
    User.findById(userId)
        .then(user => res.status(200).json(user))
        .catch(err => res.status(400).json(err))
})

// @route:  PUT /api/v1/users/:userId
// @desc:   Update user
router.put('/:userId', (req, res) => {
    // destructure request params
    const { userId } = req.params

    // find user and update
    User.findByIdAndUpdate(userId, { ...req.body }, { new: true })
        .then(updatedUser => {
            // create jwt payload

            // delete password before responding
            const user = { ...updatedUser._doc }
            delete user.password

            res.status(200).json({ message: 'updated user', user })
        })
        .catch(err => res.status(400).json({ message: 'falied to update user', err }))
})

// @route:  POST /api/v1/users/password/forgot-password
// @desc:   Send password reset email
router.post('/password/forgot-password', (req, res) => {
    // destructure request body
    const { email } = req.body

    // validate email address
    const {
        errors,
        isValid
    } = validateEmailAddress(email)

    // check valid status
    if (!isValid) {
        return res
            .status(400)
            .json(errors)
    }

    // generate token
    const token = crypto.randomBytes(20).toString('hex')

    // parameters
    const query = { email }
    const update = {
        passwordResetExpiresAt: Date.now() + 3600000,
        passwordResetToken: token,
    }
    const options = { new: true }

    // find user and update
    User.findOneAndUpdate(query, update, options)
        .then(user => {
            // check for user
            if (!user) {
                const errors = {
                    email: `an account with email ${email} cannot be found`
                }

                return res
                    .status(403)
                    .json(errors)
            }

            // create nodemailer transport
            const transporter = nodemailer.createTransport({
                service: 'gmail',
                auth: {
                    user: process.env.NODEMAILER_USER,
                    pass: process.env.NODEMAILER_PASS
                }
            })

            // define mail options
            let url = ''
            if (process.env.NODE_ENV === 'production') {
                url = `${req.protocol}://${req.host}/reset-password/${token}`
            } else {
                url = `http://localhost:3000/reset-password/${token}`
            }

            const mailOptions = {
                from: 'no-reply@recipebee.com',
                to: user.email,
                subject: 'Reset Your RecipeBee Account Password',
                text: url
            }

            // send mail
            transporter.sendMail(mailOptions, (err, response) => {
                if (err) {
                    res.status(500).json({ message: 'falied to send password reset email', err })
                }
                res.status(200).json({ message: 'password reset email sent' })
            })
        })
        .catch(err => res.status(500).json({ message: 'falied to update user', err }))
})

// @route:  POST /api/v1/users/password/verify-token
// @desc:   Verify password reset token
router.post('/password/verify-token', (req, res) => {
    // destructure request body
    const { token } = req.body

    User.findOne({
        passwordResetExpiresAt: { $gt: Date.now() },
        passwordResetToken: token
    }).then(user => {
        const userData = {}

        if (user) {
            userData.email = user.email
            userData.id = user._id
        }

        res.status(200).json({ user: userData })
    }).catch(err => {
        res.status(500).json({ message: 'falied to verify token', err })
    })
})

// @route:  POST /api/v1/users/password/reset-password
// @desc:   Reset user password
router.post('/password/reset-password', (req, res) => {
    // validate password data
    const {
        errors,
        isValid
    } = validateResetPasswordInput(req.body)

    if (!isValid) {
        return res
            .status(400)
            .json(errors)
    }

    // destructure request body
    const {
        userId: id,
        newPassword1: password
    } = req.body

    // parameters
    const update = {
        password: '',
        passwordResetExpiresAt: Date.now(),
        passwordResetToken: '',
    }

    // hash password before saving to database
    bcrypt.genSalt(10, (err, salt) => {
        bcrypt.hash(password, salt, (err, hash) => {
            if (err) throw err

            // find user and update
            update.password = hash
            User.findByIdAndUpdate(id, update)
                .then(user => res.status(200).send())
                .catch(err => res.status(500).json({ message: 'falied to update password', err }))
        })
    })
})

// @route:  POST /api/v1/users/sign-in
// @desc:   Sign in user and return JWT token
router.post('/sign-in', (req, res) => {
    // validate user input
    const validate = validateSignIn(req.body)

    // check for validation errors
    if (!validate.isValid) {
        return res
            .status(400)
            .json(validate.errors)
    }

    // destructure request body
    const {
        emailAddress,
        password
    } = req.body

    User.findOne({ email: emailAddress }).then(user => {
        // confirm user exists
        if (!user) {
            return res
                .status(404)
                .json({ emailAddress: 'email not found' })
        }

        // check password
        bcrypt.compare(password, user.password)
            .then(isMatch => {
                // password correct
                if (isMatch) {
                    // create jwt payload
                    const payload = { ...user._doc }

                    // delete password from payload
                    delete payload.password

                    // 1 year in seconds
                    const oneYear = 31556926

                    // sign token
                    jwt.sign(
                        payload,
                        process.env.JWT_SECRET,
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
                        .json({ password: 'password incorrect' })
                }
            })
            .catch(err => res.status(500).json({ message: 'there was a problem signing in, please try again later', err }))
    })
})

// @route:  POST /api/v1/users/sign-up
// @desc:   Sign up new user
router.post('/sign-up', (req, res) => {
    // validate user input
    const validate = validateSignUp(req.body)

    // check for validation errors
    if (!validate.isValid) {
        return res
            .status(400)
            .json(validate.errors)
    }

    // destructure request body
    const {
        address1,
        address2,
        city,
        email,
        firstName,
        lastName,
        password1: password,
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

                    // save new user
                    newUser.password = hash
                    newUser.save()
                        .then(user => res.status(200).json(user))
                        .catch(err => res.status(500).json({ message: 'there was a problem signing up, please try again later', err }))
                })
            })
        })
    })
})

// @route:  GET /api/v1/users/utilities/count
// @desc:   Return user document count
router.get('/utilities/count', (req, res) => {
    User.countDocuments()
        .then(count => res.status(200).json({ message: 'counted user documnents', count }))
        .catch(err => res.status(400).json({ message: 'error counting user documents', err }))
})

// export router
module.exports = router

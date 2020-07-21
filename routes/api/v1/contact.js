// import dependencies
const express = require('express')
const nodemailer = require('nodemailer')

// import validation
const validateMessageInput = require('../../../validation/contact')

// instantiate a new Router class
const router = express.Router()

// @route:  POST /api/v1/users/contact
// @desc:   Send contact us email
router.post('/', (req, res) => {
    // validate message data
    const {
        errors,
        isValid
    } = validateMessageInput(req.body)

    // check valid status
    if (!isValid) {
        return res
            .status(400)
            .json(errors)
    }

    // destructure request body
    const {
        email,
        message
    } = req.body

    // create nodemailer transport
    const transporter = nodemailer.createTransport({
        service: 'gmail',
        auth: {
            user: process.env.NODEMAILER_USER,
            pass: process.env.NODEMAILER_PASS
        }
    })

    // define mail options
    const mailOptions = {
        from: email,
        to: 'nic@recipebee.com',
        subject: 'Contact Us Message',
        text: message,
        html: `<p>${message}</p>`
    }

    // send mail
    transporter.sendMail(mailOptions, (err, response) => {
        if (err) {
            return res.status(500).json({ message: 'falied to send message', err })
        }
        res.status(200).json({ message: 'message sent' })
    })
})

// export router
module.exports = router

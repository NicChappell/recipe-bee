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
            user: `nic.chappell@gmail.com`,
            pass: `@{}c];f&#Rx2u&e+rM)*dFN}`
        }
    })

    // define mail options
    const mailOptions = {
        from: email,
        to: 'nic.chappell@gmail.com',
        subject: 'RecipeBee Contact Us Message',
        text: message,
        html: `<p>${message}</p>`,
        amp: `<!doctype html>
        <html ⚡4email>
          <head>
            <meta charset="utf-8">
            <style amp4email-boilerplate>body{visibility:hidden}</style>
            <script async src="https://cdn.ampproject.org/v0.js"></script>
            <script async custom-element="amp-anim" src="https://cdn.ampproject.org/v0/amp-anim-0.1.js"></script>
          </head>
          <body>
            <p>Image: <amp-img src="https://cldup.com/P0b1bUmEet.png" width="16" height="16"/></p>
            <p>GIF (requires "amp-anim" script in header):<br/>
              <amp-anim src="https://cldup.com/D72zpdwI-i.gif" width="500" height="350"/></p>
          </body>
        </html>`
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

// import dependencies
const Validator = require('validator')
const isEmpty = require('lodash.isempty')

// validate user input
const validateMessageInput = messageData => {
    // create an errors object
    let errors = {}

    // destructure message data
    const {
        email,
        message
    } = messageData

    // validate email input
    if (!email) {
        errors.email = 'email address is required'
    } else if (!Validator.isEmail(email)) {
        errors.email = 'email address is invalid'
    }

    // validate message input
    if (!message) {
        errors.message = 'message is required'
    }

    return {
        errors,
        isValid: isEmpty(errors)
    }
}

// export function
module.exports = validateMessageInput

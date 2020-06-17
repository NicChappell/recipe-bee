// import dependencies
const Validator = require('validator')
const isEmpty = require('lodash/isEmpty')

// validate user input
const validateEmailAddress = emailAddress => {
    // create an errors object
    let errors = {}

    // validate email input
    if (!emailAddress) {
        errors.email = 'email address is required'
    } else if (!Validator.isEmail(emailAddress)) {
        errors.email = 'email address is invalid'
    }

    return {
        errors,
        isValid: isEmpty(errors)
    }
}

// export functions
module.exports = validateEmailAddress

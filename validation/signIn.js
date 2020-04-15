// import dependencies
const Validator = require('validator')
const isEmpty = require('lodash.isempty')

// validate user input
const validateSignInInput = data => {
    // instantiate an errors object
    let errors = {}

    // destructure data
    const {
        email,
        password
    } = data

    // convert empty fields into empty strings for Validator methods
    const validateEmail = !isEmpty(email) ? email : ''

    // validate email input
    if (!email) {
        errors.email = 'Email is required'
    }
    if (!Validator.isEmail(validateEmail)) {
        errors.email = 'Invalid email address'
    }

    // validate password input
    if (!password) {
        errors.password = 'Password is required'
    }

    // return errors object and isValid boolean
    return {
        errors,
        isValid: isEmpty(errors)
    }
}

// export function
module.exports = validateSignInInput

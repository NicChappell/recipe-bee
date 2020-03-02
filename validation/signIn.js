// import dependencies
const Validator = require('validator')
const isEmpty = require('is-empty')

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
    validateEmail = !isEmpty(email) ? email : ''
    validatePassword = !isEmpty(password) ? password : ''

    // validate email input
    if (Validator.isEmpty(validateEmail)) {
        errors.email = 'Email is required'
    }
    if (!Validator.isEmail(validateEmail)) {
        errors.email = 'Invalid email address'
    }

    // validate password input
    if (Validator.isEmpty(validatePassword)) {
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

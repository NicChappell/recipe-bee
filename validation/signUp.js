// import dependencies
const Validator = require('validator')
const isEmpty = require('is-empty')

// validate user input
const validateSignUpInput = data => {
    // instantiate an errors object
    let errors = {}

    // destructure data
    const {
        email,
        firstName,
        lastName,
        password,
        password2
    } = data

    // convert empty fields into empty strings for Validator methods
    validateEmail = !isEmpty(email) ? email : ''
    validateFirstName = !isEmpty(firstName) ? firstName : ''
    validateLastName = !isEmpty(lastName) ? lastName : ''
    validatePassword = !isEmpty(password) ? password : ''
    validatePassword2 = !isEmpty(password2) ? password2 : ''

    // validate email input
    if (Validator.isEmpty(validateEmail)) {
        errors.email = 'Email field is required'
    }
    if (!Validator.isEmail(validateEmail)) {
        errors.email = 'Email is invalid'
    }

    // validate firstName input
    if (Validator.isEmpty(validateFirstName)) {
        errors.firstName = 'First name is required'
    }

    // validate lastName input
    if (Validator.isEmpty(validateLastName)) {
        errors.lastName = 'Last name is required'
    }

    // validate password input
    if (Validator.isEmpty(validatePassword)) {
        errors.password = 'Password field is required'
    }
    if (!Validator.isLength(validatePassword, { min: 6, max: 30 })) {
        errors.password = 'Password must be at least 6 characters'
    }

    // validate password2 input
    if (Validator.isEmpty(validatePassword2)) {
        errors.password2 = 'Confirm password field is required'
    }

    // validate passwords
    if (!Validator.equals(validatePassword, validatePassword2)) {
        errors.passwords = 'Passwords must match'
    }

    // return errors object and isValid boolean
    return {
        errors,
        isValid: isEmpty(errors)
    }
}

// export function
module.exports = validateSignUpInput

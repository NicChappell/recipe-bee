// import dependencies
const Validator = require('validator')
const isEmpty = require('is-empty')

// validate user input
const validateSignUpInput = data => {
    // instantiate an errors object
    let errors = {}

    // destructure data
    const {
        address1,
        address2,
        city,
        email,
        firstName,
        lastName,
        password,
        password2,
        postalCode,
        state,
        username
    } = data

    // convert empty fields into empty strings for Validator methods
    const validateAddress1 = !isEmpty(address1) ? address1 : ''
    const validateAddress2 = !isEmpty(address2) ? address2 : ''
    const validateCity = !isEmpty(city) ? city : ''
    const validateEmail = !isEmpty(email) ? email : ''
    const validateFirstName = !isEmpty(firstName) ? firstName : ''
    const validateLastName = !isEmpty(lastName) ? lastName : ''
    const validatePassword = !isEmpty(password) ? password : ''
    const validatePassword2 = !isEmpty(password2) ? password2 : ''
    const validatePostalCode = !isEmpty(postalCode) ? postalCode : ''
    const validateState = !isEmpty(state) ? state : ''
    const validateUsername = !isEmpty(username) ? username : ''

    // validate address1 input
    if (Validator.isEmpty(validateAddress1)) {
        errors.address1 = 'Street address is required'
    }

    // // validate address2 input
    // if (Validator.isEmpty(validateAddress2)) {
    //     errors.address2 = 'Street address is required'
    // }

    // validate city input
    if (Validator.isEmpty(validateCity)) {
        errors.city = 'City is required'
    }

    // validate email input
    if (Validator.isEmpty(validateEmail)) {
        errors.email = 'Email is required'
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
        errors.password = 'Password is required'
    }
    if (!Validator.isLength(validatePassword, { min: 6, max: 30 })) {
        errors.password = 'Password must be at least 6 characters'
    }

    // validate password2 input
    if (Validator.isEmpty(validatePassword2)) {
        errors.password2 = 'Confirm password is required'
    }

    // validate passwords
    if (!Validator.equals(validatePassword, validatePassword2)) {
        errors.passwords = 'Passwords must match'
    }

    // validate postalCode input
    if (Validator.isEmpty(validatePostalCode)) {
        errors.postalCode = 'Postal code is required'
    }

    // validate state input
    if (Validator.isEmpty(validateState)) {
        errors.state = 'State is required'
    }

    // validate username input
    if (Validator.isEmpty(validateUsername)) {
        errors.username = 'Username is required'
    }

    // return errors object and isValid boolean
    return {
        errors,
        isValid: isEmpty(errors)
    }
}

// export function
module.exports = validateSignUpInput

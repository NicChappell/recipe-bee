// import dependencies
// const Validator = require('validator')
import isEmpty from 'lodash/isEmpty'

// validate user input
export const validateProfileInput = data => {
    // create an errors object
    let errors = {}

    // destructure data
    const {
        address1,
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
    const validateEmail = !isEmpty(email) ? email : ''
    const validatePassword = !isEmpty(password) ? password : ''
    const validatePassword2 = !isEmpty(password2) ? password2 : ''

    // validate address1 input
    if (!address1) {
        errors.address1 = 'Street address is required'
    }

    // validate city input
    if (!city) {
        errors.city = 'City is required'
    }

    // validate email input
    if (!email) {
        errors.email = 'Email is required'
    }
    if (!Validator.isEmail(validateEmail)) {
        errors.email = 'Email is invalid'
    }

    // validate firstName input
    if (!firstName) {
        errors.firstName = 'First name is required'
    }

    // validate lastName input
    if (!lastName) {
        errors.lastName = 'Last name is required'
    }

    // validate password input
    if (!password) {
        errors.password = 'Password is required'
    }
    if (!Validator.isLength(validatePassword, { min: 6, max: 30 })) {
        errors.password = 'Password must be at least 6 characters'
    }

    // validate password2 input
    if (!password2) {
        errors.password2 = 'Confirm password is required'
    }

    // validate passwords
    if (!Validator.equals(validatePassword, validatePassword2)) {
        errors.passwords = 'Passwords must match'
    }

    // validate postalCode input
    if (!postalCode) {
        errors.postalCode = 'Postal code is required'
    }

    // validate state input
    if (!state) {
        errors.state = 'State is required'
    }

    // validate username input
    if (!username) {
        errors.username = 'Username is required'
    }

    // return errors object and isValid boolean
    return {
        errors,
        isValid: isEmpty(errors)
    }
}

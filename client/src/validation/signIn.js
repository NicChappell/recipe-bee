// import dependencies
import Validator from 'validator'
import isEmpty from 'lodash/isEmpty'

// validate reset password user input
export const validateSignIn = data => {
    // create an errors object
    let errors = {}

    // destructure data
    const {
        emailAddress,
        password
    } = data

    // validate email input
    if (!emailAddress) {
        errors.emailAddress = 'email is required'
    } else if (!Validator.isEmail(emailAddress)) {
        errors.emailAddress = 'email is invalid'
    }

    // validate password input
    if (!password) {
        errors.password = 'password is required'
    }

    // return errors object and isValid boolean
    return {
        errors,
        isValid: isEmpty(errors)
    }
}
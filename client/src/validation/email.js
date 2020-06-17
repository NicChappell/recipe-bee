// import dependencies
import Validator from 'validator'
import isEmpty from 'lodash/isEmpty'

// validate user input
export const validateEmailAddress = emailAddress => {
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

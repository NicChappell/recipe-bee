// import dependencies
import Validator from 'validator'
import isEmpty from 'lodash/isEmpty'

// validate user input
export const validateMessageInput = messageData => {
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

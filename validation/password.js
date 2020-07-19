// import dependencies
const Validator = require('validator')
const isEmpty = require('lodash/isEmpty')

// validate reset password input
const validateResetPasswordInput = passwordData => {
    // create an errors object
    let errors = {}

    // destructure password data
    const {
        newPassword1,
        newPassword2
    } = passwordData

    // validate new password input
    if (!newPassword1) {
        errors.newPassword1 = 'New password is required'
    } else if (!Validator.isLength(newPassword1, { min: 6, max: 30 })) {
        errors.newPassword1 = 'New password must be at least 6 characters'
    }
    if (!newPassword2) {
        errors.newPassword2 = 'Confirm new password is required'
    } else if (!Validator.equals(newPassword1, newPassword2)) {
        errors.newPassword2 = 'Passwords must match'
    }

    // return errors object and isValid boolean
    return {
        errors,
        isValid: isEmpty(errors)
    }
}

// export functions
module.exports = validateResetPasswordInput

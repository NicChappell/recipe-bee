// import dependencies
import Validator from 'validator'
import isEmpty from 'lodash/isEmpty'

// validate reset password user input
export const validateResetPasswordInput = data => {
    // create an errors object
    let errors = {}

    // destructure data
    const {
        newPassword1,
        newPassword2
    } = data

    // validate new password input
    if (!newPassword1) {
        errors.newPassword1 = 'new password is required'
    } else if (!Validator.isLength(newPassword1, { min: 6, max: 30 })) {
        errors.newPassword1 = 'new password must be at least 6 characters'
    }
    if (!newPassword2) {
        errors.newPassword2 = 'confirm new password is required'
    } else if (!Validator.equals(newPassword1, newPassword2)) {
        errors.newPassword2 = 'passwords must match'
    }

    // return errors object and isValid boolean
    return {
        errors,
        isValid: isEmpty(errors)
    }
}
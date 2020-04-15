// import dependencies
const isEmpty = require('lodash.isempty')

// validate auth status
const validateAuthStatus = token => {
    // instantiate an errors object
    let errors = {}

    if (!token) {
        errors.auth = 'Unauthorized'
    }

    // return errors object and isValid boolean
    return {
        errors,
        isValid: isEmpty(errors)
    }
}

// export function
module.exports = validateAuthStatus

// import dependencies
const Validator = require('validator')
const isEmpty = require('is-empty')

// validate user input
const validateTag = data => {
    // instantiate an errors object
    let errors = {}

    // destructure data
    const {
        tag,
        category
    } = data

    // convert empty fields into empty strings for Validator methods
    const validateTag = !isEmpty(tag) ? tag : ''
    const validateCategory = !isEmpty(category) ? category : ''

    // validate tag input
    if (Validator.isEmpty(validateTag)) {
        errors.tag = 'Tag is required'
    }

    // validate category input
    if (Validator.isEmpty(validateCategory)) {
        errors.category = 'Category is required'
    }

    // return errors object and isValid boolean
    return {
        errors,
        isValid: isEmpty(errors)
    }
}

// export function
module.exports = validateTag

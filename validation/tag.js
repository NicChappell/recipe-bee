// import dependencies
const isEmpty = require('lodash.isempty')

// validate user input
const validateTag = data => {
    // instantiate an errors object
    let errors = {}

    // destructure data
    const {
        tag,
        category
    } = data

    // validate tag input
    if (isEmpty(tag)) {
        errors.tag = 'Tag is required'
    }

    // validate category input
    if (isEmpty(category)) {
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

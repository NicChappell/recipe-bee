// import dependencies
const Validator = require('validator')
const isEmpty = require('is-empty')

// validate user input
const validateUserInput = data => {
    // instantiate an errors object
    let errors = {}

    // destructure data
    const {
        thing1,
        thing2
    } = data

    // convert empty fields into empty strings for Validator methods
    validateThing1 = !isEmpty(thing1) ? thing1 : ''
    validateThing2 = !isEmpty(thing2) ? thing2 : ''

    // validate email input
    if (Validator.isEmpty(validateThing1)) {
        errors.thing1 = 'Thing 1 is required'
    }

    // validate password input
    if (Validator.isEmpty(validateThing2)) {
        errors.thing2 = 'Thing 2 is required'
    }

    // return errors object and isValid boolean
    return {
        errors,
        isValid: isEmpty(errors)
    }
}

// export function
module.exports = validateUserInput

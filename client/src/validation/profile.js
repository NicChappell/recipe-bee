// import dependencies
import isEmpty from 'lodash/isEmpty'

// validate user input
const validateProfile = data => {
    // create an errors object
    let errors = {}

    // destructure required data
    const {
        address1,
        city,
        firstName,
        lastName,
        postalCode,
        state
    } = data

    // validate address1 input
    if (!address1) {
        errors.address1 = 'street address is required'
    }

    // validate city input
    if (!city) {
        errors.city = 'city is required'
    }

    // validate firstName input
    if (!firstName) {
        errors.firstName = 'first name is required'
    }

    // validate lastName input
    if (!lastName) {
        errors.lastName = 'last name is required'
    }

    // validate postalCode input
    if (!postalCode) {
        errors.postalCode = 'postal code is required'
    }

    // validate state input
    if (!state) {
        errors.state = 'state is required'
    }

    // return errors object and isValid boolean
    return {
        errors,
        isValid: isEmpty(errors)
    }
}

// export function
export default validateProfile

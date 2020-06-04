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
        errors.address1 = 'Street address is required'
    }

    // validate city input
    if (!city) {
        errors.city = 'City is required'
    }

    // validate firstName input
    if (!firstName) {
        errors.firstName = 'First name is required'
    }

    // validate lastName input
    if (!lastName) {
        errors.lastName = 'Last name is required'
    }

    // validate postalCode input
    if (!postalCode) {
        errors.postalCode = 'Postal code is required'
    }

    // validate state input
    if (!state) {
        errors.state = 'State is required'
    }

    // return errors object and isValid boolean
    return {
        errors,
        isValid: isEmpty(errors)
    }
}

// export function
export default validateProfile

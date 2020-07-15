// import dependencies
var Validator = require('validator');
var isEmpty = require('lodash.isempty');

// validate user input
function validateSignUp(data) {
    // create an errors object
    var errors = {};

    // destructure data
    var address1 = data.address1;
    var city = data.city;
    var email = data.email;
    var firstName = data.firstName;
    var lastName = data.lastName;
    var password1 = data.password1;
    var password2 = data.password2;
    var postalCode = data.postalCode;
    var state = data.state;
    var username = data.username;

    // validate address input
    if (!address1) {
        errors.address1 = 'street address is required';
    }

    // validate city input
    if (!city) {
        errors.city = 'city is required';
    }

    // validate email input
    if (!email) {
        errors.email = 'email is required';
    } else if (!Validator.isEmail(email)) {
        errors.email = 'email is invalid';
    }

    // validate first name input
    if (!firstName) {
        errors.firstName = 'first name is required';
    }

    // validate last name input
    if (!lastName) {
        errors.lastName = 'last name is required';
    }

    // validate password input
    if (!password1) {
        errors.password1 = 'password is required';
    } else if (!Validator.isLength(password1, { min: 6, max: 30 })) {
        errors.password1 = 'password must be at least 6 characters';
    }
    if (!password2) {
        errors.password2 = 'confirm password is required';
    } else if (!Validator.equals(password1, password2)) {
        errors.password2 = 'passwords must match';
    }

    // validate postal code input
    if (!postalCode) {
        errors.postalCode = 'zip code is required';
    }

    // validate state input
    if (!state) {
        errors.state = 'state is required';
    }

    // validate username input
    if (!username) {
        errors.username = 'username is required';
    }

    // return errors object and isValid boolean
    return {
        errors,
        isValid: isEmpty(errors)
    };
}

// export function
module.exports = validateSignUp

// import dependencies
var Validator = require('validator');
var isEmpty = require('lodash.isempty');

// validate user input
function validateSignIn(data) {
    // create an errors object
    var errors = {};

    // destructure data
    var emailAddress = data.emailAddress;
    var password = data.password;

    // validate email input
    if (!emailAddress) {
        errors.emailAddress = 'email is required';
    } else if (!Validator.isEmail(emailAddress)) {
        errors.emailAddress = 'email is invalid';
    }

    // validate password input
    if (!password) {
        errors.password = 'password is required';
    }

    // return errors object and isValid boolean
    return {
        errors,
        isValid: isEmpty(errors)
    };
}

// export function
module.exports = validateSignIn;

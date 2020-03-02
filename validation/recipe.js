// import dependencies
const Validator = require('validator')
const isEmpty = require('is-empty')

// validate user input
const validateRecipe = data => {
    // instantiate an errors object
    let errors = {}

    // destructure data
    const {
        title,
        description,
        // ingredients,
        // instructions,
        // tags
    } = data

    // convert empty fields into empty strings for Validator methods
    validateTitle = !isEmpty(title) ? title : ''
    validateDescription = !isEmpty(description) ? description : ''
    // validateIngredients = !isEmpty(ingredients) ? ingredients : ''
    // validateInstructions = !isEmpty(instructions) ? instructions : ''
    // validateTags = !isEmpty(tags) ? tags : ''

    // validate title input
    if (Validator.isEmpty(validateTitle)) {
        errors.thing1 = 'Title is required'
    }

    // validate description input
    if (Validator.isEmpty(validateDescription)) {
        errors.thing2 = 'Description is required'
    }

    // // validate ingredients input
    // if (Validator.isEmpty(validateIngredients)) {
    //     errors.thing2 = 'Ingredients are required'
    // }

    // // validate instructions input
    // if (Validator.isEmpty(validateInstructions)) {
    //     errors.thing2 = 'Instructions are required'
    // }

    // // validate tags input
    // if (Validator.isEmpty(validateTags)) {
    //     errors.thing2 = 'Tags are required'
    // }

    // return errors object and isValid boolean
    return {
        errors,
        isValid: isEmpty(errors)
    }
}

// export function
module.exports = validateRecipe

// import dependencies
const isEmpty = require('lodash.isempty')

// validate user input
const validateRecipe = data => {
    // instantiate an errors object
    let errors = {}

    // destructure data
    const {
        title,
        description,
        photo,
        prepTimeHours,
        prepTimeMinutes,
        cookTimeHours,
        cookTimeMinutes,
        preparations,
        ingredients,
        instructions,
        // notes,
        tagList,
        share
    } = data

    // validate title input
    if (!title) {
        errors.title = 'Title is required'
    }

    // validate description input
    if (!description) {
        errors.description = 'Description is required'
    }

    // validate preparations input
    if (isEmpty(preparations)) {
        errors.preparations = 'Preparations are required'
    }

    // validate ingredients input
    if (isEmpty(ingredients)) {
        errors.ingredients = 'Ingredients are required'
    }

    // validate instructions input
    if (isEmpty(instructions)) {
        errors.instructions = 'Instructions are required'
    }

    // // validate notes input
    // if (!notes) {
    //     errors.notes = 'Notes is required'
    // }

    // validate tag list input
    if (isEmpty(tagList)) {
        errors.tagList = 'Tags are required'
    }

    // return errors object and isValid boolean
    return {
        errors,
        isValid: isEmpty(errors)
    }
}

// export function
module.exports = validateRecipe

// import dependencies
const isEmpty = require('lodash.isempty')
const {
    fileExtension,
    fileSize
} = require('../helpers/utilities')

// validate user input
const validateRecipe = data => {
    // instantiate an errors object
    let errors = {}

    // destructure data
    const {
        title,
        description,
        prepTimeHours,
        prepTimeMinutes,
        cookTimeHours,
        cookTimeMinutes,
        servings,
        production,
        preparations,
        ingredients,
        instructions,
        tagList
    } = data

    // validate title input
    if (!title) {
        errors.title = 'Title is required'
    }

    // validatae description
    if (!description) {
        errors.description = 'Description is required'
    }

    // validate prep time
    if (!prepTimeHours && !prepTimeMinutes) {
        errors.prepTime = 'Prep time is required'
    }

    // validate cook time
    if (!cookTimeHours && !cookTimeMinutes) {
        errors.cookTime = 'Cook time is required'
    }

    // validate servings
    if (!servings) {
        errors.servings = 'Servings is required'
    }

    // destructure production (i.e. yield)
    const {
        name,
        quantity
    } = production

    // validate production (i.e. yield)
    if (!name || !quantity) {
        errors.production = 'Yield is required'
    }

    // validate preparations
    if (isEmpty(preparations)) {
        errors.preparations = 'Preparations are required'
    }

    // validate ingredients
    if (isEmpty(ingredients)) {
        errors.ingredients = 'Ingredients are required'
    }

    // validate instructions
    if (isEmpty(instructions)) {
        errors.instructions = 'Instructions are required'
    }

    // validate tag list
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

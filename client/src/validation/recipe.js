// import dependencies
import isEmpty from 'lodash/isEmpty'

// USE LODASH INSTEAD OF WHATEVER THOSE THINGS ARE

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

    
    // // convert empty fields into empty strings for Validator methods
    // const newObj = {}
    // Object.entries(obj).forEach(([key, value]) => {
    //     newObj[key] = value ? value : 'penis'
    // })

    // validate title input
    if (!title) {
        errors.title = 'Title is required'
    }

    // validatae description
    if (!description) {
        errors.description = 'Description is required'
    }

    // validate photo
    if (!photo) {
        errors.photo = 'Photo is required'
    }

    // validate prep time
    if (!prepTimeHours && !prepTimeMinutes) {
        errors.prepTime = 'Prep time is required'
    }

    // validate cook time
    if (!cookTimeHours && !cookTimeMinutes) {
        errors.cookTime = 'Cook time is required'
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

    // // validatae notes
    // if (!notes) {
    //     errors.notes = 'Notes are required'
    // }

    // validate tag list
    if (isEmpty(tagList)) {
        errors.tagList = 'Tags are required'
    }

    // validate share
    if (share && !photo) {
        errors.share = 'Photo is required to share'
    }

    // return errors object and isValid boolean
    return {
        errors,
        isValid: isEmpty(errors)
    }
}

// export function
export default validateRecipe

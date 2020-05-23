// import dependencies
import isEmpty from 'lodash/isEmpty'
import {
    fileExtension,
    fileSize
} from '../helpers/utilities'

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

    // validate photo
    if (!photo) {
        errors.photo = 'Photo is required'
    } else {
        // validate file extension
        const validateFileExtension = fileExtension(photo)
        // destructure validateFileExtension
        const [validExtension, extension] = validateFileExtension

        if (!validExtension) {
            errors.photo = `Invalid file type: ${extension}`
        }
    
        // validate file size
        const validateFileSize = fileSize(photo, 16)

        if (validateFileSize) {
            errors.photo = 'File size too large'
        }
    }

    // validate prep time
    if (!prepTimeHours && !prepTimeMinutes) {
        errors.prepTime = 'Prep time is required'
    }

    // validate cook time
    if (!cookTimeHours && !cookTimeMinutes) {
        errors.cookTime = 'Cook time is required'
    }

    // validate servings input
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
export default validateRecipe

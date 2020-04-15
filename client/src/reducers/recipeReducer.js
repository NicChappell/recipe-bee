// import actions
import {
    GET_RECIPE,
    GET_RECIPES,
    GET_UPLOAD,
    GET_UPLOADS,
    UPDATE_RECIPE
} from '../actions/types'

// define initial state
const initialState = {
    recipe: {},
    mostLovedRecipes: [],
    newRecipes: [],
    topRecipes: [],
    trendingRecipes: []
}

const recipeReducer = (state = initialState, action) => {
    // destructure action
    const {
        payload,
        type
    } = action

    // determine how to change state
    switch (type) {
        case GET_RECIPE:
            return {
                ...state,
                recipe: payload
            }
        case GET_RECIPES:
            // destructure payload
            const {
                key,
                value
            } = payload

            const oldValue = state[key]
            const newValue = oldValue.concat(value)

            return {
                ...state,
                [key]: newValue
            }
        case GET_UPLOAD:
            const { recipe } = state

            recipe = {
                ...recipe,
                photo: payload
            }

            return {
                ...state,
                recipe: payload
            }
        case GET_UPLOADS:
            return state
        case UPDATE_RECIPE:
            return state
        default:
            return state
    }
}

export default recipeReducer

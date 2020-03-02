// import actions
import { GET_RECIPES } from '../actions/types'

// define initial state
const initialState = {}

const recipeReducer = (state = initialState, action) => {
    // destructure action
    const {
        payload,
        type
    } = action

    // determine how to change state
    switch (type) {
        case GET_RECIPES:
            return payload
        default:
            return state
    }
}

export default recipeReducer

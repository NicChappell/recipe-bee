// import dependencies
import { combineReducers } from 'redux'

// import reducers
import authReducer from './authReducer'
import errorReducer from './errorReducer'
import recipeReducer from './recipeReducer'
import tagReducer from './tagReducer'

const appReducer = combineReducers({
    auth: authReducer,
    errors: errorReducer,
    recipes: recipeReducer,
    tags: tagReducer
})

const rootReducer = (state, action) => {
    // destructure action
    const {
        payload,
        type
    } = action

    if (payload === {} && type === 'SET_CURRENT_USER') {
        state = undefined
    }

    return appReducer(state, action)
}

export default rootReducer

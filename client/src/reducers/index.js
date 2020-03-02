// import dependencies
import { combineReducers } from 'redux'

// import reducers
import authReducer from './authReducer'
import errorReducer from './errorReducer'
// import recipeReducer from './recipeReducer'

const rootReducer = combineReducers({
    auth: authReducer,
    errors: errorReducer,
    // recipes: recipeReducer
})

export default rootReducer

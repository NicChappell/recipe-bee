// import dependencies
import { combineReducers } from 'redux'

// import reducers
import authReducer from './authReducer'
import errorReducer from './errorReducer'
import recipeReducer from './recipeReducer'
import tagReducer from './tagReducer'
import utilityReducer from './utilityReducer'

const rootReducer = combineReducers({
    auth: authReducer,
    errors: errorReducer,
    recipes: recipeReducer,
    tags: tagReducer,
    utilities: utilityReducer
})

export default rootReducer

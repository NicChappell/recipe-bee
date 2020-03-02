// import dependencies
import {
    createStore,
    applyMiddleware,
    compose
} from 'redux'
import thunk from 'redux-thunk'

// import root reducer
import rootReducer from "./reducers"

// define initial state
const initialState = {}

// define middleware
const middleware = [thunk]

// create store
const store = createStore(
    rootReducer,
    initialState,
    compose(applyMiddleware(...middleware))
)

export default store

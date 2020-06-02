// import actions
import { SET_ERRORS } from '../actions/types'

// define initial state
const initialState = {}

const errorReducer = (state = initialState, action) => {
    // destructure action
    const {
        payload,
        type
    } = action

    // determine how to change state
    switch (type) {
        case SET_ERRORS:
            return payload
        default:
            return state
    }
}

export default errorReducer

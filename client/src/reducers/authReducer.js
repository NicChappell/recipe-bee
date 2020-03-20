// import actions
import { SET_CURRENT_USER } from '../actions/types'

// import dependenices
const isEmpty = require('is-empty')

// define initial state
const initialState = {
    isAuthenticated: false,
    user: {}
}

const authReducer = (state = initialState, action) => {
    // destructure action
    const {
        payload,
        type
    } = action

    // determine how to change state
    switch (type) {
        case SET_CURRENT_USER:
            return {
                isAuthenticated: !isEmpty(payload),
                user: payload
            }
        default:
            return state
    }
}

export default authReducer

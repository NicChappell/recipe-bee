// import actions
import { SET_ROUTER_HEIGHT } from '../actions/types'

// define initial state
const initialState = {
    routerHeight: 0
}

const utilityReducer = (state = initialState, action) => {
    // destructure action
    const {
        payload,
        type
    } = action

    // determine how to change state
    switch (type) {
        case SET_ROUTER_HEIGHT:
            return {
                ...state,
                routerHeight: payload
            }
        default:
            return state
    }
}

export default utilityReducer

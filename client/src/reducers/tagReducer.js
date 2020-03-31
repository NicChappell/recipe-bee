// import actions
import { GET_TAGS } from '../actions/types'

// define initial state
const initialState = []

const tagReducer = (state = initialState, action) => {
    // destructure action
    const {
        payload,
        type
    } = action

    // determine how to change state
    switch (type) {
        case GET_TAGS:
            return payload
        default:
            return state
    }
}

export default tagReducer

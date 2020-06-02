// import dependencies
import axios from 'axios'

// import action types
import {
    SET_ERRORS,
    GET_TAGS
} from './types'

// get tags
export const getTags = () => dispatch => {
    axios.get('/api/v1/tags/')
        .then(res => dispatch({ type: GET_TAGS, payload: res.data }))
        .catch(err => dispatch({ type: SET_ERRORS, payload: err.response.data }))
}

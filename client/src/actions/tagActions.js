// import dependencies
import axios from 'axios'

// import action types
import {
    GET_ERRORS,
    GET_TAGS
} from './types'

// get tags
export const getTags = () => dispatch => {
    axios.get('/api/v1/tags/')
        .then(res => dispatch({ type: GET_TAGS, payload: res.data }))
        .catch(err => dispatch({ type: GET_ERRORS, payload: err.response.data }))
}

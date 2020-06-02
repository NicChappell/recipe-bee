// import dependencies
import axios from 'axios'

// import action types
import {
    DELETE_FILE,
    SET_ERRORS
} from './types'

// delete file
export const deleteFile = fileId => dispatch => {
    axios.delete(`/api/v1/uploads/files/${fileId}`)
        .then(res => dispatch({ type: DELETE_FILE, payload: res.data }))
        .catch(err => dispatch({ type: SET_ERRORS, payload: err.response.data }))
}

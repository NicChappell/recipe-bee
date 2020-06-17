// import dependencies
import axios from 'axios'

// import action types
import {
    SET_CURRENT_USER,
    SET_ERRORS,
} from './types'

// import helper funtions
import setAuthToken from '../helpers/setAuthToken'

// delete user
export const deleteUser = user => dispatch => {
    axios.delete(`/api/v1/users/${user._id}`)
        .then(() => {
            // remove token from local storage
            localStorage.removeItem('jwtToken')

            // remove auth header for future requests
            setAuthToken(false)

            // reset current user (will also set isAuthenticated to false)
            dispatch(setCurrentUser({}))
        })
        .catch(err => dispatch({ type: SET_ERRORS, payload: err.response.data }))
}

// set current user
export const setCurrentUser = (user) => dispatch => dispatch({ type: SET_CURRENT_USER, payload: user })

// update user
export const updateUser = (userId, profileData) => dispatch => {
    axios.put(`/api/v1/users/${userId}`, profileData)
        .then(res => dispatch({ type: SET_CURRENT_USER, payload: res.data.user }))
        .catch(err => dispatch({ type: SET_ERRORS, payload: err.response.data }))
}

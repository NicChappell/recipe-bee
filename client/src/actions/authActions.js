// import dependencies
import axios from 'axios'
import jwt_decode from 'jwt-decode'

// import actions
import {
    GET_ERRORS,
    SET_CURRENT_USER,
    UPDATE_CURRENT_USER
} from './types'

// import helper funtions
import setAuthToken from '../helpers/setAuthToken'

// sign-up user
export const signUpUser = (userData, history) => dispatch => {
    axios.post('/api/v1/users/sign-up', userData)
        .then(res => history.push('/sign-in'))
        .catch(err => dispatch({ type: GET_ERRORS, payload: err.response.data }))
}

// sign-in user
export const signInUser = userData => dispatch => {
    axios.post('/api/v1/users/sign-in', userData)
        .then(res => {
            // destructure response
            const { token } = res.data

            // set token and save to localStorage
            localStorage.setItem('jwtToken', token)

            // set token to auth header
            setAuthToken(token)

            // decode token to get user data
            const decoded = jwt_decode(token)

            // set current user
            dispatch(setCurrentUser(decoded))
        })
        .catch(err => dispatch({ type: GET_ERRORS, payload: err.response.data }))
}

// sign-out user
export const signOutUser = () => dispatch => {
    // remove token from local storage
    localStorage.removeItem('jwtToken')

    // remove auth header for future requests
    setAuthToken(false)

    // reset current user (will also set isAuthenticated to false)
    dispatch(setCurrentUser({}))
}

// set current user
export const setCurrentUser = decoded => ({ type: SET_CURRENT_USER, payload: decoded })

// WORK IN PROGRESS
// ****************
// update current user
export const udpateCurrentUser = (userId, userData) => dispatch => {
    axios.put(`/api/v1/users/${userId}`, userData)
        .then(res => dispatch({ type: UPDATE_CURRENT_USER, payload: res.data }))
        .catch(err => dispatch({ type: GET_ERRORS, payload: err.response.data }))
}
// ****************
// WORK IN PROGRESS

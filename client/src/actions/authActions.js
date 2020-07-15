// import dependencies
import jwt_decode from 'jwt-decode'

// import action types
import { SET_CURRENT_USER } from './types'

// import helper funtions
import setAuthToken from '../helpers/setAuthToken'

// sign-in user
export const signInUser = token => dispatch => {
    // set token in localStorage
    localStorage.setItem('jwtToken', token)

    // set token to auth header
    setAuthToken(token)

    // set current user
    dispatch(setCurrentUser(jwt_decode(token)))
}

// sign-out user
export const signOutUser = () => dispatch => {
    // remove token from local storage
    localStorage.removeItem('jwtToken')

    // reset token from auth header
    setAuthToken(false)

    // reset current user
    dispatch(setCurrentUser({}))
}

// set current user
export const setCurrentUser = decoded => ({ type: SET_CURRENT_USER, payload: decoded })

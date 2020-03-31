// import dependencies
import React from 'react'
import ReactDOM from 'react-dom'
import { Provider } from 'react-redux'
import jwt_decode from 'jwt-decode'

// import store
import store from './store'

// import auth actions
import {
	setCurrentUser,
	signOutUser
} from './actions/authActions'

// import helper functions
import setAuthToken from './helpers/setAuthToken'

// import App component
import App from './App'

// check localStorage for jwtToken
if (localStorage.jwtToken) {
    const token = localStorage.jwtToken

    // apply token to every request if authenticated
    setAuthToken(token)

    // decode token to get user info and expiration
    const decoded = jwt_decode(token)

    // set current user / authenticate user
    store.dispatch(setCurrentUser(decoded))

    // get current time in milliseconds
    const currentTime = (Date.now() / 1000)

    // check for expired token
    if (decoded.exp < currentTime) {
        // sign out user
        store.dispatch(signOutUser())
    }
}

ReactDOM.render(
    <Provider store={store}>
        <App />
    </Provider>,
    document.getElementById('root')
)

// import dependencies
import React, { useEffect, useState } from 'react'
import PropTypes from 'prop-types'
import axios from 'axios'
import isEmpty from 'lodash.isempty'

// import helpers
import { abbreviateNumber } from '../../helpers/utilities'

const UsersCount = () => {
    // state hook variables
    const [applicationErrors, setApplicationErrors] = useState({})
    const [usersCount, setUsersCount] = useState(0)

    // get users count when component mounts
    useEffect(() => {
        axios.get('/api/v1/users/utilities/count')
            .then(res => setUsersCount(res.data.count))
            .catch(err => setApplicationErrors(err))
    }, [])

    if (!isEmpty(applicationErrors)) {
        return (
            <div className="col s12 m6 l4">
                <div className="card-panel left-align">
                    <p className="error-message">
                        An error occurred, please try again later
                    </p>
                </div>
            </div>
        )
    }
    return (
        <div className="col s12 m6 l4">
            <div className="card-panel left-align">
                <span className="icon">
                    <i className="material-icons">person</i>
                </span>
                <span className="number">{abbreviateNumber(usersCount)}</span>
                <span className="description">Active users</span>
            </div>
        </div>
    )
}

const RecipesCount = () => {
    // state hook variables
    const [applicationErrors, setApplicationErrors] = useState({})
    const [recipesCount, setRecipesCount] = useState(0)

    // get recipes count when component mounts
    useEffect(() => {
        axios.get('/api/v1/recipes/utilities/count')
            .then(res => setRecipesCount(res.data.count))
            .catch(err => setApplicationErrors(err))
    }, [])

    if (!isEmpty(applicationErrors)) {
        return (
            <div className="col s12 m6 l4">
                <div className="card-panel left-align">
                    <p className="error-message">
                        An error occurred, please try again later
                    </p>
                </div>
            </div>
        )
    }
    return (
        <div className="col s12 m6 l4">
            <div className="card-panel left-align">
                <span className="icon">
                    <i className="material-icons">book</i>
                </span>
                <span className="number">{abbreviateNumber(recipesCount)}</span>
                <span className="description">Recipes created</span>
            </div>
        </div>
    )
}

const SharedRecipesCount = () => {
    // state hook variables
    const [applicationErrors, setApplicationErrors] = useState({})
    const [sharedRecipesCount, setSharedRecipesCount] = useState(0)

    // get shared recipes count when component mounts
    useEffect(() => {
        axios.get('/api/v1/recipes/utilities/shared-count')
            .then(res => setSharedRecipesCount(res.data.count))
            .catch(err => setApplicationErrors(err))
    }, [])

    if (!isEmpty(applicationErrors)) {
        return (
            <div className="col s12 m6 l4">
                <div className="card-panel left-align">
                    <p className="error-message">
                        An error occurred, please try again later
                    </p>
                </div>
            </div>
        )
    }
    return (
        <div className="col s12 m6 push-m3 l4">
            <div className="card-panel left-align">
                <span className="icon">
                    <i className="material-icons">share</i>
                </span>
                <span className="number">{abbreviateNumber(sharedRecipesCount)}</span>
                <span className="description">Recipes shared</span>
            </div>
        </div>
    )
}

const ByTheNumbers = () => {
    return (
        <div className="row by-the-numbers">
            <div className="col s12">
                <h5>RecipeBee by the Numbers</h5>
                <UsersCount />
                <RecipesCount />
                <SharedRecipesCount />
            </div>
        </div >
    )
}

ByTheNumbers.propTypes = { errors: PropTypes.object }

export default ByTheNumbers

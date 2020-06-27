// import dependencies
import React, { useEffect, useState } from 'react'
import PropTypes from 'prop-types'
import axios from 'axios'
import isEmpty from 'lodash.isempty'

// import components
import DateRanges from '../utility/DateRanges'

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

const RecipesDateRange = () => {
    // state hook variables
    const [applicationErrors, setApplicationErrors] = useState({})
    const [days, setDays] = useState('30')
    const [recipesCount, setRecipesCount] = useState(0)

    const countRecipes = () => {
        axios.get(`/api/v1/recipes/utilities/count?sortMethod=newRecipes&days=${days}`)
            .then(res => setRecipesCount(res.data.count))
            .catch(err => setApplicationErrors(err))
    }

    // get recipes count when days changes
    useEffect(() => {
        countRecipes()
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [days])

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
                    <i className="material-icons">date_range</i>
                </span>
                <span className="number">{abbreviateNumber(recipesCount)}</span>
                <DateRanges context={'Recipes created previous'} initState={days} liftState={setDays} />
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
                <RecipesDateRange />
            </div>
        </div >
    )
}

ByTheNumbers.propTypes = { errors: PropTypes.object }

export default ByTheNumbers

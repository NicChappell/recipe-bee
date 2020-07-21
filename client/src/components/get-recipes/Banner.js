// import dependencies
import React from 'react'
import { Link } from 'react-router-dom'
import PropTypes from 'prop-types'

const Banner = ({ isAuthenticated }) => {
    if (isAuthenticated) {
        return (
            <div className="row banner">
                <div className="col s12 content">
                    <p>Add your favorite recipes and share them with the RecipeBee community</p>
                    <Link to="/recipes/create" className="btn btn-flat amber lighten-2 black-text">Create Recipe</Link>
                </div>
            </div>
        )
    }
    return (
        <div className="row banner">
            <div className="col s12 content">
                <p>RecipeBee makes it easy to save your favorite recipes and discover new ideas</p>
                <Link to="/sign-up" className="btn btn-flat amber lighten-2 black-text">Create Account</Link>
            </div>
        </div>
    )
}

Banner.propTypes = { isAuthenticated: PropTypes.bool }

export default Banner

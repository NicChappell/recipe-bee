// import dependencies
import React from 'react'
import PropTypes from 'prop-types'
import { Link } from 'react-router-dom'

const ValueProps = ({ auth }) => {
    // destructure auth
    const { isAuthenticated } = auth

    return (
        <div className="row value-props">
            <div className="col s12 header">
                <h3><span>Recipes</span> <span>done right</span></h3>
                <p className="flow-text"><span>RecipeBee makes it easy to save,</span> <span>share and discover new ideas</span></p>
                {
                    !isAuthenticated
                        ? <Link to="/sign-up" className="btn-flat amber lighten-2 black-text">Create Account</Link>
                        : null
                }
            </div>
            <div className="col s12 m8 push-m1">
                <div className="card-panel value-prop">
                    <i className="material-icons left">favorite</i>
                    <div className="description">
                        <h5>Save</h5>
                        <p className="flow-text">Add recipes you love and save your favorites</p>
                    </div>
                </div>
            </div>
            <div className="col s12 m8 push-m3">
                <div className="card-panel value-prop">
                    <i className="material-icons left">share</i>
                    <div className="description">
                        <h5>Share</h5>
                        <p className="flow-text">Share your best ideas with the RecipeBee community</p>
                    </div>
                </div>
            </div>
            <div className="col s12 m8 push-m1">
                <div className="card-panel value-prop">
                    <i className="material-icons left">search</i>
                    <div className="description">
                        <h5>Discover</h5>
                        <p className="flow-text">Explore our recipes and discover something new to try</p>
                    </div>
                </div>
            </div>
        </div>
    )
}

ValueProps.propTypes = { auth: PropTypes.object }

export default ValueProps

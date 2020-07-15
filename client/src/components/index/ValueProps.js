// import dependencies
import React from 'react'
import { Link } from 'react-router-dom'

const ValueProps = ({ isAuthenticated }) => {
    return (
        <div className="row value-props">
            <div className="col s12 center-align">
                <h3>Recipes done right</h3>
                <p className="flow-text">RecipeBee makes it easy to save, share and discover new ideas</p>
                {
                    !isAuthenticated
                        ? <Link to="/sign-up" className="btn-large amber lighten-2 black-text">Create Account</Link>
                        : null
                }
            </div>
            <div className="col s12 m8 push-m1">
                <div className="card-panel value-prop">
                    <i className="material-icons left">favorite</i>
                    <div className="description">
                        <h5>Save</h5>
                        <p className="flow-text">Add recipes of your own and save your favorites</p>
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
                        <p className="flow-text">An endless stream of new recipes to discover</p>
                    </div>
                </div>
            </div>
        </div>
    )
}

export default ValueProps

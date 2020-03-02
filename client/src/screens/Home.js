// import dependencies
import React from 'react'
import PropTypes from 'prop-types'
import { connect } from 'react-redux'
import { Link } from 'react-router-dom'

// import images
import find from '../images/marketing/find-rgb.svg'
import create from '../images/marketing/create-rgb.svg'
import save from '../images/marketing/save-rgb.svg'
import share from '../images/marketing/share-rgb.svg'

const Home = ({ auth }) => {
    // destructure auth
    const { isAuthenticated } = auth

    // authenticated content
    if (isAuthenticated) {
        return (
            <div className="container">
                <div className="row">
                    <div className="col s12">
                        Authenticated Home
                    </div>
                </div>
            </div>
        )
    }
    // unauthenticated content
    return (
        <div className="container">
            <div className="row">
                <div className="center-align col s12 mt-3">
                    <h3>Make meal planning easy and fun</h3>
                    <p className="flow-text">RecipeBee keeps track of the meals you love and creates customized meal plans</p>
                </div>
            </div>
            <div className="row">
                <div className="center-align col s12 mb-2">
                    <Link to="/sign-up" className="black-text btn-large lighten-2 orange">Create Account</Link>
                </div>
            </div>
            <div className="row">
                <div className="col s12 m10 push-m1 l6">
                    <div className="card horizontal">
                        <div className="card-image marketing">
                            <img src={find} alt="Find" />
                        </div>
                        <div className="card-content">
                            <h5>Find</h5>
                            <p>Try something new. Take note of the ingredients and instructions.</p>
                        </div>
                    </div>
                </div>
                <div className="col s12 m10 push-m1 l6">
                    <div className="card horizontal">
                        <div className="card-image marketing">
                            <img src={save} alt="Save" />
                        </div>
                        <div className="card-content">
                            <h5>Save</h5>
                            <p>Snap a photo of your dish. Save the details with RecipeBee.</p>
                        </div>
                    </div>
                </div>
                <div className="col s12 m10 push-m1 l6">
                    <div className="card horizontal">
                        <div className="card-image marketing">
                            <img src={create} alt="Create" />
                        </div>
                        <div className="card-content">
                            <h5>Create</h5>
                            <p>Select the recipes you want. RecipeBee will create a customized shopping list.</p>
                        </div>
                    </div>
                </div>
                <div className="col s12 m10 push-m1 l6">
                    <div className="card horizontal">
                        <div className="card-image marketing">
                            <img src={share} alt="Share" />
                        </div>
                        <div className="card-content">
                            <h5>Share</h5>
                            <p>Share your favorite recipes with the RecipeBee community.</p>
                        </div>
                    </div>
                </div>
            </div>
            <hr className="mb-3 mt-5" />
            <div className="row">
                <div className="center-align col s12">
                    <h3>RecipeBee keeps it simple</h3>
                    <p className="flow-text">There are plenty of things to worry about, but meal planning shouldn't be one of them</p>
                </div>
            </div>
            <div className="row">
                <div className="col s12 m8 push-m1">
                    <blockquote>
                        Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat.
                    </blockquote>
                    <p>– Sabina Ridley, Arlington, TX</p>
                </div>
                <div className="col s12 m8 push-m3">
                    <blockquote>
                        Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur. Excepteur sint occaecat cupidatat non proident, sunt in culpa qui officia deserunt mollit anim id est laborum.
                    </blockquote>
                    <p>– Sam Holland, San Jose, CA</p>
                </div>
                <div className="col s12 m8 push-m1">
                    <blockquote>
                        Eget felis eget nunc lobortis mattis. At risus viverra adipiscing at in tellus integer. Sit amet est placerat in egestas erat imperdiet. Lacus suspendisse faucibus interdum posuere lorem ipsum dolor.
                    </blockquote>
                    <p>– Miranda Lowry, Henderson, NV</p>
                </div>
            </div>
            <hr className="mb-3 mt-5" />
            <div className="row">
                <div className="center-align col s12">
                    <h3>The results are in</h3>
                    <p className="flow-text">These are RecipeBee's most popular recipes</p>
                </div>
            </div>
            <div className="row">
                <div className="col s12 m6 xl3">
                    <div className="card">
                        <div className="card-image">
                            <img src={"https://via.placeholder.com/512"} alt="" />
                            <span className="card-title">Recipe Title</span>
                        </div>
                        <div className="card-content">
                            <p>Lorem ipsum dolor sit amet, consectetur adipiscing elit. Integer condimentum mattis dolor, at tempor neque vestibulum id.</p>
                        </div>
                        <div className="card-action">
                            <Link className="black-text btn orange lighten-2" to={`recipes/${"recipe.id"}`}>
                                Details
                            </Link>
                        </div>
                    </div>
                </div>
                <div className="col s12 m6 xl3">
                    <div className="card">
                        <div className="card-image">
                            <img src={"https://via.placeholder.com/512"} alt="" />
                            <span className="card-title">Recipe Title</span>
                        </div>
                        <div className="card-content">
                            <p>Lorem ipsum dolor sit amet, consectetur adipiscing elit. Integer condimentum mattis dolor, at tempor neque vestibulum id.</p>
                        </div>
                        <div className="card-action">
                            <Link className="black-text btn orange lighten-2" to={`recipes/${"recipe.id"}`}>
                                Details
                            </Link>
                        </div>
                    </div>
                </div>
                <div className="col s12 m6 xl3">
                    <div className="card">
                        <div className="card-image">
                            <img src={"https://via.placeholder.com/512"} alt="" />
                            <span className="card-title">Recipe Title</span>
                        </div>
                        <div className="card-content">
                            <p>Lorem ipsum dolor sit amet, consectetur adipiscing elit. Integer condimentum mattis dolor, at tempor neque vestibulum id.</p>
                        </div>
                        <div className="card-action">
                            <Link className="black-text btn orange lighten-2" to={`recipes/${"recipe.id"}`}>
                                Details
                            </Link>
                        </div>
                    </div>
                </div>
                <div className="col s12 m6 xl3">
                    <div className="card">
                        <div className="card-image">
                            <img src={"https://via.placeholder.com/512"} alt="" />
                            <span className="card-title">Recipe Title</span>
                        </div>
                        <div className="card-content">
                            <p>Lorem ipsum dolor sit amet, consectetur adipiscing elit. Integer condimentum mattis dolor, at tempor neque vestibulum id.</p>
                        </div>
                        <div className="card-action">
                            <Link className="black-text btn orange lighten-2" to={`recipes/${"recipe.id"}`}>
                                Details
                            </Link>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    )
}

Home.propTypes = {
    auth: PropTypes.object.isRequired
}

const mapStateToProps = state => ({
    auth: state.auth
})

export default connect(
    mapStateToProps
)(Home)

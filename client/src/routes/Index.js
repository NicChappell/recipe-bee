// import dependencies
import React, { useEffect, useState } from 'react'
import PropTypes from 'prop-types'
import { connect } from 'react-redux'
import { Link } from 'react-router-dom'
import isEmpty from 'lodash/isEmpty'

// import actions
import {
    changeHeart,
    changeVote
} from '../actions/recipeActions'

// import components
import RecipesPreview from '../components/recipe/RecipesPreview'

// import images
import find from '../images/marketing/find-rgb.svg'
import create from '../images/marketing/create-rgb.svg'
import save from '../images/marketing/save-rgb.svg'
import share from '../images/marketing/share-rgb.svg'

const Index = (props) => {
    // destructure props
    const {
        auth,
        changeHeart,
        changeVote,
        recipes
    } = props

    // destructure auth
    const {
        isAuthenticated,
        user
    } = auth

    // destructure recipes
    const { searchableRecipes } = recipes

    // destructure searchable recipes
    const {
        mostLovedRecipes,
        newRecipes,
        topRecipes,
        trendingRecipes
    } = searchableRecipes

    // state hook variables
    const [mostLovedRecipesSlice, setMostLovedRecipesSlice] = useState([])
    const [newRecipesSlice, setNewRecipesSlice] = useState([])
    const [topRecipesSlice, setTopRecipesSlice] = useState([])
    const [trendingRecipesSlice, setTrendingRecipesSlice] = useState([])

    // slice recipes arrays when values change
    useEffect(() => {
        if (!isEmpty(mostLovedRecipes)) {
            setMostLovedRecipesSlice(mostLovedRecipes.slice(0, 5))
        }
        if (!isEmpty(newRecipes)) {
            setNewRecipesSlice(newRecipes.slice(0, 5))
        }
        if (!isEmpty(topRecipes)) {
            setTopRecipesSlice(topRecipes.slice(0, 5))
        }
        if (!isEmpty(trendingRecipes)) {
            setTrendingRecipesSlice(trendingRecipes.slice(0, 5))
        }
    }, [searchableRecipes])

    // authenticated content
    if (isAuthenticated) {
        return (
            <div className="container" id="index">
                <div className="row">
                    <div className="col s12">
                        <h5>Most Loved Recipes</h5>
                    </div>
                    <div className="col s12">
                        <RecipesPreview
                            changeHeart={changeHeart}
                            changeVote={changeVote}
                            isAuthenticated={isAuthenticated}
                            recipes={mostLovedRecipesSlice}
                            user={user}
                        />
                    </div>
                </div>
                <div className="row">
                    <div className="col s12">
                        <h5>Newest Recipes</h5>
                    </div>
                    <div className="col s12">
                        <RecipesPreview
                            changeHeart={changeHeart}
                            changeVote={changeVote}
                            isAuthenticated={isAuthenticated}
                            recipes={newRecipesSlice}
                            user={user}
                        />
                    </div>
                </div>
                <div className="row">
                    <div className="col s12">
                        <h5>Top Recipes</h5>
                    </div>
                    <div className="col s12">
                        <RecipesPreview
                            changeHeart={changeHeart}
                            changeVote={changeVote}
                            isAuthenticated={isAuthenticated}
                            recipes={topRecipesSlice}
                            user={user}
                        />
                    </div>
                </div>
                <div className="row">
                    <div className="col s12">
                        <h5>Trending Recipes</h5>
                    </div>
                    <div className="col s12">
                        <RecipesPreview
                            changeHeart={changeHeart}
                            changeVote={changeVote}
                            isAuthenticated={isAuthenticated}
                            recipes={trendingRecipesSlice}
                            user={user}
                        />
                    </div>
                </div>
            </div>
        )
    }
    // unauthenticated content
    return (
        <div className="container" id="index">
            <div className="row">
                <div className="center-align col s12">
                    <h5>Make meal planning easy and fun</h5>
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
                    <h5>RecipeBee keeps it simple</h5>
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
                    <h5>The results are in</h5>
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

Index.propTypes = {
    auth: PropTypes.object,
    changeHeart: PropTypes.func,
    changeVote: PropTypes.func,
    recipes: PropTypes.object
}

const mapStateToProps = state => ({
    auth: state.auth,
    recipes: state.recipes
})

const actionCreators = {
    changeHeart,
    changeVote
}

export default connect(mapStateToProps, actionCreators)(Index)

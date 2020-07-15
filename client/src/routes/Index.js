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
import RecipesPreview from '../components/index/RecipesPreview'
import Testimonials from '../components/index/Testimonials'
import ValueProps from '../components/index/ValueProps'

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
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [searchableRecipes])

    return (
        <div className="container" id="index">
            <ValueProps isAuthenticated={isAuthenticated} />
            <hr className="mb-3 mt-5" />
            <div className="row">
                <div className="col s12 center-align">
                    <h3>The results are in</h3>
                    <p className="flow-text">These are RecipeBee's most popular recipes</p>
                    <Link to="/recipes" className="btn-large amber lighten-2 black-text">More Recipes</Link>
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
                <div className="col s12">
                    <RecipesPreview
                        changeHeart={changeHeart}
                        changeVote={changeVote}
                        isAuthenticated={isAuthenticated}
                        recipes={newRecipesSlice}
                        user={user}
                    />
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
            <hr className="mb-3 mt-5" />
            <Testimonials />
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

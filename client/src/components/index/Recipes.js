// import dependencies
import React, { useEffect, useState } from 'react'
import PropTypes from 'prop-types'
import { Link } from 'react-router-dom'

// import components
import RecipeCardList from '../recipe/RecipeCardList'

// import custom hooks
import { useSelectValue } from '../../helpers/customHooks'

const SortMethods = ({ liftState }) => {
    // custom hook variables
    const sortMethods = useSelectValue('trending')

    // lift state when selected option changes
    useEffect(() => {
        liftState(sortMethods.value)
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [sortMethods.value])

    return (
        <select
            {...sortMethods}
            name="sort-method"
        >
            <option value="trending">top trending</option>
            <option value="loved">most loved</option>
            <option value="top">highest rated</option>
        </select>
    )
}

SortMethods.propTypes = { liftState: PropTypes.func }

const Recipes = props => {
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
    const {
        mostLovedRecipes,
        topRecipes,
        trendingRecipes
    } = recipes.searchableRecipes

    // state hook variables
    const [sortMethod, setSortMethod] = useState('')
    const [spotlight, setSpotlight] = useState([])

    // update state when sort method changes
    useEffect(() => {
        switch (sortMethod) {
            case 'trending':
                setSpotlight(trendingRecipes.slice(0, 10))
                break
            case 'loved':
                setSpotlight(mostLovedRecipes.slice(0, 10))
                break
            case 'top':
                setSpotlight(topRecipes.slice(0, 10))
                break
            default:
                setSpotlight([])
        }
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [sortMethod])

    return (
        <div className="row recipes">
            <div className="col s12 header">
                <h3>
                    <span>The results</span> <span>are in</span>
                </h3>
                <div className="flow-text">
                    <span>These are RecipeBee's</span>
                    <SortMethods liftState={setSortMethod} />
                    <span>recipes</span>
                </div>
                <Link to="/recipes" className="btn-flat amber lighten-2 black-text">More Recipes</Link>
                {
                    isAuthenticated
                        ? <Link to="/recipes/create" className="btn-flat amber lighten-2 black-text">Create Recipe</Link>
                        : null
                }
            </div>
            <div className="col s12">
                <RecipeCardList
                    changeHeart={changeHeart}
                    changeVote={changeVote}
                    isAuthenticated={isAuthenticated}
                    recipes={spotlight}
                    user={user}
                />
            </div>
        </div>
    )
}

Recipes.propTypes = {
    auth: PropTypes.object,
    changeHeart: PropTypes.func,
    changeVote: PropTypes.func,
    recipes: PropTypes.object
}

export default Recipes

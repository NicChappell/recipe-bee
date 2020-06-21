// import dependencies
import React, { useEffect, useState } from 'react'
import PropTypes from 'prop-types'
import isEmpty from 'lodash/isEmpty'

// import components
import RecipeCard from './RecipeCard'
import Preloader from '../utility/Preloader'

const RecipeCardList = props => {
    // destructure props
    const {
        changeHeart,
        changeVote,
        isAuthenticated,
        recipes,
        user
    } = props

    // destructure user
    const { id } = user

    // state hook variables
    const [arrayHalves, setArrayHalves] = useState([[], []])

    const halveRecipeArray = recipes => {
        // create local variables
        const firstHalf = []
        const secondHalf = []

        recipes && recipes.forEach((item, index) => {
            if (index % 2 === 0) {
                firstHalf.push(item)
            } else {
                secondHalf.push(item)
            }
        })

        // update state
        setArrayHalves([firstHalf, secondHalf])
    }

    // halve recipes array when value changes
    useEffect(() => halveRecipeArray(recipes), [recipes])

    if (!isEmpty(arrayHalves[0]) || !isEmpty(arrayHalves[1])) {
        return (
            <div className="row recipes">
                <div className="col m6 hide-on-small-only">
                    {arrayHalves[0].map(recipe => {
                        return (
                            <RecipeCard
                                changeHeart={changeHeart}
                                changeVote={changeVote}
                                isAuthenticated={isAuthenticated}
                                key={recipe._id}
                                recipe={recipe}
                                userId={user._id}
                            />
                        )
                    })}
                </div>
                <div className="col m6 hide-on-small-only">
                    {arrayHalves[1].map(recipe => {
                        return (
                            <RecipeCard
                                changeHeart={changeHeart}
                                changeVote={changeVote}
                                isAuthenticated={isAuthenticated}
                                key={recipe._id}
                                recipe={recipe}
                                userId={user._id}
                            />
                        )
                    })}
                </div>
                <div className="col s12 hide-on-med-and-up">
                    {recipes.map(recipe => {
                        return (
                            <RecipeCard
                                changeHeart={changeHeart}
                                changeVote={changeVote}
                                isAuthenticated={isAuthenticated}
                                key={recipe._id}
                                recipe={recipe}
                                userId={user._id}
                            />
                        )
                    })}
                </div>
            </div>
        )
    }
    return <Preloader />
}

RecipeCardList.propTypes = {
    changeHeart: PropTypes.func,
    changeVote: PropTypes.func,
    isAuthenticated: PropTypes.bool,
    recipes: PropTypes.array,
    user: PropTypes.object
}

export default RecipeCardList

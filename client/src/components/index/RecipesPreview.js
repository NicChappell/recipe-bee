// import dependencies
import React from 'react'
import PropTypes from 'prop-types'
import isEmpty from 'lodash/isEmpty'

// import components
import RecipeCard from '../recipe/RecipeCard'
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

    if (!isEmpty(recipes)) {
        return (
            <div className="row recipes-preview">
                <div className="col s12 overflow-x-container">
                    <div className="overflow-x-content">
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

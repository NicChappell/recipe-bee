// import dependencies
import React, { useEffect } from 'react'
import { connect } from 'react-redux'
import PropTypes from 'prop-types'
import isEmpty from 'lodash/isEmpty'

// import actions
import {
    changeHeart,
    changeVote,
    getRecipe
} from '../actions/recipeActions'

// import components
import Button from '../components/get-recipe/Button'
import Recipe from '../components/get-recipe/Recipe'
import Preloader from '../components/utility/Preloader'

const GetRecipe = props => {
    // destructure props
    const {
        auth,
        changeHeart,
        changeVote,
        getRecipe,
        match,
        recipes
    } = props

    // destructure recipes
    const { recipe } = recipes

    // get recipe after component mount
    useEffect(() => {
        // destructure router props
        const { recipeId } = match.params

        // dispatch getRecipe action
        getRecipe(recipeId)

        // reset recipe when component unmounts
        return () => getRecipe('reset')

        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [])

    if (!isEmpty(recipe)) {
        return (
            <div className="container" id="get-recipe">
                <div className="row">
                    <Button
                        auth={auth}
                        recipes={recipes}
                    />
                    <Recipe
                        auth={auth}
                        changeHeart={changeHeart}
                        changeVote={changeVote}
                        recipe={recipe}
                    />
                </div>
            </div>
        )
    }
    return <Preloader />
}

GetRecipe.propTypes = {
    auth: PropTypes.object,
    changeHeart: PropTypes.func,
    changeVote: PropTypes.func,
    getRecipe: PropTypes.func,
    match: PropTypes.object,
    recipes: PropTypes.object
}

const mapStateToProps = state => ({
    auth: state.auth,
    recipes: state.recipes
})

const actionCreators = {
    changeHeart,
    changeVote,
    getRecipe
}

export default connect(mapStateToProps, actionCreators)(GetRecipe)

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
import HeartAction from '../components/recipe/HeartAction'
import Preloader from '../components/utility/Preloader'
import VoteAction from '../components/recipe/VoteAction'

const GetRecipe = props => {
    // destructure props
    const {
        auth,
        changeHeart,
        changeVote,
        errors,
        getRecipe,
        match,
        recipes
    } = props

    // destructure auth
    const {
        isAuthenticated,
        user
    } = auth
    console.log(auth)

    // destructure recipes
    const { recipe } = recipes

    // destructure recipe
    const {
        cookTime,
        description,
        downVotes,
        hearts,
        ingredients,
        instructions,
        netVotes,
        notes,
        photo,
        prepTime,
        preparations,
        production,
        servings,
        tagList,
        title,
        totalHearts,
        upVotes,
        user: recipeUser,
        _id: recipeId
    } = recipe
    console.log(user)
    console.log(recipeUser)

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

    if (!isEmpty(errors)) {
        return (
            <div className="container">
                <div className="row mt-5">
                    <div className="center-align col s12">
                        There's been an error
                    </div>
                </div>
            </div>
        )
    }

    if (!isEmpty(recipe)) {
        return (
            <div className="container" id="get-recipe">
                <div className="row">
                    <div className="col s12 right-align">
                        {user._id === recipeUser._id
                            ? <button className="btn btn-small amber lighten-2 black-text"><i className="material-icons left">edit</i> Edit Recipe</button>
                            : null
                        }
                    </div>
                </div>
                <div className="row">
                    <div className="col s12">
                        <div className="card-panel">
                            <div className="row">
                                <div className="col s12 m6">
                                    <div className="row">
                                        <div className="col s12">
                                            <h3>{title}</h3>
                                        </div>
                                        <div className="col s12">
                                            <p>Crafted by {recipeUser.fullName}</p>
                                        </div>
                                        <div className="col s6 m12 l6">
                                            <p>
                                                <i className="material-icons left">timer</i>
                                                Prep Time: {prepTime.hours ? `${prepTime.hours} hours` : null} {prepTime.minutes ? `${prepTime.minutes} minutes` : null}
                                            </p>
                                            <p>
                                                <i className="material-icons left">timer</i>
                                                Cook Time: {cookTime.hours ? `${cookTime.hours} hours` : null} {cookTime.minutes ? `${cookTime.minutes} minutes` : null}
                                            </p>
                                        </div>
                                        <div className="col s6 m12 l6">
                                            <p><i className="material-icons left">room_service</i> Servings: {servings}</p>
                                            <p><i className="material-icons left">add_circle_outline</i> Yield: {production.quantity} {production.unit} {production.name}</p>
                                        </div>
                                        <div className="col s12">
                                            <p className="flow-text">{description}</p>
                                        </div>
                                    </div>
                                </div>
                                <div className="col s12 m6 recipe-image">
                                    <div className="row">
                                        <div className="col s12">
                                            <img alt="" src={photo && `/api/v1/uploads/image/${photo.filename}`} />
                                        </div>
                                    </div>
                                    <div className="row">
                                        <div className="col s12 recipe-action">
                                            <div className="actions">
                                                <HeartAction
                                                    action={changeHeart}
                                                    hearts={hearts}
                                                    isAuthenticated={isAuthenticated}
                                                    recipeId={recipeId}
                                                    totalHearts={totalHearts}
                                                    userId={user._id}
                                                />
                                                <VoteAction
                                                    action={changeVote}
                                                    downVotes={downVotes}
                                                    isAuthenticated={isAuthenticated}
                                                    recipeId={recipeId}
                                                    netVotes={netVotes}
                                                    upVotes={upVotes}
                                                    userId={user._id}
                                                />
                                            </div>
                                            <div className="tags">
                                                {tagList.map((tag, i) => <div className="chip amber lighten-2" key={i}>{tag}</div>)}
                                            </div>
                                        </div>
                                    </div>
                                </div>
                            </div>
                            <div className="row">
                                <div className="col s12 m6">
                                    <h5>Ingredients</h5>
                                    <ul>
                                        {ingredients && ingredients.map(ingredient => <li className="ingredient" key={ingredient.id}>{ingredient.quantity} {ingredient.unit} {ingredient.name}</li>)}
                                    </ul>
                                </div>
                                <div className="col s12 m6">
                                    <h5>Preparations</h5>
                                    <ul>
                                        {preparations && preparations.map(preparation => <li className="preparation" key={preparation.id}>{preparation.value}</li>)}
                                    </ul>
                                </div>
                                <div className="col s12">
                                    <h5>Instructions</h5>
                                    <ul>
                                        {instructions && instructions.map(instruction => <li className="instruction" key={instruction.id}>{instruction.value}</li>)}
                                    </ul>
                                </div>
                            </div>
                            <div className="row">
                                <div className="col s12">
                                    <h5>Notes</h5>
                                    <p>{notes}</p>
                                </div>
                            </div>
                        </div>
                    </div>
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
    errors: PropTypes.object,
    getRecipe: PropTypes.func,
    recipes: PropTypes.object
}

const mapStateToProps = state => ({
    auth: state.auth,
    errors: state.errors,
    recipes: state.recipes
})

const actionCreators = {
    changeHeart,
    changeVote,
    getRecipe
}

export default connect(mapStateToProps, actionCreators)(GetRecipe)

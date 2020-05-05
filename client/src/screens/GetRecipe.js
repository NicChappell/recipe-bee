// import dependencies
import React, { useEffect } from 'react'
import { connect } from 'react-redux'
import PropTypes from 'prop-types'
import isEmpty from 'lodash/isEmpty'
import axios from 'axios'

// import actions
import {
    getRecipe,
    updateRecipe
} from '../actions/recipeActions'

// import helper functions
import { formatTime } from '../helpers/utilities'

// import components
import Breadcrumb from '../components/layout/Breadcrumb'
import HeartAction from '../components/recipe/HeartAction'
import Preloader from '../components/utility/Preloader'
import VoteAction from '../components/recipe/VoteAction'

const GetRecipe = props => {
    // destructure props
    const {
        auth,
        errors,
        getRecipe,
        location,
        match,
        recipes,
        updateRecipe,
        utilities
    } = props

    // destructure auth object
    const {
        isAuthenticated,
        user
    } = auth
    const userId = user.id

    // destructure recipes object
    const { recipe } = recipes

    // destructure recipe object
    const {
        cookTime,
        createdAt,
        description,
        downVotes,
        hearts,
        ingredients,
        instructions,
        netVotes,
        notes,
        percentDownVotes,
        percentUpVotes,
        photo,
        prepTime,
        preparations,
        share,
        slug,
        tagList,
        title,
        totalHearts,
        upVotes,
        updatedAt
        // user
        // _id
    } = recipe
    const recipeUser = recipe.user
    const recipeId = recipe._id

    // destructure utilities object
    const { routerHeight } = utilities

    // get recipe after component mount
    useEffect(() => {
        // destructure router props
        const { recipeId } = match.params

        // dispatch getRecipe action
        getRecipe(recipeId)
    }, [])

    // if (!isEmpty(errors)) {
    //     return (
    //         <div className="container">
    //             <div className="row mt-5">
    //                 <div className="center-align col s12">
    //                     {errors.recipe}
    //                 </div>
    //             </div>
    //         </div>
    //     )
    // }

    if (!isEmpty(recipeId)) {
        return (
            <div className="container router" id="get-recipe" style={{ height: routerHeight }}>
                <Breadcrumb location={location} />
                <div className="row">
                    <div className="col s12">
                        <div className="card-panel">
                            <div className="row">
                                <div className="col s12 m6">
                                    <div className="row">
                                        <div className="col s12">
                                            <h3>{title}</h3>
                                        </div>
                                        <div className="col s6 m12 l6">
                                            <p><i className="material-icons left">timer</i> Prep Time: {formatTime(prepTime.hours)}:{formatTime(prepTime.minutes)}</p>
                                        </div>
                                        <div className="col s6 m12 l6">
                                            <p><i className="material-icons left">timer</i> Cook Time:  {formatTime(cookTime.hours)}:{formatTime(cookTime.minutes)}</p>
                                        </div>
                                        <div className="col s12">
                                            <p className="flow-text">{description}</p>
                                        </div>
                                    </div>
                                </div>
                                <div className="col s12 m6 recipe-image">
                                    <div className="row">
                                        <div className="col s12">
                                            <img alt="" src={`/api/v1/uploads/image/${photo.filename}`} />
                                        </div>
                                    </div>
                                    <div className="row">
                                        <div className="col s12 recipe-actions">
                                            <HeartAction
                                                hearts={hearts}
                                                isAuthenticated={isAuthenticated}
                                                recipeId={recipeId}
                                                totalHearts={totalHearts}
                                                updateRecipe={updateRecipe}
                                                userId={userId}
                                            />
                                            <VoteAction
                                                downVotes={downVotes}
                                                isAuthenticated={isAuthenticated}
                                                recipeId={recipeId}
                                                netVotes={netVotes}
                                                updateRecipe={updateRecipe}
                                                upVotes={upVotes}
                                                userId={userId}
                                            />
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
                            <div className="row">
                                <div className="col s12">
                                    {tagList && tagList.map((tag, i) => <div className="chip orange lighten-2" key={i}>{tag.toUpperCase()}</div>)}
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
    auth: PropTypes.object.isRequired,
    errors: PropTypes.object.isRequired,
    getRecipe: PropTypes.func.isRequired,
    recipes: PropTypes.object.isRequired,
    updateRecipe: PropTypes.func.isRequired,
    utilities: PropTypes.object.isRequired
}

const mapStateToProps = state => ({
    auth: state.auth,
    errors: state.errors,
    recipes: state.recipes,
    utilities: state.utilities
})

export default connect(
    mapStateToProps,
    { getRecipe, updateRecipe }
)(GetRecipe)

// import dependencies
import React, { useEffect } from 'react'
import { connect } from 'react-redux'
import PropTypes from 'prop-types'
import { isEmpty } from 'lodash'

// import actions
import {
    getRecipe,
    updateRecipe
} from '../actions/recipeActions'

// import components
import Breadcrumb from '../components/layout/Breadcrumb'
import Preloader from '../components/utility/Preloader'

const GetRecipe = props => {
    // destructure props
    const {
        errors,
        getRecipe,
        location,
        match,
        recipes,
        updateRecipe,
        utilities
    } = props

    // destructure recipes
    const { recipe } = recipes
    console.log(recipe)

    // destructure utilities
    const { routerHeight } = utilities

    // get recipe after component mount
    useEffect(() => {
        // destructure props
        const { params } = match

        // destructure params
        const { recipeId } = params

        // dispatch getRecipe action
        getRecipe(recipeId)

        // clean up after this effect
        const cleanup = () => {
            getRecipe('')
        }
        return cleanup
    }, [])

    if (!isEmpty(errors)) {
        return (
            <div className="container">
                <div className="row mt-5">
                    <div className="center-align col s12">
                        {errors.recipe}
                    </div>
                </div>
            </div>
        )
    }

    if (!isEmpty(recipe)) {
        // destructure recipe
        const {
            createdAt,
            updatedAt,
            user,
            title,
            description,
            photo,
            ingredients,
            preparation,
            instructions,
            prepTime,
            cookTime,
            shared,
            upVotes,
            downVotes,
            netVotes,
            percentDownVotes,
            percentUpVotes,
            hearts,
            totalHearts,
            tags
        } = recipe

        return (
            <div className="container router" style={{ height: routerHeight }}>
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
                                            <p><i className="material-icons left">timer</i> Prep Time: {prepTime}</p>
                                        </div>
                                        <div className="col s6 m12 l6">
                                            <p><i className="material-icons left">timer</i> Cook Time: {cookTime}</p>
                                        </div>
                                        <div className="col s12">
                                            <p className="flow-text">{description}</p>
                                        </div>
                                    </div>
                                </div>
                                <div className="col s12 m6 recipe-image">
                                    <div className="row">
                                        <div className="col s12">
                                            <img alt="" src="https://via.placeholder.com/4000x3000" />
                                        </div>
                                    </div>
                                    <div className="row">
                                        <div className="col s5 center-align">
                                            <button className="btn-flat"><i className="material-icons">favorite_border</i></button>
                                            {/* <button className="btn-flat"><i className="material-icons">favorite</i></button> */}
                                            <span className="heart-count">{totalHearts}</span>
                                        </div>
                                        <div className="col s7 center-align">
                                            <button className="btn-flat" disabled>
                                                <i className="material-icons">thumb_up</i>
                                            </button>
                                            <span className="vote-count">{netVotes}</span>
                                            <button className="btn-flat" disabled>
                                                <i className="material-icons">thumb_down</i>
                                            </button>
                                        </div>
                                    </div>
                                </div>
                            </div>
                            <div className="row">
                                <div className="col s12 m6">
                                    <h5>Ingredients</h5>
                                    <ul>
                                        {ingredients && ingredients.map(ingredient => <li className="ingredient" key={ingredient.sequence}>{ingredient.quantity} {ingredient.unit} {ingredient.name}</li>)}
                                    </ul>
                                </div>
                                <div className="col s12 m6">
                                    <h5>Preparation</h5>
                                    <ul>
                                        {preparation && preparation.map(action => <li className="action" key={action.sequence}>{action.action}</li>)}
                                    </ul>
                                </div>
                                <div className="col s12 m12">
                                    <h5>Instructions</h5>
                                    <ol>
                                        {instructions && instructions.map(instruction => <li className="instruction" key={instruction.sequence}>{instruction.instruction}</li>)}
                                    </ol>
                                </div>
                            </div>
                            <div className="row">
                                <div className="col s12">
                                    {tags && tags.map((tag, i) => <div className="chip orange lighten-2" key={i}>{tag.toUpperCase()}</div>)}
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
    errors: PropTypes.object.isRequired,
    getRecipe: PropTypes.func.isRequired,
    recipes: PropTypes.object.isRequired,
    updateRecipe: PropTypes.func.isRequired,
    utilities: PropTypes.object.isRequired
}

const mapStateToProps = state => ({
    errors: state.errors,
    recipes: state.recipes,
    utilities: state.utilities
})

export default connect(
    mapStateToProps,
    { getRecipe, updateRecipe }
)(GetRecipe)

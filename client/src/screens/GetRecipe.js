// import dependencies
import React, { useEffect } from 'react'
import { connect } from 'react-redux'
import PropTypes from 'prop-types'
import { isEmpty } from 'lodash.isempty'

// import actions
import {
    getRecipe,
    updateRecipe
} from '../actions/recipeActions'

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
    console.log(recipe)

    // destructure recipe object
    const {
        createdAt,
        updatedAt,
        // user,
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
    const recipeId = recipe._id

    // destructure utilities object
    const { routerHeight } = utilities

    // get recipe after component mount
    useEffect(() => {
        // destructure props
        const { params } = match

        // destructure params
        const { recipeId } = params

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

    // if (recipeId) {
    //     return (
    //         <div className="container get-recipe router" style={{ height: routerHeight }}>
    //             <Breadcrumb location={location} />
    //             <div className="row">
    //                 <div className="col s12">
    //                     <div className="card-panel">
    //                         <div className="row">
    //                             <div className="col s12 m6">
    //                                 <div className="row">
    //                                     <div className="col s12">
    //                                         <h3>{title}</h3>
    //                                     </div>
    //                                     <div className="col s6 m12 l6">
    //                                         <p><i className="material-icons left">timer</i> Prep Time: {prepTime}</p>
    //                                     </div>
    //                                     <div className="col s6 m12 l6">
    //                                         <p><i className="material-icons left">timer</i> Cook Time: {cookTime}</p>
    //                                     </div>
    //                                     <div className="col s12">
    //                                         <p className="flow-text">{description}</p>
    //                                     </div>
    //                                 </div>
    //                             </div>
    //                             <div className="col s12 m6 recipe-image">
    //                                 <div className="row">
    //                                     <div className="col s12">
    //                                         <img alt="" src="https://via.placeholder.com/4000x3000" />
    //                                     </div>
    //                                 </div>
    //                                 <div className="row">
    //                                     <div className="col s12 recipe-actions">
    //                                         <HeartAction
    //                                             hearts={hearts}
    //                                             isAuthenticated={isAuthenticated}
    //                                             recipeId={recipeId}
    //                                             totalHearts={totalHearts}
    //                                             updateRecipe={updateRecipe}
    //                                             userId={userId}
    //                                         />
    //                                         <VoteAction
    //                                             downVotes={downVotes}
    //                                             isAuthenticated={isAuthenticated}
    //                                             recipeId={recipeId}
    //                                             netVotes={netVotes}
    //                                             updateRecipe={updateRecipe}
    //                                             upVotes={upVotes}
    //                                             userId={userId}
    //                                         />
    //                                     </div>
    //                                 </div>
    //                             </div>
    //                         </div>
    //                         <div className="row">
    //                             <div className="col s12 m6">
    //                                 <h5>Ingredients</h5>
    //                                 <ul>
    //                                     {ingredients && ingredients.map(ingredient => <li className="ingredient" key={ingredient.sequence}>{ingredient.quantity} {ingredient.unit} {ingredient.name}</li>)}
    //                                 </ul>
    //                             </div>
    //                             <div className="col s12 m6">
    //                                 <h5>Preparation</h5>
    //                                 <ul>
    //                                     {preparation && preparation.map(action => <li className="action" key={action.sequence}>{action.action}</li>)}
    //                                 </ul>
    //                             </div>
    //                             <div className="col s12 m12">
    //                                 <h5>Instructions</h5>
    //                                 <ol>
    //                                     {instructions && instructions.map(instruction => <li className="instruction" key={instruction.sequence}>{instruction.instruction}</li>)}
    //                                 </ol>
    //                             </div>
    //                         </div>
    //                         <div className="row">
    //                             <div className="col s12">
    //                                 {tags && tags.map((tag, i) => <div className="chip orange lighten-2" key={i}>{tag.toUpperCase()}</div>)}
    //                             </div>
    //                         </div>
    //                     </div>
    //                 </div>
    //             </div>
    //         </div>
    //     )
    // }

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

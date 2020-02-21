import React from 'react'

import CreateRecipe from '../components/recipe/CreateRecipe'

function NewRecipe(props) {
    const {
        addRecipe,
        history
    } = props

    return (
        <div className="container" id="create-recipe">
            <div className="row">
                <div className="center-align col s12">
                    <h3>Create New Recipe</h3>
                </div>
            </div>
            <div className="row">
                <div className="col s12">
                    <CreateRecipe
                        addRecipe={addRecipe}
                        history={history}
                    />
                </div>
            </div>
        </div>
    )
}

export default NewRecipe

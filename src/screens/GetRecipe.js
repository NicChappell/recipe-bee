import React from 'react'
import { Redirect } from 'react-router-dom'

function GetRecipe(props) {
    // destructure props
    const {
        match,
        recipes
    } = props

    // get recipe id from url parameter
    const { id } = match.params

    // find matching recipe id in recipes array
    const recipe = recipes.find(recipe => recipe.id === id)
    console.log(recipe)

    const Image = (props) => {
        const {
            description,
            image
        } = props

        return (
            <div className="row">
                <div className="col s12 m8">
                    <p className="flow-text">{description}</p>
                </div>
                <div className="col s12 m4 recipe-image">
                    <img alt="" src={image} />
                </div>
            </div>
        )
    }

    const NoImage = ({ description }) => {
        return (
            <div className="row">
                <div className="col s12">
                    <p className="flow-text">{description}</p>
                </div>
            </div>
        )
    }

    if (recipe) {
        const {
            description,
            image,
            ingredients,
            instructions,
            title
        } = recipe

        return (
            <div className="container">
                <div className="row">
                    <div className="col s12 m8 offset-m2">
                        <div className="card-panel">
                            <div className="row">
                                <div className="col s12">
                                    <h3>{title}</h3>
                                </div>
                            </div>
                            {image ? <Image description={description} image={image} /> : <NoImage description={description} />}
                            <div className="row">
                                <div className="col s12 m6">
                                    <h5>Ingredients</h5>
                                    <ul>
                                        {ingredients && ingredients.map(ingredient => <li key={ingredient.id}>{ingredient.quantity} {ingredient.unit} {ingredient.name}</li>)}
                                    </ul>
                                </div>
                                <div className="col s12 m6">
                                    <h5>Instructions</h5>
                                    <ul>
                                        {instructions && instructions.map(instruction => <li key={instruction.id}>{instruction.value}</li>)}
                                    </ul>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        )
    }
    return <Redirect to="/recipes" />
}

export default GetRecipe

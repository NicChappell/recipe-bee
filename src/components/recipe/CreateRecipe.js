import React, { useState } from 'react'
import { v4 as uuid } from 'uuid'

import CreateDirection from './CreateDirection'
import CreateIngredient from './CreateIngredient'
import Direction from './Direction'
import Ingredient from './Ingredient'

import {
    useInputValue,
    useTextAreaValue,
} from '../../helpers/customHooks'

const CreateRecipe = (props) => {
    // state variables
    const description = useTextAreaValue()
    const [directions, setDirections] = useState([])
    const [ingredients, setIngredients] = useState([])
    const title = useInputValue()

    // props variables
    const { addRecipe } = props

    // add new instruction to directions array
    const addDirection = direction => {
        setDirections([...directions, direction])
    }
    // add new ingredient to ingredients array
    const addIngredient = ingredient => {
        setIngredients([...ingredients, ingredient])
    }
    // delete instruction from directions array
    const deleteDirection = direction => {
        const updatedDirections = directions.filter(obj => obj.id !== direction.id)
        setDirections(updatedDirections)
    }
    // delete ingredient from ingredients array
    const deleteIngredient = ingredient => {
        const updatedIngredients = ingredients.filter(obj => obj.id !== ingredient.id)
        setIngredients(updatedIngredients)
    }
    // update instruction in directions array
    const updateDirection = direction => {
        const index = directions.findIndex(obj => obj.id === direction.id)
        const updatedDirections = directions
        updatedDirections[index] = direction
        setDirections(updatedDirections)
    }
    // update ingredient in ingredients array
    const updateIngredient = ingredient => {
        const index = ingredients.findIndex(obj => obj.id === ingredient.id)
        const updatedIngredients = ingredients
        updatedIngredients[index] = ingredient
        setIngredients(updatedIngredients)
    }

    // submit recipe
    const submitRecipe = () => {
        const id = uuid()

        const recipe = {
            id,
            description: description.value,
            directions,
            ingredients,
            title: title.value
        }

        addRecipe(recipe)
    }

    // options for quantity select list
    const quantities = ['', '¼', '⅓', '½', '⅔', '¾']
    for (let i = 1; i <= 16; i++) { quantities.push(i) }
    // options for unit select list
    const units = ['', 'Milliliter', 'Teaspoon', 'Tablespoon', 'Ounce', 'Cup', 'Pint', 'Liter', 'Quart', 'Gallon']

    return (
        <div className="container" id="create-recipe">
            <div className="row">
                <div className="col s12">
                    <div className="card-panel white">
                        <div className="row">
                            <div className="col s12 center-align">
                                <h3>Create New Recipe</h3>
                            </div>
                        </div>
                        <div className="row">
                            <div className="col s12 l9">
                                <div className="row">
                                    <div className="input-field col s12">
                                        <input id="title" placeholder="Recipe Title" {...title} />
                                    </div>
                                    <div className="input-field col s12">
                                        <textarea id="description" placeholder="Recipe Description" {...description}></textarea>
                                    </div>
                                </div>
                            </div>
                            <div className="col s12 l3 image-upload">
                                <img src="https://via.placeholder.com/600/92c952" alt="" />
                            </div>
                        </div>
                        <div className="row">
                            <div className="col s12">
                                <h5>Ingredients</h5>
                            </div>
                        </div>
                        {ingredients.map((ingredient, index) => {
                            return (
                                <Ingredient
                                    deleteIngredient={deleteIngredient}
                                    index={index}
                                    ingredient={ingredient}
                                    key={ingredient.id}
                                    quantities={quantities}
                                    units={units}
                                    updateIngredient={updateIngredient}
                                />
                            )
                        })}
                        <CreateIngredient
                            addIngredient={addIngredient}
                            index={ingredients.length + 1}
                            quantities={quantities}
                            units={units}
                        />
                        <div className="row">
                            <div className="col s12">
                                <h5>Directions</h5>
                            </div>
                        </div>
                        {directions.map((direction, index) => {
                            return (
                                <Direction
                                    deleteDirection={deleteDirection}
                                    index={index}
                                    direction={direction}
                                    key={direction.id}
                                    updateDirection={updateDirection}
                                />
                            )
                        })}
                        <CreateDirection
                            addDirection={addDirection}
                            index={directions.length + 1}
                        />
                        <div className="row">
                            <div className="col s12 center-align">
                                <button className="black-text btn-large orange lighten-2" onClick={submitRecipe}>
                                    Save Recipe
                                </button>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    )
}

export default CreateRecipe

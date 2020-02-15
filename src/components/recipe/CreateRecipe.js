import React, { useState } from 'react'

// import CreateDirection from './CreateDirection'
import CreateIngredient from './CreateIngredient'
// import Direction from './Direction'
import Ingredient from './Ingredient'

import {
    useInputValue,
    useTextAreaValue,
} from '../../helpers/customHooks'

const CreateRecipe = () => {
    // const [directions, setDirections] = useState([])
    const [ingredients, setIngredients] = useState([])

    const title = useInputValue()
    const description = useTextAreaValue()

    const addIngredient = ingredient => {
        setIngredients([...ingredients, ingredient])
    }

    const updateIngredient = ingredient => {
        const index = ingredients.findIndex(obj => obj.id === ingredient.id)
        const updatedIngredients = ingredients
        updatedIngredients[index] = ingredient
        setIngredients(updatedIngredients)
    }

    const deleteIngredient = ingredient => {
        const updatedIngredients = ingredients.filter(obj => obj.id !== ingredient.id)
        setIngredients(updatedIngredients)
    }

    // options for quantity select list
    const quantities = ['', '¼', '⅓', '½', '⅔', '¾']
    for (let i = 1; i <= 16; i++) {
        quantities.push(i)
    }
    // options for unit select list
    const units = ['', 'Milliliter', 'Teaspoon', 'Tablespoon', 'Ounce', 'Cup', 'Pint', 'Liter', 'Quart', 'Gallon']
    // index position of next ingredient
    const createIngredientIndex = ingredients.length + 1

    return (
        <div className="container" id="create-recipe">
            <div className="row">
                <div className="col s12">
                    <div className="card-panel white">
                        <div className="row">
                            <div className="col s12">
                                <h3 className="center-align">Create New Recipe</h3>
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
                            index={createIngredientIndex}
                            quantities={quantities}
                            units={units}
                        />
                        <div className="row">
                            <div className="col s12">
                                <h5>Directions</h5>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    )
}

export default CreateRecipe

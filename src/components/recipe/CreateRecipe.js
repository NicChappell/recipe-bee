import React, { useState } from 'react'

import CreateDirection from './CreateDirection'
import CreateIngredient from './CreateIngredient'
import Direction from './Direction'
import Ingredient from './Ingredient'

import { useInputValue } from '../../helpers/customHooks'

const CreateRecipe = () => {
    const [ingredients, setIngredients] = useState([])
    const [description, setDescription] = useState('')
    const [directions, setDirections] = useState([])

    const title = useInputValue('Recipe Title', '')

    const handleDescriptionChange = (e) => {
        setDescription(e.target.value)
    }

    const addIngredient = (e, quantity, unit, name) => {
        e.preventDefault()

        const ingredient = { quantity, unit, name }
        setIngredients([...ingredients, ingredient])
    }
    console.log(ingredients)

    const handleDeleteIngredientClick = (e) => {
        e.preventDefault()
        console.log('delete ingredient click')
    }

    const handleSaveIngredientClick = (e) => {
        e.preventDefault()
        console.log('save ingredient click')
    }

    return (
        <div className="container">
            <div className="row">
                <div className="col s12">
                    <div className="card-panel white">
                        <form>
                            <div className="row">
                                <div className="input-field col s12">
                                    <input id="title" {...title} />
                                </div>
                            </div>
                            <div className="row">
                                <div className="input-field col s12">
                                    <textarea
                                        className="materialize-textarea"
                                        id="description"
                                        onChange={handleDescriptionChange}
                                        placeholder="Recipe Description"
                                        value={description}
                                    >
                                    </textarea>
                                </div>
                            </div>
                        </form>
                        {ingredients.map((ingredient, index) => {
                            return (
                                <Ingredient
                                    handleDeleteIngredientClick={handleDeleteIngredientClick}
                                    handleSaveIngredientClick={handleSaveIngredientClick}
                                    ingredient={ingredient}
                                    key={index}
                                />
                            )
                        })}
                        <CreateIngredient addIngredient={addIngredient} />
                    </div>
                </div>
            </div>
        </div>
    )
}

export default CreateRecipe

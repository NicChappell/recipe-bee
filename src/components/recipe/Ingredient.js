import React, { useState } from 'react'

import {
    useInputValue,
    useSelectValue
} from '../../helpers/customHooks'

const Ingredient = (props) => {
    const [disabled, setDisabled] = useState(true)

    const {
        deleteIngredient,
        index,
        ingredient,
        quantities,
        units,
        updateIngredient
    } = props

    const quantity = useSelectValue(ingredient.quantity)
    const unit = useSelectValue(ingredient.unit)
    const name = useInputValue(ingredient.name)

    const handleDeleteIngredientClick = e => {
        e.preventDefault()

        deleteIngredient(ingredient)
    }

    const handleEditIngredientClick = e => {
        e.preventDefault()

        setDisabled(!disabled)
    }

    const handleUpdateIngredientClick = e => {
        e.preventDefault()

        setDisabled(!disabled)

        const updatedIngredient = {
            ...ingredient,
            name: name.value,
            quantity: quantity.value,
            unit: unit.value
        }
        updateIngredient(updatedIngredient)
    }

    const Buttons = ({ disabled }) => {
        if (disabled) {
            return (
                <div className="col s2 ingredient-button">
                    <button className="btn-small btn-flat white" onClick={handleEditIngredientClick}>
                        <i className="black-text material-icons">edit</i>
                    </button>
                    <button className="btn-small btn-flat white" onClick={handleDeleteIngredientClick}>
                        <i className="black-text material-icons">delete</i>
                    </button>
                </div>
            )
        }
        return (
            <div className="col s2 ingredient-button">
                <button className="btn-small green lighten-2" onClick={handleUpdateIngredientClick}>
                    <i className="black-text material-icons">check</i>
                </button>
            </div>
        )
    }

    return (
        <div className="row ingredient-form">
            <div className="col s10">
                <div className="row">
                    <div className="input-field col s1 l1">
                        <p className="center-align">
                            <b>{`${index + 1})`}</b>
                        </p>
                    </div>
                    <div className="input-field col s3 l2">
                        <select disabled={disabled} id="quantity" {...quantity}>
                            {quantities.map(quantity => <option key={quantity} value={quantity}>{quantity}</option>)}
                        </select>
                    </div>
                    <div className="input-field col s8 l3">
                        <select disabled={disabled} id="unit" {...unit}>
                            {units.map(unit => <option key={unit} value={unit}>{unit}</option>)}
                        </select>
                    </div>
                    <div className="input-field col s12 l6">
                        <input disabled={disabled} id="ingredient-name" placeholder="Ingredient Name" {...name} />
                    </div>
                </div>
            </div>
            <Buttons disabled={disabled} />
        </div>
    )
}

export default Ingredient



// import React, { useState } from 'react'

// const Form = ({ addTodo }) => {
//     // const [inputValue, setValue] = useState('')
//     // console.log(inputValue)

//     const todo = useInputValue('')
//     console.log(`Todo: ${todo.value}`)
//     const name = useInputValue('')
//     console.log(`Name: ${name.value}`)

//     const onSubmit = (e) => {
//         e.preventDefault()

//         addTodo({
//             todo: todo.value,
//             name: name.value
//         })
//     }

//     return (
//         <form onSubmit={onSubmit}>
//             <label>Name</label>
//             <input {...name} />
//             <label>Todo</label>
//             <input {...todo} />
//             <button type='submit'>Add Todo</button>
//         </form>
//     )
// }

// export default Form

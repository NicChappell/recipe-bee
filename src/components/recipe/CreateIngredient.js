import React, { useState } from 'react'

import { useInputValue } from '../../helpers/customHooks'

const Ingredient = ({ addIngredient }) => {
    const [ingredient, setIngredient] = useState({})
    const [quantity, setQuantity] = useState('')
    const [unit, setUnit] = useState('')

    const handleQuantityChange = (e) => {
        setQuantity(e.target.value)
    }
    console.log(`Quantity: ${quantity}`)

    const handleUnitChange = (e) => {
        setUnit(e.target.value)
    }
    console.log(`Unit: ${unit}`)

    const name = useInputValue('Ingredient Name', '')
    console.log(`Name: ${name.value}`)

    const sixteen = []
    for (let i = 1; i <= 16; i++) {
        sixteen.push(i)
    }

    const units = ['', 'Milliliter', 'Teaspoon', 'Tablespoon', 'Ounce', 'Cup', 'Pint', 'Liter', 'Quart', 'Gallon']

    return (
        <div className="row">
            <form className="col s12" onSubmit={(event) => addIngredient(event, quantity, unit, name)}>
                <div className="row">
                    <div className="col s1 ingredient-item-number">
                        <span>
                            {/* item number goes here */}
                        </span>
                    </div>
                    <div className="input-field col s1">
                        <select className="browser-default" id="quantity" onChange={handleQuantityChange}>
                            <option value=""></option>
                            <option value="one-quarter">¼</option>
                            <option value="one-third">⅓</option>
                            <option value="one-half">½</option>
                            <option value="two-thirds">⅔</option>
                            <option value="three-quarters">¾</option>
                            {sixteen.map(n => <option key={n} value={n}>{n}</option>)}
                        </select>
                    </div>
                    <div className="input-field col s2">
                        <select className="browser-default" id="unit" onChange={handleUnitChange}>
                            {units.map(unit => <option key={unit} value={unit}>{unit}</option>)}
                        </select>
                    </div>
                    <div className="input-field col s6">
                        <input {...name} id="ingredient-name" />
                    </div>
                    <div className="col s2 ingredient-button">
                        <button className="btn-small orange lighten-2" type="submit">
                            <i className="black-text material-icons">add</i>
                        </button>
                    </div>
                </div>
            </form>
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

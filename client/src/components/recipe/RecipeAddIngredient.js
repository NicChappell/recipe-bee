// import dependencies
import React, { useReducer } from 'react'
import PropTypes from 'prop-types'
import { v4 as uuid } from 'uuid'

// import data
import {
    quantities,
    units,
} from '../../data/recipe'

const initialState = {
    nameActive: false,
    nameValid: false,
    nameValue: '',
    quantityActive: false,
    quantityValid: false,
    quantityValue: '',
    unitActive: false,
    // unitValid: false,
    unitValue: ''
}

const reducer = (state, action) => {
    switch (action.type) {
        case 'changeName':
            return {
                ...state,
                nameActive: true,
                nameValid: action.value ? true : false,
                nameValue: action.value
            }
        case 'changeQuantity':
            return {
                ...state,
                quantityActive: true,
                quantityValid: action.value ? true : false,
                quantityValue: action.value
            }
        case 'changeUnit':
            return {
                ...state,
                unitActive: true,
                // unitValid: action.value ? true : false,
                unitValue: action.value
            }
        case 'deactivate':
            return {
                ...state,
                [action.value]: false
            }
        case 'resetState':
            return initialState
        default:
            return state
    }
}

const RecipeAddIngredient = props => {
    // reducer hook variables
    const [state, dispatch] = useReducer(reducer, initialState)

    // destructure state
    const {
        nameActive,
        nameValid,
        nameValue,
        quantityActive,
        quantityValid,
        quantityValue,
        unitActive,
        // unitValid,
        unitValue
    } = state

    // destructure props
    const {
        index,
        liftState,
        ingredients
    } = props

    const handleBlur = e => {
        // destructure event
        const { name } = e.target

        // concatenate value
        const key = `${name}Active`

        // update state
        dispatch({ type: 'deactivate', value: key })
    }

    const handleChange = e => {
        // destructure event
        const {
            name,
            value
        } = e.target

        const nameCapitalized = name.charAt(0).toUpperCase() + name.slice(1)

        // concatenate action type
        const type = `change${nameCapitalized}`

        // update state
        dispatch({ type, value })
    }

    const handleClick = () => {
        // generate unique id
        const id = uuid()

        // create ingredient object
        const newIngredient = {
            id,
            name: nameValue,
            quantity: quantityValue,
            unit: unitValue
        }

        // lift state
        liftState([...ingredients, newIngredient])

        // reset state
        dispatch({ type: 'resetState' })
    }

    return (
        <div className="row ingredient">
            <div className="col s8 m9 l10">
                <div className="row">
                    <div className="col s2 l1 index">
                        <p>{`${index + 1})`}</p>
                    </div>
                    <div className={`input-field col s3 l2 ${quantityValid || !quantityActive ? '' : 'invalid-input'}`}>
                        <select
                            className='browser-default'
                            name="quantity"
                            onBlur={handleBlur}
                            onChange={handleChange}
                            value={quantityValue}
                        >
                            {quantities && quantities.map(quantity => <option key={quantity} value={quantity}>{quantity}</option>)}
                        </select>
                    </div>
                    <div className={'input-field col s7 l3'}>
                        <select
                            className='browser-default'
                            name="unit"
                            onBlur={handleBlur}
                            onChange={handleChange}
                            value={unitValue}
                        >
                            {units && units.map(unit => <option key={unit} value={unit}>{unit}</option>)}
                        </select>
                    </div>
                    <div className={`input-field col s12 l6 ${nameValid || !nameActive ? '' : 'invalid-input'}`}>
                        <input
                            name="name"
                            onBlur={handleBlur}
                            onChange={handleChange}
                            placeholder={nameValid || !nameActive ? 'Ingredient' : 'Ingredient is required'}
                            type='text'
                            value={nameValue}
                        />
                    </div>
                </div>
            </div>
            <div className="col s4 m3 l2 buttons">
                <button className="btn orange lighten-2" disabled={!nameValid || !quantityValid} onClick={handleClick}>
                    <i className="black-text material-icons">add</i>
                </button>
            </div>
        </div>
    )
}

RecipeAddIngredient.propTypes = {
    index: PropTypes.number.isRequired,
    liftState: PropTypes.func.isRequired,
    ingredients: PropTypes.array.isRequired
}

export default RecipeAddIngredient

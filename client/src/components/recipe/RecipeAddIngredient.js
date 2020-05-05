// import dependencies
import React, { useEffect, useReducer } from 'react'
import PropTypes from 'prop-types'
import { v4 as uuid } from 'uuid'
import isEmpty from 'lodash.isempty'

// import data
import {
    quantities,
    units,
} from '../../data/recipe'

const initialState = {
    nameValid: true,
    nameValue: '',
    quantityValid: true,
    quantityValue: '',
    // unitValid: false,
    unitValue: ''
}

const reducer = (state, action) => {
    switch (action.type) {
        case 'changeName':
            return {
                ...state,
                nameValue: action.value
            }
        case 'changeQuantity':
            return {
                ...state,
                quantityValue: action.value
            }
        case 'changeUnit':
            return {
                ...state,
                unitValue: action.value
            }
        case 'validate':
            return {
                ...state,
                nameValid: action.value,
                quantityValid: action.value,
                // unitValid: action.value
            }
        case 'resetState':
            return initialState
        default:
            return state
    }
}

const RecipeAddIngredient = props => {
    // destructure props
    const {
        errors,
        index,
        ingredients,
        liftState,
        resolveErrors
    } = props

    // reducer hook variables
    const [state, dispatch] = useReducer(reducer, initialState)

    // destructure state
    const {
        nameValid,
        nameValue,
        quantityValid,
        quantityValue,
        // unitValid,
        unitValue
    } = state

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

    const handleFocus = () => {
        dispatch({ type: 'validate', value: true })
        resolveErrors('ingredients')
    }

    // update state when errors value changes
    useEffect(() => {
        if (errors.ingredients) {
            dispatch({ type: 'validate', value: false })
        }
    }, [errors.ingredients])

    return (
        <div className="row add-list-item">
            <div className="col s8 m9 l10">
                <div className="row">
                    <div className="col s2 l1 index">
                        <p>{`${index + 1})`}</p>
                    </div>
                    <div className="col s10 l11">
                        <div className="row">
                            <div className={`input-field col s5 l2 ${!quantityValid ? 'invalid-input' : ''}`}>
                                <select
                                    className='browser-default'
                                    name="quantity"
                                    onChange={handleChange}
                                    onFocus={handleFocus}
                                    value={quantityValue}
                                >
                                    <option disabled value=""></option>
                                    {quantities && quantities.map(quantity => <option key={quantity} value={quantity}>{quantity}</option>)}
                                </select>
                                {isEmpty(ingredients) ? <label>Quantity</label> : null}
                            </div>
                            <div className="input-field col s7 l4">
                                <select
                                    className='browser-default'
                                    name="unit"
                                    onChange={handleChange}
                                    onFocus={handleFocus}
                                    value={unitValue}
                                >
                                    <option value=""></option>
                                    {units && units.map(unit => {
                                        if (unit === 'Volume' || unit === 'Mass' || unit === 'Portion') {
                                            return <option disabled key={unit} value={unit}>{unit}</option>
                                        }
                                        return <option key={unit} value={unit}>{unit}</option>
                                    })}
                                </select>
                                {isEmpty(ingredients) ? <label>Unit</label> : null}
                            </div>
                            <div className={`input-field col s12 l6 ${!nameValid ? 'invalid-input' : ''}`}>
                                <input
                                    name="name"
                                    onChange={handleChange}
                                    onFocus={handleFocus}
                                    placeholder="Name"
                                    type='text'
                                    value={nameValue}
                                />
                            </div>
                        </div>
                        {!nameValid || !quantityValid ? <span className="error-message">{errors.ingredients}</span> : null}
                    </div>
                </div>
            </div>
            <div className="col s4 m3 l2 buttons">
                <button className="btn orange lighten-2" disabled={!nameValue || !quantityValue} onClick={handleClick}>
                    <i className="black-text material-icons">add</i>
                </button>
            </div>
        </div>
    )
}

RecipeAddIngredient.propTypes = {
    errors: PropTypes.object,
    index: PropTypes.number,
    ingredients: PropTypes.array,
    liftState: PropTypes.func,
    resolveErrorse: PropTypes.func
}

export default RecipeAddIngredient

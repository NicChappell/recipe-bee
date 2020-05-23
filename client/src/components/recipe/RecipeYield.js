// import dependencies
import React, { useEffect, useReducer } from 'react'
import PropTypes from 'prop-types'
import { v4 as uuid } from 'uuid'

// import data
import {
    quantities,
    units,
} from '../../data/recipe'

// import utility functions
import { capitalize } from '../../helpers/utilities'

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
        case 'validateAll':
            return {
                ...state,
                nameValid: action.value,
                quantityValid: action.value,
                // unitValid: action.value
            }
        case 'validateName':
            return {
                ...state,
                nameValid: action.value,
            }
        case 'validateQuantity':
            return {
                ...state,
                quantityValid: action.value,
            }
        // case 'validateUnit':
        //     return {
        //         ...state,
        //         unitValid: action.value
        //     }
        default:
            return state
    }
}

const RecipeYield = props => {
    // destructure props
    const {
        errors,
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

    const handleBlur = e => {
        // destructure event
        const {
            name,
            value
        } = e.target

        // capitalize name
        const nameCapitalized = capitalize(name)

        // concatenate action type
        const validateType = `validate${nameCapitalized}`

        // update state
        value
            ? dispatch({ type: validateType, value: true })
            : dispatch({ type: validateType, value: false })
    }

    const handleChange = e => {
        // destructure event
        const {
            name,
            value
        } = e.target

        // capitalize name
        const nameCapitalized = capitalize(name)

        // concatenate action type
        const changeType = `change${nameCapitalized}`
        const validateType = `validate${nameCapitalized}`

        // update state
        dispatch({ type: changeType, value })
        if (name !== 'unit' && value) {
            dispatch({ type: validateType, value: true })
        } else {
            dispatch({ type: validateType, value: false })
        }
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
        liftState([newIngredient])
    }

    const handleFocus = e => {
        // destructure event
        const { name } = e.target

        // capitalize name
        const nameCapitalized = capitalize(name)

        // concatenate action type
        const validateType = `validate${nameCapitalized}`

        // update state
        dispatch({ type: validateType, value: true })
    }

    // update state when errors value changes
    useEffect(() => {
        if (errors.production) {
            nameValue
                ? dispatch({ type: 'validateName', value: true })
                : dispatch({ type: 'validateName', value: false })
            quantityValue
                ? dispatch({ type: 'validateQuantity', value: true })
                : dispatch({ type: 'validateQuantity', value: false })
        }
    }, [errors.production])

    // lift state and resolve errors when state changes
    useEffect(() => {
        // create yield object
        const production = {
            name: nameValue,
            quantity: quantityValue,
            unit: unitValue
        }

        // lift state
        liftState(production)

        // resolve errors
        if (nameValue && quantityValue) {
            resolveErrors('production')
        }
    }, [state])

    return (
        <div className="row yield">
            <div className="col s12">
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
                        <label>Quantity</label>
                    </div>
                    <div className="input-field col s7 l4">
                        <select
                            className='browser-default'
                            name="unit"
                            onChange={handleChange}
                            // onFocus={handleFocus}
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
                        <label>Unit</label>
                    </div>
                    <div className={`input-field col s12 l6 ${!nameValid ? 'invalid-input' : ''}`}>
                        <input
                            autoComplete="off"
                            name="name"
                            onBlur={handleBlur}
                            onChange={handleChange}
                            onFocus={handleFocus}
                            placeholder="Name"
                            type='text'
                            value={nameValue}
                        />
                    </div>
                </div>
                {!nameValid || !quantityValid ? <span className="error-message">{errors.production}</span> : null}
            </div>
        </div>
    )
}

RecipeYield.propTypes = {
    errors: PropTypes.object,
    liftState: PropTypes.func,
    resolveErrorse: PropTypes.func
}

export default RecipeYield

// import dependencies
import React, { useEffect, useReducer } from 'react'
import PropTypes from 'prop-types'

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
        case 'setName':
            return {
                ...state,
                nameValue: action.value
            }
        case 'setQuantity':
            return {
                ...state,
                quantityValue: action.value
            }
        case 'setUnit':
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
        initValue: initProduction,
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
        const setType = `set${nameCapitalized}`
        const validateType = `validate${nameCapitalized}`

        // update state
        dispatch({ type: setType, value })
        if (name !== 'unit' && value) {
            dispatch({ type: validateType, value: true })
        } else {
            dispatch({ type: validateType, value: false })
        }
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

    // update state when initial value changes
    useEffect(() => {
        if (initProduction) {
            for (const property in initProduction) {
                // capitalize property
                const propertyCapitalized = capitalize(property)

                // concatenate action type
                const setType = `set${propertyCapitalized}`

                // update state
                dispatch({ type: setType, value: initProduction[property] })
            }
        }
    }, [initProduction])

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
		// eslint-disable-next-line react-hooks/exhaustive-deps
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

		// eslint-disable-next-line react-hooks/exhaustive-deps
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
    initValue: PropTypes.object,
    liftState: PropTypes.func,
    resolveErrorse: PropTypes.func
}

export default RecipeYield

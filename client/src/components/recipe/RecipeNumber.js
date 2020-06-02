// import dependencies
import React, { useEffect, useState } from 'react'
import PropTypes from 'prop-types'

const RecipeNumber = props => {
    // destructure props
    const {
        errors,
        initValue: initNumber,
        liftState,
        name,
        resolveErrors
    } = props

    // state hook variables
    const [number, setNumber] = useState(0)
    const [valid, setValid] = useState(true)

    const handleAddClick = () => {
        // update state
        if (number >= 0) {
            setNumber(number => number + 1)
            setValid(true)
        } else {
            setNumber(1)
            setValid(false)
        }
    }

    const handleBlur = () => {
        // update state
        if (number >= 1) {
            setValid(true)
        } else {
            setNumber(0)
            setValid(false)
        }
    }

    const handleChange = e => {
        // destructure event
        const { value } = e.target

        // update state
        if (number >= 1) {
            setNumber(value)
            setValid(true)
        } else {
            setNumber(0)
            setValid(false)
        }
    }

    const handleFocus = e => {
        // destructure event
        const { value } = e.target

        // update state
        setValid(true)
        if (number >= 1) {
            setNumber(value)
        } else {
            setNumber('')
        }
    }

    const handleSubtractClick = () => {
        // update state
        if (number >= 2) {
            setNumber(number => number - 1)
            setValid(true)
        } else {
            setNumber(0)
            setValid(false)
        }
    }

    // update state when initial value changes
    useEffect(() => initNumber && setNumber(initNumber), [initNumber])

    // update state when errors value changes
    useEffect(() => {
        errors[name]
            ? setValid(false)
            : setValid(true)
    }, [errors[name]])

    // lift state and resolve errors when value changes
    useEffect(() => {
        liftState(number)
        resolveErrors(name)
    }, [number])

    return (
        <div className="row number">
            <div className={`col s12 number-input ${!valid ? 'invalid-input' : null}`}>
                <div className="button-controls">
                    <button
                        className="btn btn-flat"
                        onClick={handleAddClick}
                    >
                        <i className="material-icons">keyboard_arrow_up</i>
                    </button>
                    <button
                        className="btn btn-flat"
                        onClick={handleSubtractClick}
                    >
                        <i className="material-icons">keyboard_arrow_down</i>
                    </button>
                </div>
                <input
                    onBlur={handleBlur}
                    onChange={handleChange}
                    onFocus={handleFocus}
                    min={0}
                    name={name}
                    type="number"
                    value={number}
                />
            </div>
            {!valid && errors[name] ? <span className="error-message">{errors[name]}</span> : null}
        </div>
    )
}

RecipeNumber.propTypes = {
    errors: PropTypes.object,
    initValue: PropTypes.string,
    liftState: PropTypes.func,
    name: PropTypes.string,
    resolveErrors: PropTypes.func
}

export default RecipeNumber

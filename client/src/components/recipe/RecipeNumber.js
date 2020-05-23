// import dependencies
import React, { useEffect, useState } from 'react'
import PropTypes from 'prop-types'

const RecipeNumber = props => {
    // destructure props
    const {
        errors,
        liftState,
        name,
        resolveErrors
    } = props

    // state hook variables
    const [value, setValue] = useState(0)
    const [valid, setValid] = useState(true)

    const handleAddClick = () => {
        // update state
        if (value >= 0) {
            setValid(true)
            setValue(value => value + 1)
        } else {
            setValid(false)
            setValue(1)
        }
    }

    const handleBlur = () => {
        // update state
        if (value >= 1) {
            setValid(true)
        } else {
            setValid(false)
            setValue(0)
        }
    }

    const handleChange = e => {
        // destructure event
        const { value } = e.target

        // update state
        if (value >= 1) {
            setValid(true)
            setValue(value)
        } else {
            setValid(false)
            setValue(0)
        }
    }

    const handleFocus = e => {
        // destructure event
        const { value } = e.target

        // update state
        setValid(true)
        if (value >= 1) {
            setValue(value)
        } else {
            setValue('')
        }
    }

    const handleSubtractClick = () => {
        // update state
        if (value >= 2) {
            setValid(true)
            setValue(value => value - 1)
        } else {
            setValid(false)
            setValue(0)
        }
    }

    // update state when errors value changes
    useEffect(() => {
        errors[name]
            ? setValid(false)
            : setValid(true)
    }, [errors[name]])

    // lift state and resolve errors when value changes
    useEffect(() => {
        liftState(value)
        resolveErrors(name)
    }, [value])

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
                    value={value}
                />
            </div>
            {!valid && errors[name] ? <span className="error-message">{errors[name]}</span> : null}
        </div>
    )
}

RecipeNumber.propTypes = {
    errors: PropTypes.object,
    liftState: PropTypes.func,
    name: PropTypes.string,
    resolveErrors: PropTypes.func
}

export default RecipeNumber

// import dependencies
import React, { useEffect, useState } from 'react'
import PropTypes from 'prop-types'

const RecipeDescription = props => {
    // destructure props
    const {
        errors,
        initValue: initDescription,
        liftState,
        resolveErrors
    } = props

    // custom hook variables
    const [description, setDescription] = useState('')
    const [valid, setValid] = useState(true)

    const handleBlur = e => e.target.value ? setValid(true) : setValid(false)

    const handleChange = e => {
        // destructure event
        const { value } = e.target

        // update state
        setDescription(value)
        value
            ? setValid(true)
            : setValid(false)
    }

    const handleFocus = () => setValid(true)

    // update state when initial value changes
    useEffect(() => {
        initDescription && setDescription(initDescription)
		// eslint-disable-next-line react-hooks/exhaustive-deps
    }, [initDescription])

    // update state when errors value changes
    useEffect(() => {
        errors.description
            ? setValid(false)
            : setValid(true)
    }, [errors.description])

    // lift state and resolve errors when description changes
    useEffect(() => {
        liftState(description)
        if (errors.description) {
            resolveErrors('description')
        }
		// eslint-disable-next-line react-hooks/exhaustive-deps
    }, [description])

    return (
        <div className="row description">
            <div className={`input-field col s12 ${!valid ? 'invalid-input' : ''}`}>
                <textarea
                    autoComplete="off"
                    className="materialize-textarea"
                    name="description"
                    onBlur={handleBlur}
                    onChange={handleChange}
                    onFocus={handleFocus}
                    placeholder="Description"
                    value={description}
                >
                </textarea>
                {valid ? null : <span className="error-message">{errors.description}</span>}
            </div>
        </div>
    )
}

RecipeDescription.propTypes = {
    errors: PropTypes.object,
    initValue: PropTypes.string,
    liftState: PropTypes.func,
    resolveErrors: PropTypes.func
}

export default RecipeDescription

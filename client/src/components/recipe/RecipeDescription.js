// import dependencies
import React, { useEffect } from 'react'
import PropTypes from 'prop-types'

// import custom hooks
import { useValidTextAreaValue } from '../../helpers/customHooks'

const RecipeDescription = props => {
    // destructure props
    const {
        errors,
        liftState,
        resolveErrors
    } = props

    // custom hook variables
    const description = useValidTextAreaValue('', errors.description)

    // lift state and resolve errors when description value changes
    useEffect(() => {
        liftState(description.value)
        resolveErrors('description')
    }, [description.value])

    return (
        <div className="row description">
            <div className={`input-field col s12 ${description.valid ? null : 'invalid-input'}`}>
                <textarea
                    className={description.className}
                    name="description"
                    onBlur={description.handleBlur}
                    onChange={description.handleChange}
                    onFocus={description.handleFocus}
                    placeholder="Description"
                    value={description.value}
                >
                </textarea>
                {description.valid ? null : <span className="error-message">{errors.description}</span>}
            </div>
        </div>
    )
}

RecipeDescription.propTypes = {
    errors: PropTypes.object,
    liftState: PropTypes.func,
    resolveErrors: PropTypes.func
}

export default RecipeDescription

// import dependencies
import React, { useEffect } from 'react'
import PropTypes from 'prop-types'

// import custom hooks
import { useValidTextAreaValue } from '../../helpers/customHooks'

const RecipeDescription = props => {
    // custom hook variables
    const description = useValidTextAreaValue('')

    // destructure props
    const {
        liftState,
        valid,
        validate
    } = props

    // update description
    useEffect(() => {
        liftState(description.value)
        validate(description.valid)
    }, [description.valid, description.value])

    return (
        <div className="row description">
            <div className={`input-field col s12 ${valid ? null : 'invalid-input'}`}>
                <textarea
                    className={description.className}
                    name="description"
                    onChange={description.onChange}
                    placeholder={valid ? "Description" : "Description is required"}
                    value={description.value}
                >
                </textarea>
            </div>
        </div>
    )
}

RecipeDescription.propTypes = {
    liftState: PropTypes.func.isRequired,
    valid: PropTypes.bool.isRequired,
    validate: PropTypes.func.isRequired
}

export default RecipeDescription

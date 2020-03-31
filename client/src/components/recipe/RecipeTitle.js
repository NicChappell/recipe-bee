// import dependencies
import React, { useEffect } from 'react'
import PropTypes from 'prop-types'

// import custom hooks
import { useValidTextValue } from '../../helpers/customHooks'

const RecipeTitle = props => {
    // custom hook variables
    const title = useValidTextValue('')

    // destructure props
    const {
        liftState,
        valid,
        validate
    } = props

    // update title
    useEffect(() => {
        liftState(title.value)
        validate(title.valid)
    }, [title.valid, title.value])

    return (
        <div className="row title">
            <div className={`input-field col s12 ${valid ? null : 'invalid-input'}`}>
                <input
                    name="title"
                    onChange={title.onChange}
                    placeholder={valid ? "Title" : "Title is required"}
                    type={title.type}
                    value={title.value}
                />
            </div>
        </div>
    )
}

RecipeTitle.propTypes = {
    liftState: PropTypes.func.isRequired,
    valid: PropTypes.bool.isRequired,
    validate: PropTypes.func.isRequired
}

export default RecipeTitle

// import dependencies
import React, { useEffect } from 'react'
import PropTypes from 'prop-types'

// import custom hooks
import { useValidTextValue } from '../../helpers/customHooks'

// import utility functions
import { hyphenate } from '../../helpers/utilities'

const RecipeTitle = props => {
    // destructure props
    const {
        errors,
        liftSlug,
        liftTitle,
        resolveErrors
    } = props

    // custom hook variables
    const title = useValidTextValue('', errors.title)

    // lift state and resolve errors when title value changes
    useEffect(() => {
        const slug = hyphenate(title.value)

        liftSlug(slug)
        liftTitle(title.value)
        resolveErrors('title')
    }, [title.value])

    return (
        <div className="row title">
            <div className={`input-field col s12 ${title.valid ? '' : 'invalid-input'}`}>
                <input
                    autoComplete={title.autoComplete}
                    name="title"
                    onBlur={title.onBlur}
                    onChange={title.onChange}
                    onFocus={title.onFocus}
                    placeholder="Title"
                    type={title.type}
                    value={title.value}
                />
                {title.valid ? null : <span className="error-message">{errors.title}</span>}
            </div>
        </div>
    )
}

RecipeTitle.propTypes = {
    errors: PropTypes.object,
    liftSlug: PropTypes.func,
    liftTitle: PropTypes.func,
    resolveErrors: PropTypes.func
}

export default RecipeTitle

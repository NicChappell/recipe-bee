// import dependencies
import React, { useEffect, useState } from 'react'
import PropTypes from 'prop-types'

// import utility functions
import { slugify } from '../../helpers/utilities'

const RecipeTitle = props => {
    // destructure props
    const {
        errors,
        initValue: initTitle,
        liftSlug,
        liftState,
        resolveErrors
    } = props

    // state hook variables
    const [title, setTitle] = useState('')
    const [valid, setValid] = useState(true)

    const handleBlur = e => e.target.value ? setValid(true) : setValid(false)

    const handleChange = e => {
        // destructure event
        const { value } = e.target

        // update state
        setTitle(value)
        value
            ? setValid(true)
            : setValid(false)
    }

    const handleFocus = () => setValid(true)

    // update state when initial value changes
    useEffect(() => initTitle && setTitle(initTitle), [initTitle])

    // update state when errors value changes
    useEffect(() => {
        errors.title
            ? setValid(false)
            : setValid(true)
    }, [errors.title])

    // lift state and resolve errors when title changes
    useEffect(() => {
        liftSlug(slugify(title))
        liftState(title)
        if (errors.title) {
            resolveErrors('title')
        }
		// eslint-disable-next-line react-hooks/exhaustive-deps
    }, [title])

    return (
        <div className="row title">
            <div className={`input-field col s12 ${!valid ? 'invalid-input' : ''}`}>
                <input
                    autoComplete="off"
                    name="title"
                    onBlur={handleBlur}
                    onChange={handleChange}
                    onFocus={handleFocus}
                    placeholder="Title"
                    type="text"
                    value={title}
                />
                {valid ? null : <span className="error-message">{errors.title}</span>}
            </div>
        </div>
    )
}

RecipeTitle.propTypes = {
    errors: PropTypes.object,
    initValue: PropTypes.string,
    liftSlug: PropTypes.func,
    liftState: PropTypes.func,
    resolveErrors: PropTypes.func
}

export default RecipeTitle

// import dependencies
import React, { useEffect, useState } from 'react'
import PropTypes from 'prop-types'

const PostalCode = props => {
    // destructure props
    const {
        disabled,
        errors,
        initValue,
        liftState,
        resolveErrors,
        value
    } = props

    // state hook variables
    const [valid, setValid] = useState(true)

    const handleBlur = e => e.target.value ? setValid(true) : setValid(false)

    const handleChange = e => {
        // destructure event
        const { value } = e.target

        // resolve errors
        if (errors.postalCode) {
            resolveErrors('postalCode')
        }

        // lift and update state
        liftState(value.replace(/[^\d+]/, '').slice(0, 5))
        value
            ? setValid(true)
            : setValid(false)
    }

    const handleFocus = () => setValid(true)

    // lift state when initial value changes
    useEffect(() => liftState(initValue), [initValue])

    // update state when errors value changes
    useEffect(() => {
        errors.postalCode
            ? setValid(false)
            : setValid(true)
    }, [errors.postalCode])

    // update state when disabled value changes
    useEffect(() => setValid(true), [disabled])

    return (
        <div className={`input-field col s12 m4 postal-code ${!valid ? 'invalid-input' : ''}`}>
            <span>Postal Code</span>
            <input
                autoComplete="off"
                disabled={disabled}
                name="postalCode"
                onBlur={handleBlur}
                onChange={handleChange}
                onFocus={handleFocus}
                placeholder="Postal Code"
                type="text"
                value={value}
            />
            {valid ? null : <span className="error-message">{errors.postalCode}</span>}
        </div>
    )
}

PostalCode.propTypes = {
    disabled: PropTypes.bool,
    errors: PropTypes.object,
    initValue: PropTypes.string,
    liftState: PropTypes.func,
    resolveErrors: PropTypes.func,
    value: PropTypes.string
}

export default PostalCode

// import dependencies
import React, { useEffect, useState } from 'react'
import PropTypes from 'prop-types'

const CurrentPassword = props => {
    // destructure props
    const {
        disabled,
        errors,
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
        if (errors.currentPassword) {
            resolveErrors('currentPassword')
        }

        // lift and update state
        liftState(value)
        value
            ? setValid(true)
            : setValid(false)
    }

    const handleFocus = () => setValid(true)

    // update state when disabled value changes
    useEffect(() => setValid(true), [disabled])

    // update state when errors value changes
    useEffect(() => {
        errors.currentPassword
            ? setValid(false)
            : setValid(true)
    }, [errors.currentPassword])

    return (
        <div className={`input-field col s12 current-password ${!valid ? 'invalid-input' : ''}`}>
            <span>Current Password</span>
            <input
                autoComplete="current-password"
                disabled={disabled}
                name="currentPassword"
                onBlur={handleBlur}
                onChange={handleChange}
                onFocus={handleFocus}
                type="password"
                value={value}
            />
            {valid ? null : <span className="error-message">{errors.currentPassword}</span>}
        </div>
    )
}

CurrentPassword.propTypes = {
    disabled: PropTypes.bool,
    errors: PropTypes.object,
    liftState: PropTypes.func,
    resolveErrors: PropTypes.func,
    value: PropTypes.string
}

export default CurrentPassword

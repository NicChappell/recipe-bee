// import dependencies
import React, { useEffect, useState } from 'react'
import PropTypes from 'prop-types'

const NewPassword1 = props => {
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
        if (errors.newPassword1) {
            resolveErrors('newPassword1')
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
        errors.newPassword1
            ? setValid(false)
            : setValid(true)
    }, [errors.newPassword1])

    return (
        <div className={`input-field col s12 m6 new-password ${!valid ? 'invalid-input' : ''}`}>
            <span>New Password</span>
            <input
                autoComplete="new-password"
                disabled={disabled}
                name="newPassword1"
                onBlur={handleBlur}
                onChange={handleChange}
                onFocus={handleFocus}
                type="password"
                value={value}
            />
            {valid ? null : <span className="error-message">{errors.newPassword1}</span>}
        </div>
    )
}

NewPassword1.propTypes = {
    disabled: PropTypes.bool,
    errors: PropTypes.object,
    liftState: PropTypes.func,
    resolveErrors: PropTypes.func,
    value: PropTypes.string
}

export default NewPassword1

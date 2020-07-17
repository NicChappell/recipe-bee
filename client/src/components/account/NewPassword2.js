// import dependencies
import React, { useEffect, useState } from 'react'
import PropTypes from 'prop-types'

const NewPassword2 = props => {
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
        if (errors.newPassword2) {
            resolveErrors('newPassword2')
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
        errors.newPassword2
            ? setValid(false)
            : setValid(true)
    }, [errors.newPassword2])

    return (
        <div className={`input-field col s12 m6 new-password ${!valid ? 'invalid-input' : ''}`}>
            <span>Confirm New Password</span>
            <input
                autoComplete="new-password"
                disabled={disabled}
                name="newPassword2"
                onBlur={handleBlur}
                onChange={handleChange}
                onFocus={handleFocus}
                placeholder="Confirm password"
                type="password"
                value={value}
            />
            {valid ? null : <span className="error-message">{errors.newPassword2}</span>}
        </div>
    )
}

NewPassword2.propTypes = {
    disabled: PropTypes.bool,
    errors: PropTypes.object,
    liftState: PropTypes.func,
    resolveErrors: PropTypes.func,
    value: PropTypes.string
}

export default NewPassword2

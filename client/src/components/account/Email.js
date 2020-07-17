// import dependencies
import React, { useEffect, useState } from 'react'
import PropTypes from 'prop-types'

const Email = props => {
    // destructure props
    const {
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
        if (errors.emailAddress) {
            resolveErrors('emailAddress')
        }

        // lift and update state
        liftState(value)
        value
            ? setValid(true)
            : setValid(false)
    }

    const handleFocus = () => setValid(true)

    // lift state when initial value changes
    useEffect(() => {
        liftState(initValue)
		// eslint-disable-next-line react-hooks/exhaustive-deps
    }, [initValue])

    // update state when errors value changes
    useEffect(() => {
        errors.emailAddress
            ? setValid(false)
            : setValid(true)
    }, [errors.emailAddress])

    return (
        <div className={`input-field col s12 email-address ${!valid ? 'invalid-input' : ''}`}>
            <span>Email Address</span>
            <input
                autoComplete="off"
                disabled={true}
                name="emailAddress"
                onBlur={handleBlur}
                onChange={handleChange}
                onFocus={handleFocus}
                placeholder="Email address"
                type="email"
                value={value}
            />
            {valid ? null : <span className="error-message">{errors.emailAddress}</span>}
        </div>
    )
}

Email.propTypes = {
    errors: PropTypes.object,
    initValue: PropTypes.string,
    liftState: PropTypes.func,
    resolveErrors: PropTypes.func,
    value: PropTypes.string
}

export default Email

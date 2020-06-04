// import dependencies
import React, { useEffect, useState } from 'react'
import PropTypes from 'prop-types'

const LastName = props => {
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
        if (errors.lastName) {
            resolveErrors('lastName')
        }

        // lift and update state
        liftState(value)
        value
            ? setValid(true)
            : setValid(false)
    }

    const handleFocus = () => setValid(true)

    // lift state when initial value changes
    useEffect(() => liftState(initValue), [initValue])

    // update state when errors value changes
    useEffect(() => {
        errors.lastName
            ? setValid(false)
            : setValid(true)
    }, [errors.lastName])

    // update state when disabled value changes
    useEffect(() => setValid(true), [disabled])

    return (
        <div className={`input-field col s6 last-name ${!valid ? 'invalid-input' : ''}`}>
            <span>Last Name</span>
            <input
                autoComplete="off"
                disabled={disabled}
                name="lastName"
                onBlur={handleBlur}
                onChange={handleChange}
                onFocus={handleFocus}
                placeholder="Last Name"
                type="text"
                value={value}
            />
            {valid ? null : <span className="error-message">{errors.lastName}</span>}
        </div>
    )
}

LastName.propTypes = {
    disabled: PropTypes.bool,
    errors: PropTypes.object,
    initValue: PropTypes.string,
    liftState: PropTypes.func,
    resolveErrors: PropTypes.func,
    value: PropTypes.string
}

export default LastName

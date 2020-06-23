// import dependencies
import React, { useEffect, useState } from 'react'
import PropTypes from 'prop-types'

const FirstName = props => {
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
        if (errors.firstName) {
            resolveErrors('firstName')
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
        errors.firstName
            ? setValid(false)
            : setValid(true)
    }, [errors.firstName])

    // update state when disabled value changes
    useEffect(() => setValid(true), [disabled])

    return (
        <div className={`input-field col s6 first-name ${!valid ? 'invalid-input' : ''}`}>
            <span>First Name</span>
            <input
                autoComplete="off"
                disabled={disabled}
                name="firstName"
                onBlur={handleBlur}
                onChange={handleChange}
                onFocus={handleFocus}
                placeholder="First Name"
                type="text"
                value={value}
            />
            {valid ? null : <span className="error-message">{errors.firstName}</span>}
        </div>
    )
}

FirstName.propTypes = {
    disabled: PropTypes.bool,
    errors: PropTypes.object,
    initValue: PropTypes.string,
    liftState: PropTypes.func,
    resolveErrors: PropTypes.func,
    value: PropTypes.string
}

export default FirstName

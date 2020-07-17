// import dependencies
import React, { useEffect, useState } from 'react'
import PropTypes from 'prop-types'

const City = props => {
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
        if (errors.city) {
            resolveErrors('city')
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
        errors.city
            ? setValid(false)
            : setValid(true)
    }, [errors.city])

    // update state when disabled value changes
    useEffect(() => setValid(true), [disabled])

    return (
        <div className={`input-field col s12 m6 city ${!valid ? 'invalid-input' : ''}`}>
            <span>City</span>
            <input
                autoComplete="off"
                disabled={disabled}
                name="city"
                onBlur={handleBlur}
                onChange={handleChange}
                onFocus={handleFocus}
                placeholder="City"
                type="text"
                value={value}
            />
            {valid ? null : <span className="error-message">{errors.city}</span>}
        </div>
    )
}

City.propTypes = {
    disabled: PropTypes.bool,
    errors: PropTypes.object,
    initValue: PropTypes.string,
    liftState: PropTypes.func,
    resolveErrors: PropTypes.func,
    value: PropTypes.string
}

export default City

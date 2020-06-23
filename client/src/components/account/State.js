// import dependencies
import React, { useEffect, useState } from 'react'
import PropTypes from 'prop-types'

const State = props => {
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
        if (errors.state) {
            resolveErrors('state')
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
        errors.state
            ? setValid(false)
            : setValid(true)
    }, [errors.state])

    // update state when disabled value changes
    useEffect(() => setValid(true), [disabled])

    return (
        <div className={`input-field col s12 m3 state ${!valid ? 'invalid-input' : ''}`}>
            <span>State</span>
            <input
                autoComplete="off"
                disabled={disabled}
                name="state"
                onBlur={handleBlur}
                onChange={handleChange}
                onFocus={handleFocus}
                placeholder="State"
                type="text"
                value={value}
            />
            {valid ? null : <span className="error-message">{errors.state}</span>}
        </div>
    )
}

State.propTypes = {
    disabled: PropTypes.bool,
    errors: PropTypes.object,
    initValue: PropTypes.string,
    liftState: PropTypes.func,
    resolveErrors: PropTypes.func,
    value: PropTypes.string
}

export default State

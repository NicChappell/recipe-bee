// import dependencies
import React, { useEffect, useState } from 'react'
import PropTypes from 'prop-types'

const Address2 = props => {
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
        if (errors.address2) {
            resolveErrors('address2')
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
        errors.address2
            ? setValid(false)
            : setValid(true)
    }, [errors.address2])

    // update state when disabled value changes
    useEffect(() => setValid(true), [disabled])

    return (
        <div className={`input-field col s12 street-address ${!valid ? 'invalid-input' : ''}`}>
            <input
                autoComplete="off"
                disabled={disabled}
                name="address2"
                onBlur={handleBlur}
                onChange={handleChange}
                onFocus={handleFocus}
                placeholder=""
                type="text"
                value={value}
            />
            {valid ? null : <span className="error-message">{errors.address2}</span>}
        </div>
    )
}

Address2.propTypes = {
    disabled: PropTypes.bool,
    errors: PropTypes.object,
    initValue: PropTypes.string,
    liftState: PropTypes.func,
    resolveErrors: PropTypes.func,
    value: PropTypes.string
}

export default Address2

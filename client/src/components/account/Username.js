// import dependencies
import React, { useEffect, useState } from 'react'
import PropTypes from 'prop-types'

const Username = props => {
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
        if (errors.username) {
            resolveErrors('username')
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
        errors.username
            ? setValid(false)
            : setValid(true)
    }, [errors.username])

    return (
        <div className={`input-field col s12 username ${!valid ? 'invalid-input' : ''}`}>
            <span>Username</span>
            <input
                autoComplete="off"
                disabled={true}
                name="username"
                onBlur={handleBlur}
                onChange={handleChange}
                onFocus={handleFocus}
                placeholder="Username"
                type="text"
                value={value}
            />
            {valid ? null : <span className="error-message">{errors.username}</span>}
        </div>
    )
}

Username.propTypes = {
    errors: PropTypes.object,
    initValue: PropTypes.string,
    liftState: PropTypes.func,
    resolveErrors: PropTypes.func,
    value: PropTypes.string
}

export default Username

// import dependencies
import React, { useEffect, useState } from 'react'
import PropTypes from 'prop-types'

const LastName = props => {
    // destructure props
    const {
        disabled,
        errors,
        initValue: initLastName,
        liftState,
        resolveErrors
    } = props

    // state hook variables
    const [firstName, setLastName] = useState('')
    const [valid, setValid] = useState(true)

    const handleBlur = e => e.target.value ? setValid(true) : setValid(false)

    const handleChange = e => {
        // destructure event
        const { value } = e.target

        // update state
        setLastName(value)
        value
            ? setValid(true)
            : setValid(false)
    }

    const handleFocus = () => setValid(true)

    // update state when initial value changes
    useEffect(() => initLastName && setLastName(initLastName), [initLastName])

    // update state when errors value changes
    useEffect(() => {
        errors.firstName
            ? setValid(false)
            : setValid(true)
    }, [errors.firstName])

    // lift state and resolve errors when first name changes
    useEffect(() => {
        liftState(firstName)
        if (errors.firstName) {
            resolveErrors('firstName')
        }
    }, [firstName])

    return (
        <div className="input-field col s6 first-name">
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
                value={firstName}
            />
        </div>
    )
}

LastName.propTypes = {
    errors: PropTypes.object,
    initValue: PropTypes.string,
    liftSlug: PropTypes.func,
    liftState: PropTypes.func,
    resolveErrors: PropTypes.func
}

export default LastName

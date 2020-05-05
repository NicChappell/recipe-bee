// import dependencies
import React, { useEffect, useState } from 'react'
import PropTypes from 'prop-types'

const ErrorMessage = ({ errors }) => {
    // state hook variables
    const [errorsRemaining, setErrorsRemaining] = useState(1)
    const [plural, setPlural] = useState('s')

    // update state when errors value changes
    useEffect(() => {
        setErrorsRemaining(Object.keys(errors).length)
        Object.keys(errors).length === 1 ? setPlural('') : setPlural('s')
    }, [Object.keys(errors).length])

    return (
        <div className="row center-align mt-1">
            <div className="col s12 error-message">
                {errorsRemaining} required field{plural} missing
            </div>
        </div>
    )
}

ErrorMessage.propTypes = { errors: PropTypes.object }

export default ErrorMessage

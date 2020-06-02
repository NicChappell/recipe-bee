// import dependencies
import React, { useEffect, useState } from 'react'
import PropTypes from 'prop-types'
import isEmpty from 'lodash.isempty'

const ApplicationErrors = ({ errors }) => {
    if (!isEmpty(errors)) {
        console.log(errors)
        return (
            <div className="col s12 error-message">
                An error occured, please try again later
            </div>
        )
    }
    return null
}

ApplicationErrors.propTypes = { errors: PropTypes.object }

const ValidationErrors = ({ errors }) => {
    // state hook variables
    const [errorsRemaining, setErrorsRemaining] = useState(0)
    const [plural, setPlural] = useState('s')

    // update state when errors value changes
    useEffect(() => {
        setErrorsRemaining(Object.keys(errors).length)
        Object.keys(errors).length === 1 ? setPlural('') : setPlural('s')
    }, [Object.keys(errors).length])

    if (!isEmpty(errors)) {
        return (
            <div className="col s12 error-message">
                {errorsRemaining} required field{plural} missing
            </div>
        )
    }
    return null
}

ValidationErrors.propTypes = { errors: PropTypes.object }

const RecipeErrors = (props) => {
    // destructure props
    const {
        applicationErrors,
        validationErrors
    } = props

    return (
        <div className="row center-align mt-1">
            <ApplicationErrors errors={applicationErrors} />
            <ValidationErrors errors={validationErrors} />
        </div>
    )
}

RecipeErrors.propTypes = {
    applicationErrors: PropTypes.object,
    validationErrors: PropTypes.object
}

export default RecipeErrors

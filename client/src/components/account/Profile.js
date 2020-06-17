// import dependencies
import React, { useEffect, useState } from 'react'
import PropTypes from 'prop-types'

// import components
import Address1 from './Address1'
import Address2 from './Address2'
import City from './City'
import EmailAddress from './EmailAddress'
import FirstName from './FirstName'
import Transmitting from '../utility/Transmitting'
import LastName from './LastName'
import PostalCode from './PostalCode'
import ProfileErrors from './ProfileErrors'
import State from './State'

// import validation
import validateProfile from '../../validation/profile'

// import helpers
import { slugify } from '../../helpers/utilities'

const Buttons = props => {
    // destructure props
    const {
        disabled,
        handleGoBackClick,
        handleSaveClick,
        handleUpdateClick,
        transmitting
    } = props

    if (disabled) {
        return (
            <div className="update">
                <button
                    className="black-text btn-small btn-flat grey lighten-2"
                    onClick={handleUpdateClick}
                >
                    Update Profile
                </button>
            </div>
        )
    }
    if (transmitting) {
        return (
            <span className="transmitting">
                Saving changes<Transmitting />
            </span>
        )
    }
    return (
        <div className="confirm-update">
            <button
                className="black-text btn-small btn-flat grey lighten-2"
                onClick={handleGoBackClick}
            >
                <i className="material-icons left">undo</i>
                Go Back
            </button>
            <button
                className="black-text btn-small btn-flat light-green lighten-2"
                onClick={handleSaveClick}
            >
                <i className="material-icons left">save</i>
                Save Changes
            </button>
        </div>
    )
}

Buttons.propTypes = {
    disabled: PropTypes.bool,
    handleGoBackClick: PropTypes.func,
    handleSaveClick: PropTypes.func,
    handleUpdateClick: PropTypes.func,
    transmitting: PropTypes.bool
}

const Profile = props => {
    // destructure props
    const {
        errors,
        updateUser,
        user
    } = props

    // state hook variables
    const [firstName, setFirstName] = useState('')
    const [lastName, setLastName] = useState('')
    const [emailAddress, setEmailAddress] = useState('')
    const [address1, setAddress1] = useState('')
    const [address2, setAddress2] = useState('')
    const [city, setCity] = useState('')
    const [state, setState] = useState('')
    const [postalCode, setPostalCode] = useState('')
    const [disabled, setDisabled] = useState(true)
    const [transmitting, setTransmitting] = useState(false)
    const [applicationErrors, setApplicationErrors] = useState({})
    const [validationErrors, setValidationErrors] = useState({})

    const resolveValidationErrors = (...keys) => {
        keys.forEach(key => delete validationErrors[key])
        setValidationErrors(validationErrors)
    }

    const handleGoBackClick = () => {
        // reset state variables
        setFirstName(user.firstName)
        setLastName(user.lastName)
        setEmailAddress(user.email)
        setAddress1(user.address1)
        setAddress2(user.address2)
        setCity(user.city)
        setState(user.state)
        setPostalCode(user.postalCode)
        setDisabled(true)
        setTransmitting(false)
        setApplicationErrors({})
        setValidationErrors({})
    }

    const handleSaveClick = () => {
        const userId = user._id

        // compile updateable user properties
        const profileData = {
            address1,
            address2,
            city,
            firstName,
            fullName: `${firstName} ${lastName}`,
            lastName,
            postalCode,
            slug: slugify(`${firstName} ${lastName}`),
            state
        }

        // validate user input
        const validate = validateProfile(profileData)

        // check for validation errors
        if (!validate.isValid) {
            setValidationErrors(validate.errors)
        } else {
            // update state
            setTransmitting(true)

            // update user
            updateUser(userId, profileData)
        }
    }

    const handleUpdateClick = () => setDisabled(false)

    // update state when errors prop changes
    useEffect(() => {
        setApplicationErrors(errors)
        setTransmitting(false)
    }, [errors])

    // update state when user prop changes
    useEffect(() => {
        setDisabled(true)
        setTransmitting(false)
    }, [user])

    return (
        <div className="card-panel profile">
            <div className="row info">
                <div className="col s12">
                    <h5>Profile</h5>
                </div>
                <FirstName
                    disabled={disabled}
                    errors={validationErrors}
                    initValue={user.firstName}
                    liftState={setFirstName}
                    resolveErrors={resolveValidationErrors}
                    value={firstName}
                />
                <LastName
                    disabled={disabled}
                    errors={validationErrors}
                    initValue={user.lastName}
                    liftState={setLastName}
                    resolveErrors={resolveValidationErrors}
                    value={lastName}
                />
                <EmailAddress
                    // disabled={disabled}
                    errors={validationErrors}
                    initValue={user.email}
                    liftState={setEmailAddress}
                    resolveErrors={resolveValidationErrors}
                    value={emailAddress}
                />
                <Address1
                    disabled={disabled}
                    errors={validationErrors}
                    initValue={user.address1}
                    liftState={setAddress1}
                    resolveErrors={resolveValidationErrors}
                    value={address1}
                />
                <Address2
                    disabled={disabled}
                    errors={validationErrors}
                    initValue={user.address2}
                    liftState={setAddress2}
                    resolveErrors={resolveValidationErrors}
                    value={address2}
                />
                <City
                    disabled={disabled}
                    errors={validationErrors}
                    initValue={user.city}
                    liftState={setCity}
                    resolveErrors={resolveValidationErrors}
                    value={city}
                />
                <State
                    disabled={disabled}
                    errors={validationErrors}
                    initValue={user.state}
                    liftState={setState}
                    resolveErrors={resolveValidationErrors}
                    value={state}
                />
                <PostalCode
                    disabled={disabled}
                    errors={validationErrors}
                    initValue={user.postalCode}
                    liftState={setPostalCode}
                    resolveErrors={resolveValidationErrors}
                    value={postalCode}
                />
            </div>
            <div className="row update-profile">
                <div className="col s12">
                    <Buttons
                        disabled={disabled}
                        handleGoBackClick={handleGoBackClick}
                        handleSaveClick={handleSaveClick}
                        handleUpdateClick={handleUpdateClick}
                        transmitting={transmitting}
                    />
                    <ProfileErrors
                        applicationErrors={applicationErrors}
                        validationErrors={validationErrors}
                    />
                </div>
            </div>
        </div>
    )
}

Profile.propTypes = {
    errors: PropTypes.object,
    resolveErrors: PropTypes.func,
    updateUser: PropTypes.func,
    user: PropTypes.object
}

export default Profile

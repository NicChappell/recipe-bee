// import dependencies
import React, { useState } from 'react'
import PropTypes from 'prop-types'

// import components
import FirstName from './FirstName'

// import custom hooks
import {
    useEmailValue,
    useTextValue
} from '../../helpers/customHooks'

// import helpers
import { slugify } from '../../helpers/utilities'

const Buttons = props => {
    // destructure props
    const {
        disabled,
        handleUpdateClick,
        setDisabled
    } = props

    const handleClick = () => setDisabled(!disabled)

    if (disabled) {
        return (
            <div className="update">
                <button
                    className="black-text btn-small btn-flat grey lighten-2"
                    onClick={handleClick}
                >
                    Update Profile
                </button>
            </div>
        )
    }
    return (
        <div className="confirm-update">
            <button
                className="black-text btn-small btn-flat grey lighten-2"
                onClick={handleClick}
            >
                <i className="material-icons left">undo</i>
                Go Back
            </button>
            <button
                className="black-text btn-small btn-flat light-green lighten-2"
                onClick={handleUpdateClick}
            >
                <i className="material-icons left">save</i>
                Save Changes
            </button>
        </div>
    )
}

Buttons.propTypes = {
    disabled: PropTypes.bool,
    handleDeleteClick: PropTypes.func,
    handleSaveClick: PropTypes.func,
    handleUpdateClick: PropTypes.func,
    setDisabled: PropTypes.func
}

const Profile = props => {
    // destructure props
    const {
        errors,
        resolveErrors,
        updateUser,
        user
    } = props

    // // destructure user
    // const {
    //     address1,
    //     address2,
    //     city,
    //     email,
    //     firstName,
    //     lastName,
    //     postalCode,
    //     state,
    //     username
    // } = user

    // custom hook variables
    const address1Input = useTextValue(user.address1)
    const address2Input = useTextValue(user.address2)
    const cityInput = useTextValue(user.city)
    const emailInput = useEmailValue(user.email)
    // const firstNameInput = useTextValue(user.firstName)
    const lastNameInput = useTextValue(user.lastName)
    const postalCodeInput = useTextValue(user.postalCode)
    const stateInput = useTextValue(user.state)
    const usernameInput = useTextValue(user.username)

    // state hook variables
    const [disabled, setDisabled] = useState(true)
    const [firstName, setFirstName] = useState('')
    const [validationErrors, setValidationErrors] = useState({})

    const resolveValidationErrors = (...keys) => {
        keys.forEach(key => delete validationErrors[key])
        setValidationErrors(validationErrors)
    }

    const handleUpdateClick = () => {
        const userId = user.id

        // compile updateable user properties
        const userData = {
            address1: address1Input.value,
            address2: address2Input.value,
            city: cityInput.value,
            firstName: firstName,
            fullName: `${firstName} ${lastNameInput.value}`,
            lastName: lastNameInput.value,
            slug: slugify(`${firstName} ${lastNameInput.value}`),
            state: stateInput.value
        }

        updateUser(userId, userData)
    }

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
                />
                <div className="input-field col s6">
                    <span>Last Name</span>
                    <input
                        {...lastNameInput}
                        disabled={disabled}
                        name="lastName"
                        placeholder="Last Name"
                    />
                </div>
                <div className="input-field col s12 m6">
                    <span>Username</span>
                    <input
                        {...usernameInput}
                        disabled={disabled}
                        name="username"
                        placeholder="Username"
                    />
                </div>
                <div className="input-field col s12 m6">
                    <span>Email Address</span>
                    <input
                        {...emailInput}
                        disabled={disabled}
                        name="email"
                        placeholder="Email Address"
                    />
                </div>
                <div className="input-field col s12">
                    <span>Mailing Address</span>
                    <input
                        {...address1Input}
                        disabled={disabled}
                        name="address1"
                        placeholder="Street Address"
                    />
                </div>
                <div className="input-field col s12">
                    <input
                        {...address2Input}
                        disabled={disabled}
                        name="address2"
                        placeholder=""
                    />
                </div>
                <div className="input-field col s12 m5">
                    <span>City</span>
                    <input
                        {...cityInput}
                        disabled={disabled}
                        name="city"
                        placeholder="City"
                    />
                </div>
                <div className="input-field col s12 m3">
                    <span>State</span>
                    <input
                        {...stateInput}
                        disabled={disabled}
                        name="state"
                        placeholder="State"
                    />
                </div>
                <div className="input-field col s12 m4">
                    <span>Postal Code</span>
                    <input
                        {...postalCodeInput}
                        disabled={disabled}
                        name="postalCode"
                        placeholder="Postal Code"
                    />
                </div>
            </div>
            <div className="row update-profile">
                <div className="col s12">
                    <Buttons
                        disabled={disabled}
                        handleUpdateClick={handleUpdateClick}
                        setDisabled={setDisabled}
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

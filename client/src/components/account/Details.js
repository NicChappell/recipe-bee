import React from 'react'

// import custom hooks
import {
    useEmailValue,
    usePasswordValue,
    useTextValue
} from '../../helpers/customHooks'

const AuthDetails = ({ user }) => {
    console.log(user)
    // destructure user
    const {
        address1,
        address2,
        city,
        email,
        firstName,
        lastName,
        postalCode,
        state,
        username
    } = user

    // custom hook variables
    const address1Input = useTextValue(address1)
    const address2Input = useTextValue(address2)
    const changePasswordInput = usePasswordValue('')
    const changePassword2Input = usePasswordValue('')
    const cityInput = useTextValue(city)
    const emailInput = useEmailValue(email)
    const firstNameInput = useTextValue(firstName)
    const lastNameInput = useTextValue(lastName)
    const passwordInput = usePasswordValue('')
    const postalCodeInput = useTextValue(postalCode)
    const stateInput = useTextValue(state)
    const usernameInput = useTextValue(username)

    const handleDeleteClick = () => {
        console.log('handle delete click')
    }

    const handleEditClick = () => {
        console.log('handle edit click')
    }

    return (
        <div className="col s12">
            <div className="card-panel">
                <div className="row">
                    <div className="col s12">
                        <h5>Personal Information</h5>
                    </div>
                </div>
                <div className="row">
                    <div className="input-field col s6">
                        <span>First Name</span>
                        <input
                            {...firstNameInput}
                            disabled={true}
                            name="firstName"
                            placeholder="First Name"
                        />
                    </div>
                    <div className="input-field col s6">
                        <span>Last Name</span>
                        <input
                            {...lastNameInput}
                            disabled={true}
                            name="lastName"
                            placeholder="Last Name"
                        />
                    </div>
                    <div className="input-field col s12 m6">
                        <span>Username</span>
                        <input
                            {...usernameInput}
                            disabled={true}
                            name="username"
                            placeholder="Username"
                        />
                    </div>
                    <div className="input-field col s12 m6">
                        <span>Email Address</span>
                        <input
                            {...emailInput}
                            disabled={true}
                            name="email"
                            placeholder="Email Address"
                        />
                    </div>
                    <div className="input-field col s12">
                        <span>Mailing Address</span>
                        <input
                            {...address1Input}
                            disabled={true}
                            name="address1"
                            placeholder="Street Address"
                        />
                    </div>
                    <div className="input-field col s12">
                        <input
                            {...address2Input}
                            disabled={true}
                            name="address2"
                            placeholder=""
                        />
                    </div>
                    <div className="input-field col s12 m5">
                        <span>City</span>
                        <input
                            {...cityInput}
                            disabled={true}
                            name="city"
                            placeholder="City"
                        />
                    </div>
                    <div className="input-field col s12 m3">
                        <span>State</span>
                        <input
                            {...stateInput}
                            disabled={true}
                            name="state"
                            placeholder="State"
                        />
                    </div>
                    <div className="input-field col s12 m4">
                        <span>Postal Code</span>
                        <input
                            {...postalCodeInput}
                            disabled={true}
                            name="postalCode"
                            placeholder="Postal Code"
                        />
                    </div>
                </div>
                <div className="row">
                    <div className="col s12">
                        <h5>Update Password</h5>
                    </div>
                </div>
                <div className="row">
                    <div className="input-field col s12">
                        <span>Current Password</span>
                        <input
                            {...passwordInput}
                            disabled={true}
                            name="password"
                            placeholder="Password"
                        />
                    </div>
                    <div className="input-field col s12">
                        <span>Change Password</span>
                    </div>
                    <div className="input-field col s6">
                        <input
                            {...changePasswordInput}
                            disabled={true}
                            name="changePassword"
                            placeholder="New Password"
                        />
                    </div>
                    <div className="input-field col s6">
                        <input
                            {...changePassword2Input}
                            disabled={true}
                            name="changePassword2"
                            placeholder="Confirm New Password"
                        />
                    </div>
                </div>
                <div className="row">
                    <div className="col s12 m6">
                        <h5>Delete Account</h5>
                    </div>
                    <div className="col s12 m6">
                        <button className="black-text btn red lighten-2" onClick={handleDeleteClick}>Delete Account</button>
                    </div>
                </div>
                <div className="row center-align">
                    <div className="col s12">
                        <button className="black-text btn grey lighten-2" onClick={handleEditClick}>Edit</button>
                    </div>
                </div>
            </div>
        </div>
    )
}

export default AuthDetails

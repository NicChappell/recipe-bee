import React from 'react'

// import custom hooks
import {
    useEmailValue,
    useTextValue
} from '../../helpers/customHooks'

const Profile = ({ user }) => {
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
    // console.log(user)

    // custom hook variables
    const address1Input = useTextValue(address1)
    const address2Input = useTextValue(address2)
    const cityInput = useTextValue(city)
    const emailInput = useEmailValue(email)
    const firstNameInput = useTextValue(firstName)
    const lastNameInput = useTextValue(lastName)
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
        <div className="card-panel profile">
            <div className="row personal-information">
                <div className="col s12">
                    <h5>Profile</h5>
                </div>
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
            <div className="row edit-account">
                <div className="col s12">
                    <button className="black-text btn grey lighten-2" onClick={handleEditClick}>Edit</button>
                </div>
            </div>
        </div>
    )
}

export default Profile

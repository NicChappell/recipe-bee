// import dependencies
import React from 'react'

// import custom hooks
import {
    useEmailValue,
    usePasswordValue,
    useTextValue
} from '../../helpers/customHooks'

const Settings = ({ user }) => {
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
    const changePasswordInput = usePasswordValue('')
    const changePassword2Input = usePasswordValue('')
    const passwordInput = usePasswordValue('')

    const handleDeleteClick = () => {
        console.log('handle delete click')
    }

    return (
        <div className="card-panel settings">
            <div className="row update-password">
                <div className="col s12">
                    <h5>Update Password</h5>
                </div>
                <div className="input-field col s12">
                    <span>Current Password</span>
                    <input
                        {...passwordInput}
                        disabled={true}
                        name="password"
                        placeholder="••••••••"
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
            <div className="row delete-account">
                <div className="col s8 left-align">
                    <h5>Delete Account</h5>
                </div>
                <div className="col s4 right-align">
                    <button className="black-text btn red lighten-2" onClick={handleDeleteClick}>Delete</button>
                </div>
            </div>
        </div>
    )
}

export default Settings

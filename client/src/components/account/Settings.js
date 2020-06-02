// import dependencies
import React, { useState } from 'react'
import PropTypes from 'prop-types'

// import custom hooks
import { usePasswordValue } from '../../helpers/customHooks'

const ChangePassword = props => {
    // destructure props
    const {
        changePassword,
        setChangePassword
    } = props

    // custom hook variables
    const changePasswordInput = usePasswordValue('')
    const changePassword2Input = usePasswordValue('')
    const currentPasswordInput = usePasswordValue('')

    const handleClick = () => setChangePassword(!changePassword)

    if (changePassword) {
        return (
            <div className="row password-inputs">
                <div className="input-field col s12">
                    <span>Current Password</span>
                    <input
                        {...currentPasswordInput}
                        name="password"
                    />
                </div>
                <div className="input-field col s12 m6">
                    <span>New Password</span>
                    <input
                        {...changePasswordInput}
                        name="changePassword"
                    />
                </div>
                <div className="input-field col s12 m6">
                    <span>Confirm New Password</span>
                    <input
                        {...changePassword2Input}
                        name="changePassword2"
                    />
                </div>
                <div className="col s12">
                    <div className="save-changes">
                        <button
                            className="black-text btn-small btn-flat grey lighten-2"
                            onClick={handleClick}
                        >
                            <i className="material-icons left">undo</i>
                            Go Back
                        </button>
                        <button
                            className="black-text btn-small btn-flat light-green lighten-2"
                            onClick={() => { }}
                        >
                            <i className="material-icons left">save</i>
                            Save Changes
                        </button>
                    </div>
                </div>
            </div>
        )
    }
    return (
        <div className="button">
            <button
                className="black-text btn-small btn-flat grey lighten-2"
                onClick={handleClick}
            >
                Change Password
            </button>
        </div>
    )
}

ChangePassword.propTypes = {
    changePassword: PropTypes.bool,
    setChangePassword: PropTypes.func
}

const DeleteAccount = props => {
    // destructure props
    const {
        deleteProfile,
        handleDeleteClick,
        setDeleteProfile
    } = props

    const handleClick = () => setDeleteProfile(!deleteProfile)

    if (deleteProfile) {
        return (
            <div className="confirm-delete">
                <span>Are you sure?</span>
                <button
                    className="black-text btn-small btn-flat grey lighten-2"
                    onClick={handleClick}
                >
                    <i className="material-icons left">undo</i>
                    Go Back
                </button>
                <button
                    className="black-text btn-small btn-flat red lighten-2"
                    onClick={handleDeleteClick}
                >
                    <i className="material-icons left">delete_forever</i>
                    Delete Account
                </button>
            </div>
        )
    }
    return (
        <div className="button">
            <button
                className="black-text btn-small btn-flat grey lighten-2"
                onClick={handleClick}
            >
                Delete Account
            </button>
        </div>
    )
}

DeleteAccount.propTypes = {
    deleteProfile: PropTypes.bool,
    handleDeleteClick: PropTypes.func,
    setDeleteProfile: PropTypes.func
}

const Settings = props => {
    // destructure props
    const {
        deleteUser,
        history,
        user
    } = props

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

    // state hook variables
    const [changePassword, setChangePassword] = useState(false)
    const [deleteProfile, setDeleteProfile] = useState(false)

    const handleDeleteClick = () => {
        deleteUser(user, history)
    }

    return (
        <div className="card-panel settings">
            <div className="row change-password">
                <div className="col s12">
                    <h5>Password</h5>
                </div>
                <div className="col s12">
                    <ChangePassword
                        changePassword={changePassword}
                        setChangePassword={setChangePassword}
                    />
                </div>
            </div>
            <div className="row delete-account">
                <div className="col s12">
                    <h5>Account</h5>
                </div>
                <div className="col s12">
                    <DeleteAccount
                        deleteProfile={deleteProfile}
                        handleDeleteClick={handleDeleteClick}
                        setDeleteProfile={setDeleteProfile}
                    />
                </div>
            </div>
        </div>
    )
}

Settings.propTypes = {
    deleteUser: PropTypes.func,
    history: PropTypes.object,
    user: PropTypes.object
}

export default Settings

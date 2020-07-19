// import dependencies
import React, { useEffect, useState } from 'react'
import PropTypes from 'prop-types'

// import components
import Transmitting from '../utility/Transmitting'

const Buttons = props => {
    // destructure props
    const {
        confirm,
        handleGoBackClick,
        handleConfirmDeleteClick,
        handleDeleteClick,
        transmitting
    } = props

    if (confirm) {
        return (
            <div className="confirm-delete">
                <span>Are you sure?</span>
                <button
                    className="black-text btn-small btn-flat grey lighten-2"
                    onClick={handleGoBackClick}
                >
                    <i className="material-icons left">undo</i>
                    Go Back
                </button>
                <button
                    className="black-text btn-small btn-flat red lighten-2"
                    onClick={handleConfirmDeleteClick}
                >
                    <i className="material-icons left">delete_forever</i>
                    Delete Account
                </button>
            </div>
        )
    }
    if (transmitting) {
        return (
            <span className="transmitting">
                Deleting account<Transmitting />
            </span>
        )
    }
    return (
        <div className="delete">
            <button
                className="black-text btn-small btn-flat grey lighten-2"
                onClick={handleDeleteClick}
            >
                Delete Account
            </button>
        </div>
    )
}

Buttons.propTypes = {
    confirm: PropTypes.bool,
    handleGoBackClick: PropTypes.func,
    handleConfirmDeleteClick: PropTypes.func,
    handleDeleteClick: PropTypes.func,
    transmitting: PropTypes.bool
}

const DeleteUser = props => {
    // destructure props
    const {
        applicationErrors,
        deleteUser,
        user
    } = props

    // state hook variables
    const [confirm, setConfirm] = useState(false)
    const [transmitting, setTransmitting] = useState(false)

    const handleConfirmDeleteClick = () => {
        // update state
        setConfirm(false)
        setTransmitting(true)

        // delete user
        deleteUser(user)
    }

    const handleDeleteClick = () => setConfirm(true)

    const handleGoBackClick = () => setConfirm(false)

    // update state if errors
    useEffect(() => setTransmitting(false), [applicationErrors])

    return (
        <div className="row delete-user">
            <div className="col s12">
                <h5>Account</h5>
            </div>
            <div className="col s12">
                <Buttons
                    confirm={confirm}
                    handleConfirmDeleteClick={handleConfirmDeleteClick}
                    handleDeleteClick={handleDeleteClick}
                    handleGoBackClick={handleGoBackClick}
                    transmitting={transmitting}
                />
            </div>
        </div>
    )
}

DeleteUser.propTypes = {
    applicationErrors: PropTypes.object,
    deleteUser: PropTypes.func,
    user: PropTypes.object
}

export default DeleteUser

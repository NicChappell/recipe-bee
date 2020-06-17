// import dependencies
import React, { useEffect, useState } from 'react'
import PropTypes from 'prop-types'
import isEmpty from 'lodash.isempty'

// import components
import ChangePassword from './ChangePassword'
import DeleteUser from './DeleteUser'

const ApplicationErrors = ({ errors }) => {
    if (!isEmpty(errors)) {
        return (
            <div className="row center-align error-message">
                <div className="col s12">
                    An error occured, please try again later
                </div>
            </div>
        )
    }
    return null
}

ApplicationErrors.propTypes = { errors: PropTypes.object }

const Settings = props => {
    // destructure props
    const {
        deleteUser,
        errors,
        history,
        user
    } = props

    // state hook variables
    const [applicationErrors, setApplicationErrors] = useState({})

    // update state if errors
    useEffect(() => setApplicationErrors(errors), [errors])

    return (
        <div className="card-panel settings">
            <ChangePassword
                applicationErrors={applicationErrors}
                setApplicationErrors={setApplicationErrors}
                user={user}
            />
            <DeleteUser
                applicationErrors={applicationErrors}
                deleteUser={deleteUser}
                history={history}
                setApplicationErrors={setApplicationErrors}
                user={user}
            />
            <ApplicationErrors errors={errors} />
        </div>
    )
}

Settings.propTypes = {
    deleteUser: PropTypes.func,
    errors: PropTypes.object,
    history: PropTypes.object,
    user: PropTypes.object
}

export default Settings

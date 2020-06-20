// import dependencies
import React from 'react'
import { connect } from 'react-redux'
import PropTypes from 'prop-types'

// import components
import ResetPasswordForm from '../components/auth/ResetPasswordForm'

const ResetPassword = props => {
    // destructure props
    const {
        errors,
        match
    } = props

    // destructure match
    const { token } = match.params

    return (
        <div className="container" id="reset-password">
            <div className="row center-align">
                <div className="col s12">
                    <ResetPasswordForm
                        errors={errors}
                        token={token}
                    />
                </div>
            </div>
        </div>
    )
}

ResetPassword.propTypes = { errors: PropTypes.object }

const mapStateToProps = state => ({ errors: state.errors })

export default connect(mapStateToProps)(ResetPassword)
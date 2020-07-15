// import dependencies
import React from 'react'
import { connect } from 'react-redux'
import PropTypes from 'prop-types'

// import components
import ForgotPasswordForm from '../components/auth/ForgotPasswordForm'

const ForgotPassword = ({ errors }) => {
    return (
        <div className="container" id="forgot-password">
            <div className="row center-align">
                <div className="col s12 m10 push-m1 l8 push-l2 xl6 push-xl3">
                    <ForgotPasswordForm errors={errors} />
                </div>
            </div>
        </div>
    )
}

ForgotPassword.propTypes = { errors: PropTypes.object }

const mapStateToProps = state => ({ errors: state.errors })

export default connect(mapStateToProps)(ForgotPassword)

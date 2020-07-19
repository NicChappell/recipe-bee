// import dependencies
import React from 'react'

// import components
import ForgotPasswordForm from '../components/forgot-password/ForgotPasswordForm'

const ForgotPassword = () => {
    return (
        <div className="container" id="forgot-password">
            <div className="row center-align">
                <div className="col s12 m10 push-m1 l8 push-l2 xl6 push-xl3">
                    <ForgotPasswordForm />
                </div>
            </div>
        </div>
    )
}

export default ForgotPassword

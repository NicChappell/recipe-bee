import React from 'react'

function SignInForm({ signIn }) {
    return (
        <div className="col s12">
            <div className="card-panel">
                <div className="row">
                    <div className="input-field col s12">
                        <i className="material-icons prefix">email</i>
                        <input placeholder="Email Address" id="email" type="email" />
                    </div>
                </div>
                <div className="row">
                    <div className="input-field col s12">
                        <i className="material-icons prefix">lock</i>
                        <input placeholder="Password" id="password" type="password" />
                    </div>
                </div>
                <div className="row center-align">
                    <div className="col s12">
                        <button className="black-text btn orange lighten-2" onClick={signIn}>Sign In</button>
                    </div>
                </div>
            </div>
        </div>
    )
}

export default SignInForm

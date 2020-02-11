import React from 'react'

function SignInForm() {
    return (
        <div className="col s12">
            <div className="card-panel">
                <form>
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
                            <button className="black-text btn-large orange lighten-2">Sign In</button>
                        </div>
                    </div>
                </form>
            </div>
        </div>
    )
}

export default SignInForm

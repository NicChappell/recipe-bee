import React from 'react'

import { Link } from 'react-router-dom'

function Footer() {
    const date = new Date()

    return (
        <footer className="page-footer grey lighten-2 mt-4">
            <div className="container">
                <div className="row">
                    <div className="col s12 m6">
                        <h5 className="black-text">RecipeBee</h5>
                        <p className="black-text">Make meal planning easy and fun</p>
                    </div>
                    <div className="col s6 m3">
                        <h5 className="black-text">Legal</h5>
                        <ul>
                            <li><Link className="black-text" to="/">Privacy Policy</Link></li>
                            <li><Link className="black-text" to="/">Terms and Conditions</Link></li>
                        </ul>
                    </div>
                    <div className="col s6 m3">
                        <h5 className="black-text">About</h5>
                        <ul>
                            <li><Link className="black-text" to="/">Blog</Link></li>
                            <li><Link className="black-text" to="/">Our Team</Link></li>
                            <li><Link className="black-text" to="/">Contact</Link></li>
                        </ul>
                    </div>
                </div>
            </div>
            <div className="footer-copyright">
                <div className="container black-text">
                    © {date.getFullYear()} RecipeBee, LLC
                </div>
            </div>
        </footer>
    )
}

export default Footer

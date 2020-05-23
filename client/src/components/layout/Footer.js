// import dependencies
import React from 'react'
import { Link } from 'react-router-dom'

// import images
import facebook from '../../images/social/facebook.svg'
import instagram from '../../images/social/instagram.svg'
import twitter from '../../images/social/twitter.svg'

const Footer = () => {
    // utility variables
    const date = new Date()

    return (
        <footer className="page-footer grey lighten-2" id="footer">
            <div className="container">
                <div className="row">
                    <div className="col s12 m6">
                        <h5 className="black-text">RecipeBee</h5>
                        <p className="black-text">Make meal planning easy and fun</p>
                    </div>
                    <div className="col s6 m3">
                        <h5 className="black-text">Legal</h5>
                        <ul>
                            <li><Link className="black-text" to="/privacy-policy">Privacy Policy</Link></li>
                            <li><Link className="black-text" to="/terms-and-conditions">Terms and Conditions</Link></li>
                        </ul>
                    </div>
                    <div className="col s6 m3">
                        <h5 className="black-text">About</h5>
                        <ul>
                            <li><Link className="black-text" to="/">Company</Link></li>
                            <li><Link className="black-text" to="/">Contact</Link></li>
                        </ul>
                    </div>
                </div>
            </div>
            <div className="footer-copyright">
                <div className="container">
                    <div className="row">
                        <div className="col s12 m6 black-text left-align copyright">
                            © {date.getFullYear()} RecipeBee, LLC
                        </div>
                        <div className="col s12 m6 right-align social">
                            <a href="https://www.instagram.com/recipe_bee/" target="_blank">
                                <img src={instagram} alt="instagram" />
                            </a>
                            <a href="https://twitter.com/recipe_bee" target="_blank">
                                <img src={twitter} alt="twitter" />
                            </a>
                            <a href="https://www.facebook.com/RecipeBeeLLC" target="_blank">
                                <img src={facebook} alt="facebook" />
                            </a>
                        </div>
                    </div>
                </div>
            </div>
        </footer>
    )
}

export default Footer

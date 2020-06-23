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
        <footer>
            <div className="container">
                <div className="row primary">
                    <div className="col s12 m6">
                        <h5>RecipeBee</h5>
                        <p>Save, share and discover new ideas</p>
                    </div>
                    <div className="col s6 m3">
                        <h5>Company</h5>
                        <ul>
                            <li><Link to="/about">About</Link></li>
                            <li><Link to="/contact">Contact</Link></li>
                        </ul>
                    </div>
                    <div className="col s6 m3">
                        <h5>Legal</h5>
                        <ul>
                            <li><Link to="/privacy-policy">Privacy Policy</Link></li>
                            <li><Link to="/terms-and-conditions">Terms and Conditions</Link></li>
                        </ul>
                    </div>
                </div>
                <div className="row secondary">
                    <div className="col s6 m9 copyright">
                        © {date.getFullYear()} RecipeBee, LLC
                    </div>
                    <div className="col s6 m3 social">
                        <a href="https://www.instagram.com/recipe_bee/" rel="noopener noreferrer" target="_blank">
                            <img src={instagram} alt="instagram" />
                        </a>
                        <a href="https://twitter.com/recipe_bee" rel="noopener noreferrer" target="_blank">
                            <img src={twitter} alt="twitter" />
                        </a>
                        <a href="https://www.facebook.com/RecipeBeeLLC" rel="noopener noreferrer" target="_blank">
                            <img src={facebook} alt="facebook" />
                        </a>
                    </div>
                </div>
            </div>
        </footer>
    )
}

export default Footer

// import dependencies
import React from 'react'
import { Link } from 'react-router-dom'

// import images
import backgroundImage from '../../images/backgrounds/healthy-food-pattern.svg'

const RecipeBanner = ({ isAuthenticated }) => {
    if (isAuthenticated) {
        return (
            <div className="row banner">
                <div className="col s12">
                    <div className="background" style={{ 'backgroundImage': `url(${backgroundImage})` }}>
                        <div className="content">
                            <p>Save your favorite recipes and share them with the RecipeBee community</p>
                            <Link to="/recipes/create" className="btn btn-flat amber lighten-2 black-text">Create Recipe</Link>
                        </div>
                    </div>
                </div>
            </div>
        )
    }
    return (
        <div className="row banner">
            <div className="col s12">
                <div className="background" style={{ 'backgroundImage': `url(${backgroundImage})` }}>
                    <div className="content">
                        <p>RecipeBee makes it easy to save your favorite recipes and discover new ideas</p>
                            <Link to="/sign-up" className="btn btn-flat amber lighten-2 black-text">Sign Up</Link>
                    </div>
                </div>
            </div>
        </div>
    )
}

export default RecipeBanner

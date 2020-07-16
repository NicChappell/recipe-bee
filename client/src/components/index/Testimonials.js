// import dependencies
import React from 'react'

const Testimonials = () => {
    return (
        <div className="row testimonials">
            <div className="col s12 header">
                <h3><span>What users</span> <span>are saying</span></h3>
                <p className="flow-text"><span>We love hearing from the RecipeBee community</span></p>
            </div>
            <div className="col s12 m8 push-m1">
                <div className="card-panel quote">
                    <blockquote className="flow-text">
                        RecipeBee makes it so easy to save and use all my go-to recipes.
                    </blockquote>
                    <p>– Sabina Ridley, Arlington, TX</p>
                </div>
            </div>
            <div className="col s12 m8 push-m3">
                <div className="card-panel quote">
                    <blockquote className="flow-text">
                        My partner and I are total foodies who love to cook. We've had so much fun finding new recipes and new cuisines to try at home!
                    </blockquote>
                    <p>– Sam Holland, San Jose, CA</p>
                </div>
            </div>
            <div className="col s12 m8 push-m1">
                <div className="card-panel quote">
                    <blockquote className="flow-text">
                        My husband and I split meal planning responsibility for our family. RecipeBee makes it so easy to new ideas, leaving us with one less thing to worry about.
                    </blockquote>
                    <p>– Miranda Lowry, Henderson, NV</p>
                </div>
            </div>
        </div>
    )
}

export default Testimonials

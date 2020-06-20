// import dependencies
import React from 'react'

const HowItWorks = () => {
    return (
        <div className="row how-it-works">
            <div className="col s12">
                <h5>How Does RecipeBee Work?</h5>
            </div>
            <div className="col s12 m6 l4">
                <div className="card-panel left-align">
                    <h5>
                        <i className="material-icons left">share</i> Share
                    </h5>
                    <p>Save and share recipes with the community</p>
                </div>
            </div>
            <div className="col s12 m6 l4">
                <div className="card-panel left-align">
                    <h5>
                        <i className="material-icons left">favorite</i> Love
                    </h5>
                    <p>Keep track of your favorite recipes</p>
                </div>
            </div>
            <div className="col s12 m6 push-m3 l4">
                <div className="card-panel left-align">
                    <h5>
                        <i className="material-icons left">thumbs_up_down</i> Vote
                    </h5>
                    <p>The most interesting ideas rise to the top</p>
                </div>
            </div>
        </div>
    )
}

export default HowItWorks

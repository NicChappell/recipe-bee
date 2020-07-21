// import dependencies
import React from 'react'
import PropTypes from 'prop-types'

const Button = props => {
    // destructure props
    const {
        fetchLimit,
        handleClick
    } = props

    if (!fetchLimit) {
        return (
            <div className="row center-align view-more">
                <div className="col s12">
                    <button
                        className="black-text btn-small btn-flat amber lighten-2"
                        onClick={handleClick}
                    >
                        View More Recipes
                    </button>
                </div>
            </div>
        )
    }
    return null
}

Button.propTypes = {
    fetchLimit: PropTypes.bool,
    handleClick: PropTypes.func
}

export default Button

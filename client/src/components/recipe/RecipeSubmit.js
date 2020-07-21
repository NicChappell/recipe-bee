// import dependencies
import React from 'react'
import PropTypes from 'prop-types'

// import components
import IndeterminateMessage from '../utility/IndeterminateMessage'

const IndeterminateComponents = ({ transmitting }) => {
    if (transmitting) {
        return (
            <div className="row center-align">
                <IndeterminateMessage message='Saving recipe' />
            </div>
        )
    }
    return null
}

const SaveButton = props => {
    // destructure props
    const {
        handleClick,
        transmitting
    } = props

    if (!transmitting) {
        return (
            <div className="row save-button">
                <div className="col s12">
                    <button className="black-text btn-small btn-flat amber lighten-2 mt-1" onClick={handleClick}>
                        Save Recipe
                    </button>
                </div>
            </div>
        )
    }
    return null
}

const RecipeSubmit = props => {
    // destructure props
    const {
        handleClick,
        transmitting
    } = props

    return (
        <div className="row center-align">
            <div className="col s6 push-s3">
                <IndeterminateComponents transmitting={transmitting} />
                <SaveButton
                    handleClick={handleClick}
                    transmitting={transmitting}
                />
            </div>
        </div>
    )
}

RecipeSubmit.propTypes = {
    handleClick: PropTypes.func,
    transmitting: PropTypes.bool
}

export default RecipeSubmit

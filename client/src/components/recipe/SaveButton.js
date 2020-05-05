// import dependencies
import React from 'react'
import PropTypes from 'prop-types'

const SaveButton = ({ onClick }) => (
    <div className="row center-align save-button">
        <div className="col s12">
            <button className="black-text btn-small btn-flat amber lighten-2 mt-1" onClick={onClick}>
                Save Recipe
            </button>
        </div>
    </div>
)

SaveButton.propTypes = { onClick: PropTypes.func }

export default SaveButton

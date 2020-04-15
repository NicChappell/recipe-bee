// import dependencies
import React from 'react'
import PropTypes from 'prop-types'

const EditButtons = props => {
    // destructure props
    const {
        handleDeleteClick,
        handleEditClick,
        handleUpdateClick,
        modify,
        valid
    } = props

    if (modify) {
        return (
            <div className="col s4 m3 l2 buttons">
                <button className="btn-small green lighten-2" disabled={!valid} onClick={handleUpdateClick}>
                    <i className="black-text material-icons">check</i>
                </button>
            </div>
        )
    }
    return (
        <div className="col s4 m3 l2 buttons">
            <button className="btn-small btn-flat white" onClick={handleEditClick}>
                <i className="black-text material-icons">edit</i>
            </button>
            <button className="btn-small btn-flat white" onClick={handleDeleteClick}>
                <i className="black-text material-icons">delete</i>
            </button>
        </div>
    )
}

EditButtons.propTypes = {
    disabled: PropTypes.bool,
    handleDeleteClick: PropTypes.func,
    handleEditClick: PropTypes.func,
    handleUpdateClick: PropTypes.func
}

export default EditButtons

import React from 'react'

const DeleteEditUpdateButtons = (props) => {
    const {
        disabled,
        handleDeleteClick,
        handleEditClick,
        handleUpdateClick
    } = props

    if (disabled) {
        return (
            <div className="col s2 buttons">
                <button className="btn-small btn-flat white" onClick={handleEditClick}>
                    <i className="black-text material-icons">edit</i>
                </button>
                <button className="btn-small btn-flat white" onClick={handleDeleteClick}>
                    <i className="black-text material-icons">delete</i>
                </button>
            </div>
        )
    }
    return (
        <div className="col s2 buttons">
            <button className="btn-small green lighten-2" onClick={handleUpdateClick}>
                <i className="black-text material-icons">check</i>
            </button>
        </div>
    )
}

export default DeleteEditUpdateButtons

import React from 'react'

const AddDeleteButtons = (props) => {
    const {
        imgSrc,
        handleAddClick,
        handleDeleteClick
    } = props

    if (imgSrc) {
        return (
            <button className="black-text btn-small lighten-2 orange" onClick={handleDeleteClick}>
                Remove Image
                {/* <i className="black-text material-icons right">delete</i> */}
            </button>
        )
    }
    return (
        <button className="black-text btn-small lighten-2 orange" onClick={handleAddClick}>
            Add Image
            {/* <i className="black-text material-icons right">insert_photo</i> */}
        </button>
    )
}

export default AddDeleteButtons

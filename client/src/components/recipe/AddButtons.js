// import dependencies
import React from 'react'
import PropTypes from 'prop-types'

const AddButtons = props => {
    // destructure props
    const {
        addImgSrc,
        imgSrc,
        rmImgSrc
    } = props

    if (imgSrc) {
        return (
            <button className="black-text btn-small lighten-2 orange" onClick={rmImgSrc}>
                Remove Image
            </button>
        )
    }
    return (
        <button className="black-text btn-small lighten-2 orange" onClick={addImgSrc}>
            Add Image
        </button>
    )
}

AddButtons.propTypes = {
    addImgSrc: PropTypes.func.isRequired,
    imgSrc: PropTypes.string.isRequired,
    rmImgSrc: PropTypes.func.isRequired
}

export default AddButtons

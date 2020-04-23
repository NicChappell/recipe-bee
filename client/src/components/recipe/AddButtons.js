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
            <button className="black-text btn-small btn-flat amber lighten-2 my-1" onClick={rmImgSrc}>
                Remove Photo
            </button>
        )
    }
    return (
        <button className="black-text btn-small btn-flat amber lighten-2 my-1" onClick={addImgSrc}>
            Add Photo
        </button>
    )
}

AddButtons.propTypes = {
    addImgSrc: PropTypes.func,
    imgSrc: PropTypes.bool,
    rmImgSrc: PropTypes.func
}

export default AddButtons

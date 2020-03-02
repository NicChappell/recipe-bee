import React from 'react'

import placeholder from '../../images/placeholders/recipe-placeholder.svg'

const Image = ({ imgSrc }) => {

    if (imgSrc) {
        return (
            <div className="grey lighten-3 recipe-image">
                <img src={imgSrc} alt="" />
            </div>
        )
    } else {
        return (
            <div className="grey lighten-3 recipe-placeholder">
                <img src={placeholder} alt="" />
            </div>
        )
    }
}

export default Image

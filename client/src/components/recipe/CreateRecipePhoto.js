import React from 'react'

import AddDeleteButtons from './AddDeleteButtons'
import Image from './Image'

const CreateRecipePhoto = (props) => {
    const {
        addImg,
        imgSrc,
        rmvImg
    } = props

    const handleChange = e => {
        addImg(e)
    }

    const handleAddClick = e => document.querySelector('.image-input').click()

    const handleDeleteClick = e => {
        document.querySelector('.image-input').value = null
        rmvImg(e)
    }

    return (
        <div className="col s12 m6">
            <div className="row">
                <div className="col s12">
                    <Image imgSrc={imgSrc} />
                </div>
            </div>
            <div className="row">
                <div className="col s12 center-align">
                    <input className="image-input" onChange={handleChange} type="file" />
                    <AddDeleteButtons
                        imgSrc={imgSrc}
                        handleAddClick={handleAddClick}
                        handleDeleteClick={handleDeleteClick}
                    />
                </div>
            </div>
        </div>
    )
}

export default CreateRecipePhoto

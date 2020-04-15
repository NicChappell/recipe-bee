// import dependencies
import React from 'react'
import PropTypes from 'prop-types'

// import components
import AddButtons from './AddButtons'

// import images
import placeholder from '../../images/placeholders/dish.svg'

const RecipePhoto = props => {
    // destructure props
    const {
        errorMessage,
        liftState,
        photo
    } = props

    const handleChange = e => {
        // access the uploaded file from the files array
        const file = e.target.files[0]

        // create a new FileReader object
        const reader = new FileReader()

        if (file) {
            // The progress event is fired periodically as the FileReader reads data
            reader.onprogress = e => {
                // evt is an ProgressEvent.
                if (e.lengthComputable) {
                    var percentLoaded = Math.round((e.loaded / e.total) * 100)
                    console.log(percentLoaded)
                }
            }

            // The load event is fired when a file has been read successfully
            reader.onload = e => {
                // update state
                liftState(e.target.result)
            }

            // the readAsDataURL method is used to read the contents of the specified file
            // when the read operation is finished, the the loadend event is triggered
            // at that time, the result attribute contains the data as a data: URL
            // which represents the file's data as a base64 encoded string
            reader.readAsDataURL(file)
        }
    }

    const addImgSrc = () => document.querySelector('.image-input').click()

    const rmImgSrc = e => {
        // reset (hidden) input field
        document.querySelector('.image-input').value = null

        // update state
        liftState(undefined)
    }

    return (
        <div className="row photo">
            <div className="col s12">
                <div className="grey lighten-3 recipe-image">
                    <img src={photo ? photo : placeholder} alt="" />
                </div>
            </div>
            <div className="col s12 center-align">
                <input className="image-input" onChange={handleChange} type="file" />
                <AddButtons
                    addImgSrc={addImgSrc}
                    imgSrc={photo}
                    rmImgSrc={rmImgSrc}
                />
            </div>
        </div>
    )
}

RecipePhoto.propTypes = {
    errorMessage: PropTypes.string,
    liftState: PropTypes.func
}

export default RecipePhoto

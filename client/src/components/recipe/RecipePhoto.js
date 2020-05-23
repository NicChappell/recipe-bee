// import dependencies
import React, { useEffect, useState } from 'react'
import PropTypes from 'prop-types'

// import components
import AddButtons from './AddButtons'

const RecipePhoto = props => {
    // destructure props
    const {
        errors,
        liftState,
        resolveErrors
    } = props

    // state hook variables
    const [base64, setbase64] = useState('')
    const [valid, setValid] = useState(true)

    const handleChange = e => {
        // access the uploaded file from the files array
        const file = e.target.files[0]

        // lift state
        liftState(file)

        // resolve errors
        resolveErrors('photo')

        // create a new FileReader object
        const reader = new FileReader()

        if (file) {
            // The progress event is fired periodically as the FileReader reads data
            reader.onprogress = e => {
                if (e.lengthComputable) {
                    var percentLoaded = Math.round((e.loaded / e.total) * 100)
                    // console.log(percentLoaded)
                }
            }

            // The load event is fired when a file has been read successfully
            reader.onload = e => {
                // update state
                setbase64(e.target.result)
            }

            // the readAsDataURL method is used to read the contents of the specified file
            // when the read operation is finished, the the loadend event is triggered
            // at that time, the result attribute contains the data as a data: URL
            // which represents the file's data as a base64 encoded string
            reader.readAsDataURL(file)
        }
    }

    const addImgSrc = () => document.querySelector('.photo-input').click()

    const rmImgSrc = e => {
        // reset (hidden) input field
        document.querySelector('.photo-input').value = null

        // update state
        setbase64('')

        // lift state
        liftState(undefined)
    }

    // update state when errors value changes
    useEffect(() => {
        errors.photo
            ? setValid(false)
            : setValid(true)
    }, [errors.photo])

    return (
        <div className="row center-align photo">
            <div className="col s12">
                <div className={`photo-container ${base64 ? 'base64' : 'placeholder'} ${!base64 && !valid ? 'invalid-upload' : ''}`}>
                    <img className={!valid ? 'invalid-photo' : ''} src={base64} alt="" />
                </div>
            </div>
            <div className="col s12">
                <input className="photo-input" name="file" onChange={handleChange} type="file" />
                <AddButtons
                    addImgSrc={addImgSrc}
                    imgSrc={base64 ? true : false}
                    rmImgSrc={rmImgSrc}
                />
            </div>
            <div className="col s12">
                {!valid ? <span className="error-message">{errors.photo}</span> : null}
            </div>
        </div>
    )
}

RecipePhoto.propTypes = {
    errors: PropTypes.object,
    liftState: PropTypes.func,
    resolveErrors: PropTypes.func
}

export default RecipePhoto

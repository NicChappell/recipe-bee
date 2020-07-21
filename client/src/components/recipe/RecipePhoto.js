// import dependencies
import React, { useEffect, useState } from 'react'
import PropTypes from 'prop-types'

const CreateButtons = props => {
    // destructure props
    const {
        addImage,
        imageSource,
        removeImage
    } = props

    if (imageSource) {
        return (
            <button className="black-text btn-small btn-flat amber lighten-2 my-1" onClick={removeImage}>
                Remove Photo
            </button>
        )
    }
    return (
        <button className="black-text btn-small btn-flat amber lighten-2 my-1" onClick={addImage}>
            Add Photo
        </button>
    )
}

CreateButtons.propTypes = {
    addImage: PropTypes.func,
    imageSource: PropTypes.string,
    removeImage: PropTypes.func
}

const CreatePhoto = props => {
    // destructure props
    const {
        errors,
        liftState,
        resolveErrors
    } = props

    // state hook variables
    const [imageSource, setImageSource] = useState('')
    const [photo, setPhoto] = useState(undefined)
    const [valid, setValid] = useState(true)

    const handleChange = e => {
        // access the uploaded file from the files array
        const file = e.target.files[0]

        // update state
        setPhoto(file)

        // create a new FileReader object
        const reader = new FileReader()

        if (file) {
            // // The progress event is fired periodically as the FileReader reads data
            // reader.onprogress = e => {
            //     if (e.lengthComputable) {
            //         var percentLoaded = Math.round((e.loaded / e.total) * 100)
            //         console.log(percentLoaded)
            //     }
            // }

            // The load event is fired when a file has been read successfully
            reader.onload = e => {
                // update state
                setImageSource(e.target.result)
            }

            // the readAsDataURL method is used to read the contents of the specified file
            // when the read operation is finished, the loadend event is triggered
            // at that time, the result attribute contains the data as a data: URL
            // which represents the file's data as a base64 encoded string
            reader.readAsDataURL(file)
        }
    }

    const addImage = () => document.querySelector('.photo-input').click()

    const removeImage = e => {
        // reset (hidden) input field
        document.querySelector('.photo-input').value = null

        // update state
        setImageSource('')
        setPhoto(undefined)
    }

    // update state when errors value changes
    useEffect(() => {
        errors.photo
            ? setValid(false)
            : setValid(true)
    }, [errors.photo])

    // lift state and resolve errors when photo changes
    useEffect(() => {
        liftState(photo)
        if (errors.photo) {
            resolveErrors('photo')
        }
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [photo])

    return (
        <div className="row center-align photo">
            <div className="col s12">
                <div className={`photo-container ${!valid ? 'invalid-photo' : ''}`} style={{ 'backgroundImage': `url(${imageSource})` }}></div>
            </div>
            <div className="col s12">
                <input className="photo-input" name="file" onChange={handleChange} type="file" />
                <CreateButtons
                    addImage={addImage}
                    imageSource={imageSource}
                    removeImage={removeImage}
                />
            </div>
            <div className="col s12">
                {!valid ? <span className="error-message">{errors.photo}</span> : null}
            </div>
        </div>
    )
}

CreatePhoto.propTypes = {
    errors: PropTypes.object,
    liftState: PropTypes.func,
    resolveErrors: PropTypes.func
}

const UpdateButtons = props => {
    // destructure props
    const {
        addImage,
        deleteImage,
        photoStatus,
        removeImage
    } = props

    // state hook variables
    const [confirmDelete, setConfirmDelete] = useState(false)

    switch (photoStatus) {
        case 'existing':
            if (confirmDelete) {
                return (
                    <div className="confirm-delete">
                        <span>Are you sure?</span>
                        <div className="buttons">
                            <button className="black-text btn-small btn-flat grey lighten-2" onClick={() => setConfirmDelete(false)}>
                                <i className="material-icons left">undo</i>
                                Undo
                            </button>
                            <button className="black-text btn-small btn-flat deep-orange lighten-2" onClick={deleteImage}>
                                <i className="material-icons left">delete_forever</i>
                                Delete
                            </button>
                        </div>
                    </div>
                )
            }
            return (
                <button className="black-text btn-small btn-flat amber lighten-2 my-1" onClick={() => setConfirmDelete(true)}>
                    Delete Photo
                </button>
            )
        case 'new':
            return (
                <button className="black-text btn-small btn-flat amber lighten-2 my-1" onClick={removeImage}>
                    Remove Photo
                </button>
            )
        default:
            return (
                <button className="black-text btn-small btn-flat amber lighten-2 my-1" onClick={addImage}>
                    Add Photo
                </button>
            )
    }
}

UpdateButtons.propTypes = {
    addImage: PropTypes.func,
    deleteImage: PropTypes.func,
    photoStatus: PropTypes.string,
    removeImage: PropTypes.func
}

const UpdatePhoto = props => {
    // destructure props
    const {
        errors,
        initValue: initPhoto,
        liftState,
        photoStatus,
        resolveErrors,
        setPhotoStatus,
        uploadAction
    } = props

    // state hook variables
    const [imageSource, setImageSource] = useState('')
    const [photo, setPhoto] = useState(undefined)
    const [valid, setValid] = useState(true)

    const handleChange = e => {
        // access the uploaded file from the files array
        const file = e.target.files[0]

        // update state
        setPhoto(file)
        setPhotoStatus('new')

        // create a new FileReader object
        const reader = new FileReader()

        if (file) {
            // // The progress event is fired periodically as the FileReader reads data
            // reader.onprogress = e => {
            //     if (e.lengthComputable) {
            //         var percentLoaded = Math.round((e.loaded / e.total) * 100)
            //         console.log(percentLoaded)
            //     }
            // }

            // The load event is fired when a file has been read successfully
            reader.onload = e => {
                // update state
                setImageSource(e.target.result)
            }

            // the readAsDataURL method is used to read the contents of the specified file
            // when the read operation is finished, the loadend event is triggered
            // at that time, the result attribute contains the data as a data: URL
            // which represents the file's data as a base64 encoded string
            reader.readAsDataURL(file)
        }
    }

    const addImage = () => document.querySelector('.photo-input').click()

    const deleteImage = () => {
        // delete image
        uploadAction(photo._id)

        // update state
        setImageSource('')
        setPhoto(undefined)
        setPhotoStatus(undefined)
    }

    const removeImage = e => {
        // reset (hidden) input field
        document.querySelector('.photo-input').value = null

        // update state
        setImageSource('')
        setPhoto(undefined)
        setPhotoStatus(undefined)
    }

    // update state when initial value changes
    useEffect(() => {
        if (initPhoto) {
            setImageSource(`/api/v1/uploads/image/${initPhoto.filename}`)
            setPhoto(initPhoto)
            setPhotoStatus('existing')
        }
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [initPhoto])

    // update state when errors value changes
    useEffect(() => {
        errors.photo
            ? setValid(false)
            : setValid(true)
    }, [errors.photo])

    // lift state and resolve errors when photo changes
    useEffect(() => {
        liftState(photo)
        if (errors.photo) {
            resolveErrors('photo')
        }
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [photo])

    return (
        <div className="row center-align photo">
            <div className="col s12">
                <div className={`photo-container ${!valid ? 'invalid-photo' : ''}`} style={{ 'backgroundImage': `url(${imageSource})` }}></div>
            </div>
            <div className="col s12">
                <input className="photo-input" name="file" onChange={handleChange} type="file" />
                <UpdateButtons
                    addImage={addImage}
                    deleteImage={deleteImage}
                    photoStatus={photoStatus}
                    removeImage={removeImage}
                />
            </div>
            <div className="col s12">
                {!valid ? <span className="error-message">{errors.photo}</span> : null}
            </div>
        </div>
    )
}

UpdatePhoto.propTypes = {
    errors: PropTypes.object,
    initValue: PropTypes.object,
    liftState: PropTypes.func,
    photoStatus: PropTypes.string,
    resolveErrors: PropTypes.func,
    setPhotoStatus: PropTypes.func,
    uploadAction: PropTypes.func
}

const RecipePhoto = props => {
    if (props.initValue) {
        return <UpdatePhoto {...props} />
    }
    return <CreatePhoto {...props} />
}

export default RecipePhoto

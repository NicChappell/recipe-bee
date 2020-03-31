// import dependencies
import React, { useState } from 'react'

// import components
import DeleteEditUpdateButtons from './DeleteEditUpdateButtons'

const PreparationsList = props => {
    // state hook variables
    const [disabled, setDisabled] = useState(true)
    const [valid, setValid] = useState(true)
    const [value, setValue] = useState(props.preparation.value)

    // destructure props
    const {
        deletePreparation,
        index,
        preparation,
        updatePreparation
    } = props

    const handleChange = e => {
        // get user input
        const { value } = e.target

        // update state
        setValid(true)
        setValue(value)
    }

    const handleDeleteClick = () => deletePreparation(preparation)

    const handleEditClick = () => setDisabled(false)

    const handleUpdateClick = () => {
        // update preparation if value exists
        if (value) {
            // create updated preparation object
            const updatedPreparation = {
                ...preparation,
                value
            }

            // update preparation in recipe
            updatePreparation(updatedPreparation)

            // reset state
            setDisabled(true)
            setValid(true)
        } else {
            // prompt user to provide valid input
            setValid(false)
        }
    }

    return (
        <div className="row preparation">
            <div className="col s10">
                <div className="row mb-0">
                    <div className="input-field col s1">
                        <p className="center-align">
                            <b>{`${index + 1})`}</b>
                        </p>
                    </div>
                    <div className={`input-field col s11 ${valid ? null : 'invalid-input'}`}>
                        <textarea
                            className='materialize-textarea'
                            disabled={disabled}
                            name="preparation"
                            onChange={handleChange}
                            placeholder={valid ? 'Preparation' : 'Preparation is required'}
                            value={value}
                        >
                        </textarea>
                    </div>
                </div>
            </div>
            <DeleteEditUpdateButtons
                disabled={disabled}
                handleEditClick={handleEditClick}
                handleDeleteClick={handleDeleteClick}
                handleUpdateClick={handleUpdateClick}
            />
        </div>
    )
}

export default PreparationsList

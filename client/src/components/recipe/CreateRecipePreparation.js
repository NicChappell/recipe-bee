import React, { useState } from 'react'
import { v4 as uuid } from 'uuid'

const CreateRecipePreparation = props => {
    // state hook variables
    const [valid, setValid] = useState(true)
    const [value, setValue] = useState('')

    // destructure props
    const {
        addPreparation,
        index
    } = props

    const handleChange = e => {
        // get user input
        const { value } = e.target

        // update state
        setValid(true)
        setValue(value)
    }

    const handleClick = () => {
        // generate unique id
        const id = uuid()

        // add preparation if value exists
        if (value) {
            // create new preparation object
            const newPreparation = { id, value }

            // add new preparation to recipe
            addPreparation(newPreparation)

            // update state
            setValid(true)
            setValue('')
        } else {
            // prompt user to provide valid input
            setValid(false)
        }

    }

    return (
        <div className="row preparation">
            <div className="col s10">
                <div className="input-field col s1">
                    <p className="center-align">
                        <b>{`${index})`}</b>
                    </p>
                </div>
                <div className={`input-field col s11 ${valid ? null : 'invalid-input'}`}>
                    <textarea
                        className='materialize-textarea'
                        name="preparation"
                        onChange={handleChange}
                        placeholder={valid ? 'Preparation' : 'Preparation is required'}
                        value={value}
                    >
                    </textarea>
                </div>
            </div>
            <div className="col s2 buttons">
                <button className="btn orange lighten-2" onClick={handleClick}>
                    <i className="black-text material-icons">add</i>
                </button>
            </div>
        </div>
    )
}

export default CreateRecipePreparation

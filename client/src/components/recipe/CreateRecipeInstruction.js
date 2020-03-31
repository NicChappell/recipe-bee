import React, { useState } from 'react'
import { v4 as uuid } from 'uuid'

const CreateRecipeInstruction = props => {
    // state hook variables
    const [valid, setValid] = useState(true)
    const [value, setValue] = useState('')

    // destructure props
    const {
        addInstruction,
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

        // add instruction if value exists
        if (value) {
            // create new instruction object
            const newInstruction = { id, value }

            // add new instruction to recipe
            addInstruction(newInstruction)

            // update state
            setValid(true)
            setValue('')
        } else {
            // prompt user to provide valid input
            setValid(false)
        }

    }

    return (
        <div className="row instruction">
            <div className="col s10">
                <div className="input-field col s1">
                    <p className="center-align">
                        <b>{`${index})`}</b>
                    </p>
                </div>
                <div className={`input-field col s11 ${valid ? null : 'invalid-input'}`}>
                    <textarea
                        className='materialize-textarea'
                        name="instruction"
                        onChange={handleChange}
                        placeholder={valid ? 'Instruction' : 'Instruction is required'}
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

export default CreateRecipeInstruction

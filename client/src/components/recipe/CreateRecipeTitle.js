// import dependencies
import React, { useState } from 'react'

const CreateRecipeTitle = ({ liftState }) => {
    // state hook variables
    const [valid, setValid] = useState(true)
    const [value, setValue] = useState('')

    const handleChange = e => {
        // get user input
        const { value } = e.target

        // update state
        setValue(value)

        if (value) {
            // add description to recipe if value exists
            liftState(value)

            // user provided a valid input
            setValid(true)
        } else {
            // prompt user to provide a valid input
            setValid(false)
        }
    }

    return (
        <div className="row">
            <div className={`input-field col s12 ${valid ? null : 'invalid-input'}`}>
                <input
                    name="title"
                    onChange={handleChange}
                    placeholder={valid ? "Title" : "Title is required"}
                    type='text'
                    value={value}
                />
            </div>
        </div>
    )
}

export default CreateRecipeTitle

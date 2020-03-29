import React, { useState } from 'react'

const CreateRecipeDescription = props => {
    // state hook variables
    const [valid, setValid] = useState(true)
    const [value, setValue] = useState('')

    const handleChange = e => {
        // get user input
        const { value } = e.target

        // destructure props
        const { recipeDescription } = props

        if (value) {
            // add description to recipe if value exists
            recipeDescription(value)

            // update state
            setValid(true)
            setValue(value)
        } else {
            // prompt user to provide valid input
            setValid(false)
            setValue(value)
        }
    }

    return (
        <div className="row">
            <div className={`input-field col s12 ${valid ? null : 'invalid-input'}`}>
                <textarea
                    className='materialize-textarea'
                    name="description"
                    onChange={handleChange}
                    placeholder={valid ? "Description" : "Description is required"}
                    value={value}
                >
                </textarea>
            </div>
        </div>
    )
}

export default CreateRecipeDescription

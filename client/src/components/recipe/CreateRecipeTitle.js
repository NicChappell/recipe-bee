// import dependencies
import React, { useState } from 'react'

const CreateRecipeTitle = props => {
    // state hook variables
    const [valid, setValid] = useState(true)
    const [value, setValue] = useState('')

    const handleChange = e => {
        // get user input
        const { value } = e.target

        // destructure props
        const { recipeTitle } = props

        if (value) {
            // add title to recipe if value exists
            recipeTitle(value)

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

import React, { Component } from 'react'

class CreateRecipeDescription extends Component {
    state = {
        valid: true,
        value: ''
    }

    handleChange = e => {
        // get user input
        const { value } = e.target

        // destructure props
        const { recipeDescription } = this.props

        // add description if value exists
        if (value) {
            // add description to recipe
            recipeDescription(value)

            // update state
            this.setState({
                valid: true,
                value
            })
        } else {
            // prompt user to provide valid input
            this.setState({
                valid: false,
                value
            })
        }
    }

    render() {
        // destructure state
        const {
            valid,
            value
        } = this.state

        return (
            <div className="row">
                <div className={`input-field col s12 ${valid ? null : 'invalid-recipe-description'}`}>
                    <textarea
                        className='materialize-textarea'
                        name="description"
                        onChange={this.handleChange}
                        placeholder="Description"
                        value={value}
                    >
                    </textarea>
                </div>
            </div>
        )
    }
}

export default CreateRecipeDescription

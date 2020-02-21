import React, { Component } from 'react'

class CreateRecipeTitle extends Component {
    state = {
        valid: true,
        value: ''
    }

    handleChange = e => {
        // get user input
        const { value } = e.target

        // destructure props
        const { recipeTitle } = this.props

        // add title if value exists
        if (value) {
            // add title to recipe
            recipeTitle(value)

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
                <div className={`input-field col s12 ${valid ? null : 'invalid-recipe-title'}`}>
                    <input
                        name="title"
                        onChange={this.handleChange}
                        placeholder="Title"
                        type='text'
                        value={value}
                    />
                </div>
            </div>
        )
    }
}

export default CreateRecipeTitle

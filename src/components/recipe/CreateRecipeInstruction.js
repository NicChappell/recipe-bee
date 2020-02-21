import React, { Component } from 'react'
import { v4 as uuid } from 'uuid'

class CreateRecipeInstruction extends Component {
    state = {
        valid: true,
        value: ''
    }

    handleChange = e => {
        // get user input
        const { value } = e.target

        // update state
        this.setState({
            valid: true,
            value
        })
    }

    handleClick = () => {
        // generate unique id
        const id = uuid()

        // destructure state
        const { value } = this.state

        // destructure props
        const { addInstruction } = this.props

        // add instruction if value exists
        if (value) {
            // create new instruction object
            const newInstruction = { id, value }

            // add new instruction to recipe
            addInstruction(newInstruction)

            // reset state
            this.setState({
                valid: true,
                value: ''
            })
        } else {
            // prompt user to provide valid input
            this.setState({
                ...this.state,
                valid: false
            })
        }

    }

    render() {
        // destructure state
        const {
            valid,
            value
        } = this.state

        // destructure props
        const { index } = this.props

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
                            onChange={this.handleChange}
                            placeholder={valid ? 'Instruction' : 'Instruction is required' }
                            value={value}
                        >
                        </textarea>
                    </div>
                </div>
                <div className="col s2 buttons">
                    <button className="btn orange lighten-2" onClick={this.handleClick}>
                        <i className="black-text material-icons">add</i>
                    </button>
                </div>
            </div>
        )
    }
}

export default CreateRecipeInstruction

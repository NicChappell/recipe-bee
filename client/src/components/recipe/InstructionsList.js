import React, { Component } from 'react'

import EditButtons from './EditButtons'

class InstructionsList extends Component {
    state = {
        disabled: true,
        valid: true,
        value: this.props.instruction.value
    }

    handleChange = e => {
        // get user input
        const { value } = e.target

        // update state
        this.setState({
            ...this.state,
            valid: true,
            value
        })
    }

    handleDeleteClick = () => {
        // destructure props
        const {
            deleteInstruction,
            instruction
        } = this.props

        // delete instruction from recipe
        deleteInstruction(instruction)
    }

    handleEditClick = () => {
        // update state
        this.setState({
            ...this.state,
            disabled: false
        })
    }

    handleUpdateClick = () => {
        // destructure state
        const { value } = this.state

        // destructure props
        const {
            instruction,
            updateInstruction
        } = this.props

        // update instruction if value exists
        if (value) {
            // create updated instruction object
            const updatedInstruction = {
                ...instruction,
                value
            }

            // update instruction in recipe
            updateInstruction(updatedInstruction)

            // reset state
            this.setState({
                ...this.state,
                disabled: true,
                valid: true
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
            disabled,
            valid,
            value,
        } = this.state

        // destructure props
        const { index } = this.props

        return (
            <div className="row instruction">
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
                                name="instruction"
                                onChange={this.handleChange}
                                placeholder={valid ? 'Instruction' : 'Instruction is required'}
                                value={value}
                            >
                            </textarea>
                        </div>
                    </div>
                </div>
                <EditButtons
                    disabled={disabled}
                    handleEditClick={this.handleEditClick}
                    handleDeleteClick={this.handleDeleteClick}
                    handleUpdateClick={this.handleUpdateClick}
                />
            </div>
        )
    }
}

export default InstructionsList

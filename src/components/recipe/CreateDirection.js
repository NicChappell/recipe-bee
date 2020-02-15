import React, { Component } from 'react'
import { v4 as uuid } from 'uuid'

const InvalidDirection = () => <span className="deep-orange-text text-lighten-2">Direction Is Required</span>

class CreateDirection extends Component {
    state = {
        addDirectionError: false,
        instruction: ''
    }

    handleChange = e => {
        const { value } = e.target

        this.setState({
            addDirectionError: false,
            instruction: value
        })
    }

    handleClick = e => {
        e.preventDefault()

        const id = uuid()

        const {
            addDirectionError,
            instruction
        } = this.state

        const { addDirection } = this.props

        if (instruction) {
            const newDirection = { id, instruction }
            addDirection(newDirection)

            this.setState({
                addDirectionError,
                instruction: '',
            })
        } else {
            this.setState({
                ...this.state,
                addDirectionError: true
            })
        }

    }

    render() {
        const {
            addDirectionError,
            instruction
        } = this.state

        const {
            addDirection,
            index
        } = this.props

        return (
            <div className="row direction">
                <div className="col s10">
                    <div className="input-field col s1">
                        <p className="center-align">
                            <b>{`${index})`}</b>
                        </p>
                    </div>
                    <div className="input-field col s11">
                        <textarea
                            className='materialize-textarea'
                            name="instruction"
                            onChange={this.handleChange}
                            placeholder="Instruction"
                            value={instruction}
                        >
                        </textarea>
                        {addDirectionError ? <InvalidDirection /> : null}
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

export default CreateDirection

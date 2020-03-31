import React, { Component } from 'react'
import { v4 as uuid } from 'uuid'

import {
    quantities,
    units,
} from '../../helpers/recipe'

class CreateRecipeIngredient extends Component {
    state = {
        nameValid: true,
        nameValue: '',
        quantityValid: true,
        quantityValue: '',
        unitValid: true,
        unitValue: ''
    }

    handleChange = e => {
        // concatenate valid property from user input
        const valid = `${e.target.name}Valid`
        // concatenate value property from user input
        const value = `${e.target.name}Value`

        // update state
        this.setState({
            ...this.state,
            [valid]: true,
            [value]: e.target.value
        })
    }

    handleClick = () => {
        // generate unique id
        const id = uuid()

        // destructure state
        const {
            nameValue,
            quantityValue,
            unitValue
        } = this.state

        // destructure props
        const { addIngredient } = this.props

        // add ingredient if name and quantity values exist
        if (nameValue && quantityValue) {
            // create new ingredient object
            const newIngredient = {
                id,
                name: nameValue,
                quantity: quantityValue,
                unit: unitValue
            }

            // add new ingredient to recipe
            addIngredient(newIngredient)

            // reset state
            this.setState({
                nameValid: true,
                nameValue: '',
                quantityValid: true,
                quantityValue: '',
                unitValid: true,
                unitValue: ''
            })
        } else if (nameValue && !quantityValue) {
            // prompt user to provide valid input
            this.setState({
                ...this.state,
                nameValid: true,
                quantityValid: false
            })
        } else if (!nameValue && quantityValue) {
            // prompt user to provide valid input
            this.setState({
                ...this.state,
                nameValid: false,
                quantityValid: true
            })
        } else {
            // prompt user to provide valid input
            this.setState({
                ...this.state,
                nameValid: false,
                quantityValid: false
            })
        }

    }

    render() {
        // destructure state
        const {
            nameValid,
            nameValue,
            quantityValid,
            quantityValue,
            unitValid,
            unitValue
        } = this.state

        // destructure props
        const { index } = this.props

        return (
            <div className="row ingredient">
                <div className="col s10">
                    <div className="row">
                        <div className="input-field col s1 l1">
                            <p className="center-align">
                                <b>{`${index})`}</b>
                            </p>
                        </div>
                        <div className={`input-field col s3 l2 ${quantityValid ? null : 'invalid-input'}`}>
                            <select
                                className='browser-default'
                                name="quantity"
                                onChange={this.handleChange}
                                value={quantityValue}
                            >
                                {quantities.map(quantity => <option key={quantity} value={quantity}>{quantity}</option>)}
                            </select>
                        </div>
                        <div className={`input-field col s8 l3 ${unitValid ? null : 'invalid-input'}`}>
                            <select
                                className='browser-default'
                                name="unit"
                                onChange={this.handleChange}
                                value={unitValue}
                            >
                                {units.map(unit => <option key={unit} value={unit}>{unit}</option>)}
                            </select>
                        </div>
                        <div className={`input-field col s12 l6 ${nameValid ? null : 'invalid-input'}`}>
                            <input
                                name="name"
                                onChange={this.handleChange}
                                placeholder={nameValid ? 'Ingredient' : 'Ingredient is required'}
                                type='text'
                                value={nameValue}
                            />
                        </div>
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

export default CreateRecipeIngredient

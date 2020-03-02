import React, { Component } from 'react'

import DeleteEditUpdateButtons from './DeleteEditUpdateButtons'

import {
    quantities,
    units,
} from '../../helpers/recipe'

class IngredientsList extends Component {
    state = {
        disabled: true,
        nameValid: true,
        nameValue: this.props.ingredient.name,
        quantityValid: true,
        quantityValue: this.props.ingredient.quantity,
        unitValid: true,
        unitValue: this.props.ingredient.unit
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

    handleDeleteClick = () => {
        // destructure props
        const {
            deleteIngredient,
            ingredient
        } = this.props

        // delete ingredient from recipe
        deleteIngredient(ingredient)
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
        const {
            nameValue,
            quantityValue,
            unitValue
        } = this.state

        // destructure props
        const {
            ingredient,
            updateIngredient
        } = this.props

        // update ingredient if name and quantity values exist
        if (nameValue && quantityValue) {
            // create updated ingredient object
            const updatedIngredient = {
                ...ingredient,
                name: nameValue,
                quantity: quantityValue,
                unit: unitValue
            }

            // update new ingredient to recipe
            updateIngredient(updatedIngredient)

            // reset state
            this.setState({
                ...this.state,
                disabled: true,
                nameValid: true,
                quantityValid: true,
                unitValid: true
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
            disabled,
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
                    <div className="row mb-0">
                        <div className="input-field col s1 l1">
                            <p className="center-align">
                                <b>{`${index + 1})`}</b>
                            </p>
                        </div>
                        <div className={`input-field col s3 l2 ${quantityValid ? null : 'invalid-input'}`}>
                            <select
                                className='browser-default'
                                disabled={disabled}
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
                                disabled={disabled}
                                name="unit"
                                onChange={this.handleChange}
                                value={unitValue}
                            >
                                {units.map(unit => <option key={unit} value={unit}>{unit}</option>)}
                            </select>
                        </div>
                        <div className={`input-field col s12 l6 ${nameValid ? null : 'invalid-input'}`}>
                            <input
                                disabled={disabled}
                                name="name"
                                onChange={this.handleChange}
                                placeholder={nameValid ? 'Ingredient' : 'Ingredient is required'}
                                type='text'
                                value={nameValue}
                            />
                        </div>
                    </div>
                </div>
                <DeleteEditUpdateButtons
                    disabled={disabled}
                    handleEditClick={this.handleEditClick}
                    handleDeleteClick={this.handleDeleteClick}
                    handleUpdateClick={this.handleUpdateClick}
                />
            </div>
        )
    }
}

export default IngredientsList

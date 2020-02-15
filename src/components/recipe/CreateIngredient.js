import React, { Component } from 'react'
import { v4 as uuid } from 'uuid'

const InvalidName = () => <span className="deep-orange-text text-lighten-2">Ingredient Name Is Required</span>
const InvalidQuantity = () => <span className="deep-orange-text text-lighten-2">Quantity Is Required</span>

class CreateIngredient extends Component {
    state = {
        addIngredientErrors: {
            quantity: false,
            name: false
        },
        name: '',
        quantity: '',
        unit: ''
    }

    handleChange = e => {
        const {
            name,
            value
        } = e.target

        const addIngredientErrors = this.state.addIngredientErrors
        addIngredientErrors[name] = false

        this.setState({
            addIngredientErrors, 
            [name]: value
        })
    }

    handleClick = e => {
        e.preventDefault()

        const id = uuid()

        const {
            addIngredientErrors,
            name,
            quantity,
            unit
        } = this.state

        const { addIngredient } = this.props

        if (name && quantity) {
            const newIngredient = { id, name, quantity, unit }
            addIngredient(newIngredient)
    
            this.setState({
                addIngredientErrors,
                name: '',
                quantity: '',
                unit: ''
            })
        } else if (name && !quantity) {
            this.setState({
                ...this.state,
                addIngredientErrors: {
                    quantity: true,
                    name: false
                }
            })
        } else if (!name && quantity) {
            this.setState({
                ...this.state,
                addIngredientErrors: {
                    quantity: false,
                    name: true
                }
            })
        } else {
            this.setState({
                ...this.state,
                addIngredientErrors: {
                    quantity: true,
                    name: true
                }
            })
        }

    }

    render() {
        const {
            addIngredientErrors,
            name,
            quantity,
            unit
        } = this.state

        const {
            index,
            quantities,
            units
        } = this.props

        return (
            <div className="row ingredient">
                <div className="col s10">
                    <div className="row">
                        <div className="input-field col s1 l1">
                            <p className="center-align">
                                <b>{`${index})`}</b>
                            </p>
                        </div>
                        <div className="input-field col s3 l2">
                            <select
                                className='browser-default'
                                name="quantity"
                                onChange={this.handleChange}
                                value={quantity}
                            >
                                {quantities.map(quantity => <option key={quantity} value={quantity}>{quantity}</option>)}
                            </select>
                            {addIngredientErrors.quantity ? <InvalidQuantity /> : null}
                        </div>
                        <div className="input-field col s8 l3">
                            <select
                                className='browser-default'
                                name="unit"
                                onChange={this.handleChange}
                                value={unit}
                            >
                                {units.map(unit => <option key={unit} value={unit}>{unit}</option>)}
                            </select>
                        </div>
                        <div className="input-field col s12 l6">
                            <input
                                name="name"
                                onChange={this.handleChange}
                                placeholder="Ingredient Name"
                                type='text'
                                value={name}
                            />
                            {addIngredientErrors.name ? <InvalidName /> : null}
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

export default CreateIngredient

// import dependencies
import React, { useEffect, useState } from 'react'
import PropTypes from 'prop-types'

// import components
import EditButtons from './EditButtons'

// import data
import {
	quantities,
	units,
} from '../../data/recipe'

// import custom hooks
import {
	useSelectValue,
	useValidSelectValue,
	useValidTextValue
} from '../../helpers/customHooks'

const RecipeIngredientsListItem = props => {
	// state hook variables
	const [modify, setModify] = useState(false)

	// destructure props
	const {
		deleteIngredient,
		index,
		ingrObj,
		updateIngredient
	} = props

	// custom hook variables
	const quantity = useValidSelectValue(ingrObj.quantity)
	const unit = useSelectValue(ingrObj.unit)
	const name = useValidTextValue(ingrObj.name)

	const handleDeleteClick = () => deleteIngredient(ingrObj)

	const handleEditClick = () => setModify(true)

	const handleUpdateClick = () => {
		if (quantity.valid && name.valid) {
			// create updated ingredient object
			const updatedIngrObj = {
				...ingrObj,
				name: name.value,
				quantity: quantity.value,
				unit: unit.value
			}

			// update ingredient in recipe
			updateIngredient(updatedIngrObj)

			// update state
			setModify(false)
		}
	}

	return (
		<div className="row list-item mt-1">
			<div className="col s8 m9 l10">
                <div className="row">
					<div className="col s2 l1 index">
						<p>{`${index + 1})`}</p>
					</div>
					<div className="col s10 l11">
						<div className="row">
							<div className={`input-field col s5 l2 ${quantity.valid ? '' : 'invalid-input'}`}>
								<select
									{...quantity}
									disabled={!modify}
									name="quantity"
								>
									<option disabled value=""></option>
									{quantities && quantities.map(quantity => <option key={quantity} value={quantity}>{quantity}</option>)}
								</select>
								{index === 0 ? <label>Quantity</label> : null}
							</div>
							<div className="input-field col s7 l4">
								<select
									{...unit}
									disabled={!modify}
									name="unit"
								>
									<option value=""></option>
                                    {units && units.map(unit => {
                                        if (unit === 'Volume' || unit === 'Mass') {
                                            return <option disabled key={unit} value={unit}>{unit}</option>
                                        }
                                        return <option key={unit} value={unit}>{unit}</option>
                                    })}
								</select>
								{index === 0 ? <label>Unit</label> : null}
							</div>
							<div className={`input-field col s12 l6 ${name.valid ? '' : 'invalid-input'}`}>
								<input
									{...name}
									disabled={!modify}
									name="name"
									placeholder={name.valid ? 'Name' : 'Name is required'}
								/>
							</div>
						</div>
					</div>
				</div>
			</div>
			<EditButtons
				handleDeleteClick={handleDeleteClick}
				handleEditClick={handleEditClick}
				handleUpdateClick={handleUpdateClick}
				modify={modify}
				valid={quantity.valid && name.valid}
			/>
		</div>
	)
}

RecipeIngredientsListItem.propTypes = {
	deleteIngredient: PropTypes.func,
	index: PropTypes.number,
	ingrObj: PropTypes.object,
	updateIngredient: PropTypes.func
}

export default RecipeIngredientsListItem

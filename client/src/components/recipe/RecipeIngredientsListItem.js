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
		<div className="row ingredient">
			<div className="col s8 m9 l10">
				<div className="row">
					<div className="col s2 l1 index">
						<p>{`${index + 1})`}</p>
					</div>
					<div className={`input-field col s3 l2 ${quantity.valid ? '' : 'invalid-input'}`}>
						<select
							{...quantity}
							disabled={!modify}
							name="quantity"
						>
							{quantities && quantities.map(quantity => <option key={quantity} value={quantity}>{quantity}</option>)}
						</select>
					</div>
					<div className={'input-field col s7 l3'}>
						<select
							{...unit}
							disabled={!modify}
							name="unit"
						>
							{units && units.map(unit => <option key={unit} value={unit}>{unit}</option>)}
						</select>
					</div>
					<div className={`input-field col s12 l6 ${name.valid ? '' : 'invalid-input'}`}>
						<input
							{...name}
							disabled={!modify}
							name="name"
							placeholder={name.valid ? 'Ingredient' : 'Ingredient is required'}
						/>
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
	deleteIngredient: PropTypes.func.isRequired,
	index: PropTypes.number.isRequired,
	ingrObj: PropTypes.object.isRequired,
	updateIngredient: PropTypes.func.isRequired
}

export default RecipeIngredientsListItem

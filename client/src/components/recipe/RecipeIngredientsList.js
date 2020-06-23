// import dependencies
import React, { useEffect } from 'react'
import PropTypes from 'prop-types'

// import components
import RecipeIngredientsListItem from './RecipeIngredientsListItem'

const RecipeIngredientsList = props => {
	// destructure props
	const {
		initValue: initList,
		liftState,
		ingredients
	} = props

	const deleteIngredient = ingrObj => {
		// filter target ingredient from ingredients array
		const filteredIngredients = ingredients.filter(obj => obj.id !== ingrObj.id)

		// lift state
		liftState(filteredIngredients)
	}

	const updateIngredient = ingrObj => {
		// find index of target ingredient in ingredients array
		const index = ingredients.findIndex(obj => obj.id === ingrObj.id)

		// make a mutable copy of ingredients array
		const updatedIngredients = ingredients

		// update target ingredient in ingredients array
		updatedIngredients[index] = ingrObj

		// lift state
		liftState(updatedIngredients)
	}

	// lift state when initial value changes
	useEffect(() => {
		initList && liftState(initList)
		// eslint-disable-next-line react-hooks/exhaustive-deps
	}, [initList])

	return (
		<div className={`row ${ingredients && ingredients.length > 0 ? 'list' : ''}`}>
			<div className="col s12">
				{ingredients && ingredients.map((ingrObj, index) => (
					<RecipeIngredientsListItem
						deleteIngredient={deleteIngredient}
						index={index}
						key={ingrObj.id}
						ingrObj={ingrObj}
						updateIngredient={updateIngredient}
					/>
				))}
			</div>
		</div>
	)
}

RecipeIngredientsList.propTypes = {
	initValue: PropTypes.array,
	liftState: PropTypes.func,
	ingredients: PropTypes.array
}

export default RecipeIngredientsList

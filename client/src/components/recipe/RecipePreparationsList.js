// import dependencies
import React from 'react'
import PropTypes from 'prop-types'

// import components
import RecipePreparationsListItem from './RecipePreparationsListItem'

const RecipePreparationsList = props => {
	// destructure props
	const {
		liftState,
		preparations,
	} = props

	const deletePreparation = prepObj => {
		// filter target preparation from preparations array
		const filteredPreparations = preparations.filter(obj => obj.id !== prepObj.id)

		// lift state
		liftState(filteredPreparations)
	}

	const updatePreparation = prepObj => {
		// find index of target preparation in preparations array
		const index = preparations.findIndex(obj => obj.id === prepObj.id)

		// make a mutable copy of preparations array
		const updatedPreparations = preparations

		// update target preparation in preparations array
		updatedPreparations[index] = prepObj

		// lift state
		liftState(updatedPreparations)
	}

	return (
		<div className={`row ${preparations && preparations.length > 0 ? 'preparations-list' : null}`}>
			<div className="col s12">
				{preparations && preparations.map((prepObj, index) => (
					<RecipePreparationsListItem
						deletePreparation={deletePreparation}
						index={index}
						key={prepObj.id}
						prepObj={prepObj}
						updatePreparation={updatePreparation}
					/>
				))}
			</div>
		</div>
	)
}

RecipePreparationsList.propTypes = {
	liftState: PropTypes.func.isRequired,
	preparations: PropTypes.array.isRequired
}

export default RecipePreparationsList

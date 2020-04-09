// import dependencies
import React from 'react'
import PropTypes from 'prop-types'

// import components
import RecipeInstructionsListItem from './RecipeInstructionsListItem'

const RecipeInstructionsList = props => {
	// destructure props
	const {
		liftState,
		instructions,
	} = props

	const deleteInstruction = instObj => {
		// filter target instruction from instructions array
		const filteredInstructions = instructions.filter(obj => obj.id !== instObj.id)

		// lift state
		liftState(filteredInstructions)
	}

	const updateInstruction = instObj => {
		// find index of target instruction in instructions array
		const index = instructions.findIndex(obj => obj.id === instObj.id)

		// make a mutable copy of instructions array
		const updatedInstructions = instructions

		// update target instruction in instructions array
		updatedInstructions[index] = instObj

		// lift state
		liftState(updatedInstructions)
	}

	return (
		<div className={`row ${instructions && instructions.length > 0 ? 'instructions-list' : null}`}>
			<div className="col s12">
				{instructions && instructions.map((instObj, index) => (
					<RecipeInstructionsListItem
						deleteInstruction={deleteInstruction}
						index={index}
						key={instObj.id}
						instObj={instObj}
						updateInstruction={updateInstruction}
					/>
				))}
			</div>
		</div>
	)
}

RecipeInstructionsList.propTypes = {
	liftState: PropTypes.func.isRequired,
	instructions: PropTypes.array.isRequired
}

export default RecipeInstructionsList

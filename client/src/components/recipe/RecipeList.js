// import dependencies
import React from 'react'
import PropTypes from 'prop-types'

// import components
import RecipeListItem from './RecipeListItem'

const RecipeList = props => {
	// destructure props
	const {
		liftState,
		list,
		placeholder
	} = props

	const deleteObject = listObj => {
		// filter target object from list
		const filteredList = list.filter(obj => obj.id !== listObj.id)

		// lift state
		liftState(filteredList)
	}

	const updateObject = listObj => {
		// find index of target object in list
		const index = list.findIndex(obj => obj.id === listObj.id)

		// make a mutable copy of list
		const updatedInstructions = list

		// update target object in list
		updatedInstructions[index] = listObj

		// lift state
		liftState(updatedInstructions)
	}

	return (
		<div className={`row ${list && list.length > 0 ? 'list-list' : null}`}>
			<div className="col s12">
				{list && list.map((listObj, index) => (
					<RecipeListItem
						deleteObject={deleteObject}
						index={index}
						key={listObj.id}
						listObj={listObj}
						placeholder={placeholder}
						updateObject={updateObject}
					/>
				))}
			</div>
		</div>
	)
}

RecipeList.propTypes = {
	liftState: PropTypes.func,
	list: PropTypes.array,
	placeholder: PropTypes.string
}

export default RecipeList

// import dependencies
import React, { useEffect, useState } from 'react'
import PropTypes from 'prop-types'

// import components
import EditButtons from './EditButtons'

// import custom hooks
import { useValidTextAreaValue } from '../../helpers/customHooks'

const RecipeInstructionsListItem = props => {
	// state hook variables
	const [modify, setModify] = useState(false)

	// destructure props
	const {
		deleteInstruction,
		index,
		instObj,
		updateInstruction
	} = props

	// custom hook variables
	const textArea = useValidTextAreaValue(instObj.value)

	const handleDeleteClick = () => deleteInstruction(instObj)

	const handleEditClick = () => setModify(true)

	const handleUpdateClick = () => {
		if (textArea.valid) {
			// create updated instruction object
			const updatedInstObj = {
				...instObj,
				value: textArea.value
			}

			// update instruction in recipe
			updateInstruction(updatedInstObj)

			// update state
			setModify(false)
		}
	}

	return (
		<div className="row instruction">
			<div className="col s8 m9 l10">
				<div className="row">
					<div className="col s2 m1 index">
						<p>{`${index + 1})`}</p>
					</div>
					<div className={`input-field col s10 m11 ${textArea.valid ? '' : 'invalid-input'}`}>
						<textarea
							{...textArea}
							disabled={!modify}
							name="instruction"
							placeholder={textArea.valid ? 'Instruction' : 'Instruction is required'}
						>
						</textarea>
					</div>
				</div>
			</div>
			<EditButtons
				handleDeleteClick={handleDeleteClick}
				handleEditClick={handleEditClick}
				handleUpdateClick={handleUpdateClick}
				modify={modify}
				valid={textArea.valid}
			/>
		</div>
	)
}

RecipeInstructionsListItem.propTypes = {
	deleteInstruction: PropTypes.func.isRequired,
	index: PropTypes.number.isRequired,
	instObj: PropTypes.object.isRequired,
	updateInstruction: PropTypes.func.isRequired
}

export default RecipeInstructionsListItem

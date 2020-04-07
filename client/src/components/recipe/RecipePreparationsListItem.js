// import dependencies
import React, { useEffect, useState } from 'react'
import PropTypes from 'prop-types'

// import components
import EditButtons from './EditButtons'

// import custom hooks
import { useValidTextAreaValue } from '../../helpers/customHooks'

const RecipePreparationsListItem = props => {
	// state hook variables
	const [modify, setModify] = useState(false)

	// destructure props
	const {
		deletePreparation,
		index,
		prepObj,
		updatePreparation
	} = props

	// custom hook variables
	const textArea = useValidTextAreaValue(prepObj.value)

	const handleDeleteClick = () => deletePreparation(prepObj)

	const handleEditClick = () => setModify(true)

	const handleUpdateClick = () => {
		if (textArea.valid) {
			// create updated preparation object
			const updatedPrepObj = {
				...prepObj,
				value: textArea.value
			}

			// update preparation in recipe
			updatePreparation(updatedPrepObj)

			// update state
			setModify(false)
		}
	}

	// useEffect(() => {
	// 	textArea.valid
	// 		? setModify(true)
	// 		: setModify(false)
	// }, [textArea.valid])

	return (
		<div className="row preparation">
			<div className="col s8 m9 l10">
				<div className="row">
					<div className="col s2 m1 index">
						<p>{`${index + 1})`}</p>
					</div>
					<div className={`input-field col s10 m11 ${textArea.valid ? '' : 'invalid-input'}`}>
						<textarea
							{...textArea}
							disabled={!modify}
							name="preparation"
							placeholder={textArea.valid ? 'Preparation' : 'Preparation is required'}
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

RecipePreparationsListItem.propTypes = {
	deletePreparation: PropTypes.func.isRequired,
	index: PropTypes.number.isRequired,
	prepObj: PropTypes.object.isRequired,
	updatePreparation: PropTypes.func.isRequired
}

export default RecipePreparationsListItem

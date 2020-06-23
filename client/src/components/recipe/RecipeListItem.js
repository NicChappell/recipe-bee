// import dependencies
import React, { useState } from 'react'
import PropTypes from 'prop-types'

// import components
import EditButtons from './EditButtons'

// import custom hooks
import { useValidTextAreaValue } from '../../helpers/customHooks'

const RecipeListItem = props => {
	// state hook variables
	const [modify, setModify] = useState(false)

	// destructure props
	const {
		deleteObject,
		index,
		listObj,
		placeholder,
		updateObject
	} = props

	// custom hook variables
	const textArea = useValidTextAreaValue(listObj.value)

	const handleDeleteClick = () => deleteObject(listObj)

	const handleEditClick = () => setModify(true)

	const handleUpdateClick = () => {
		if (textArea.valid) {
			// create updated instruction object
			const updatedObject = {
				...listObj,
				value: textArea.value
			}

			// update instruction in recipe
			updateObject(updatedObject)

			// update state
			setModify(false)
		}
	}

	return (
		<div className="row list-item">
			<div className="col s8 m9 l10">
				<div className="row">
					<div className="col s2 m1 index">
						<p>{`${index + 1})`}</p>
					</div>
					<div className={`input-field col s10 m11 ${textArea.valid ? '' : 'invalid-input'}`}>
						<textarea
							className={textArea.className}
							onBlur={textArea.handleBlur}
							onChange={textArea.handleChange}
							onFocus={textArea.handleFocus}
							disabled={!modify}
							placeholder={placeholder}
							value={textArea.value}
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

RecipeListItem.propTypes = {
	deleteObject: PropTypes.func,
	index: PropTypes.number,
	listObj: PropTypes.object,
	placeholder: PropTypes.string,
	updateObject: PropTypes.func
}

export default RecipeListItem

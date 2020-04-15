// import dependencies
import React, { useEffect, useReducer } from 'react'
import PropTypes from 'prop-types'
import { v4 as uuid } from 'uuid'

const initialState = {
	valid: true,
	value: ''
}

const reducer = (state, action) => {
	switch (action.type) {
		case 'changeValue':
			return {
				...state,
				value: action.value
			}
		case 'validate':
			return {
				...state,
				valid: action.value
			}
		case 'resetState':
			return initialState
		default:
			return state
	}
}

const RecipeAddListItem = props => {
	// destructure props
	const {
		errors,
		index,
		listItems,
		liftState,
		name,
		placeholder,
		resolveErrors
	} = props

	// reducer hook variables
	const [state, dispatch] = useReducer(reducer, initialState)

	// destructure state
	const {
		valid,
		value
	} = state

	const handleChange = e => {
		// destructure event
		const { value } = e.target

		// update state
		dispatch({ type: 'changeValue', value })
	}

	const handleClick = () => {
		// generate unique id
		const id = uuid()

		// create list item object
		const newListItem = {
			id,
			value
		}

		// lift state
		liftState([...listItems, newListItem])

		// reset state
		dispatch({ type: 'resetState' })
	}

	const handleFocus = () => {
		dispatch({ type: 'validate', value: true })
		resolveErrors(name)
	}

	// update state when errors value changes
	useEffect(() => {
		if (errors[name]) {
			dispatch({ type: 'validate', value: false })
		}
	}, [errors[name]])

	return (
		<div className="row list-item">
			<div className="col s8 m9 l10">
				<div className="row">
					<div className="col s2 m1 index">
						<p>{`${index + 1})`}</p>
					</div>
					<div className={`input-field col s10 m11 ${!valid ? 'invalid-input' : ''}`}>
						<textarea
							className="materialize-textarea"
							name={name}
							onChange={handleChange}
							onFocus={handleFocus}
							placeholder={placeholder}
							value={value}
						>
						</textarea>
						{!valid ? <span className="error-message">{errors[name]}</span> : null}
					</div>
				</div>
			</div>
			<div className="col s4 m3 l2 buttons">
				<button className="btn orange lighten-2" disabled={!value} onClick={handleClick}>
					<i className="black-text material-icons">add</i>
				</button>
			</div>
		</div>
	)
}

RecipeAddListItem.propTypes = {
	errors: PropTypes.object,
	index: PropTypes.number,
	liftState: PropTypes.func,
	listItems: PropTypes.array,
	placeholder: PropTypes.string,
	resolveErrors: PropTypes.func
}

export default RecipeAddListItem

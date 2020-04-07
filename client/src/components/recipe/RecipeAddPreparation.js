import React, { useReducer } from 'react'
import PropTypes from 'prop-types'
import { v4 as uuid } from 'uuid'

const initialState = {
	active: false,
	valid: false,
	value: ''
}

const reducer = (state, action) => {
	switch (action.type) {
		case 'changeValue':
			return {
				active: true,
				valid: action.value ? true : false,
				value: action.value
			}
		case 'deactivate':
			return {
				...state,
				active: false
			}
		case 'resetState':
			return initialState
		default:
			return state
	}
}

const RecipeAddPreparation = props => {
	// reducer hook variables
	const [state, dispatch] = useReducer(reducer, initialState)

	// destructure state
	const {
		active,
		valid,
		value
	} = state

	// destructure props
	const {
		index,
		liftState,
		preparations
	} = props

	const handleBlur = () => dispatch({ type: 'deactivate' })

	const handleChange = e => {
		// destructure event
		const { value } = e.target

		// update user input
		dispatch({ type: 'changeValue', value })
	}

	const handleClick = () => {
		// generate unique id
		const id = uuid()

		// create preparation object
		const prepObj = {
			id,
			value
		}

		// lift state
		liftState([...preparations, prepObj])

		// reset state
		dispatch({ type: 'resetState' })
	}

	return (
		<div className="row preparation">
			<div className="col s8 m9 l10">
				<div className="row">
					<div className="col s2 m1 index">
						<p>{`${index + 1})`}</p>
					</div>
					<div className={`input-field col s10 m11 ${valid || !active ? '' : 'invalid-input'}`}>
						<textarea
							className="materialize-textarea"
							name="preparation"
							onBlur={handleBlur}
							onChange={handleChange}
							placeholder={valid || !active ? 'Preparation' : 'Preparation is required'}
							value={value}
						>
						</textarea>
					</div>
				</div>
			</div>
			<div className="col s4 m3 l2 buttons">
				<button className="btn orange lighten-2" disabled={!valid} onClick={handleClick}>
					<i className="black-text material-icons">add</i>
				</button>
			</div>
		</div>
	)
}

RecipeAddPreparation.propTypes = {
	index: PropTypes.number.isRequired,
	liftState: PropTypes.func.isRequired,
	valid: PropTypes.bool.isRequired,
	validate: PropTypes.func.isRequired
}

export default RecipeAddPreparation

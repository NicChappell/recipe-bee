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
		case 'changeInstruction':
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

const RecipeAddInstruction = props => {
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
		instructions
	} = props

	const handleBlur = () => dispatch({ type: 'deactivate' })

	const handleChange = e => {
		// destructure event
		const { value } = e.target

		// update user input
		dispatch({ type: 'changeInstruction', value })
	}

	const handleClick = () => {
		// generate unique id
		const id = uuid()

		// create instruction object
		const newInstruction = {
			id,
			value
		}

		// lift state
		liftState([...instructions, newInstruction])

		// reset state
		dispatch({ type: 'resetState' })
	}

	return (
		<div className="row instruction">
			<div className="col s8 m9 l10">
				<div className="row">
					<div className="col s2 m1 index">
						<p>{`${index + 1})`}</p>
					</div>
					<div className={`input-field col s10 m11 ${valid || !active ? '' : 'invalid-input'}`}>
						<textarea
							className="materialize-textarea"
							name="instruction"
							onBlur={handleBlur}
							onChange={handleChange}
							placeholder={valid || !active ? 'Instruction' : 'Instruction is required'}
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

RecipeAddInstruction.propTypes = {
	index: PropTypes.number.isRequired,
	liftState: PropTypes.func.isRequired,
	instructions: PropTypes.array.isRequired
}

export default RecipeAddInstruction

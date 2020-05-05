// import dependencies
import React, { useEffect, useState } from 'react'
import PropTypes from 'prop-types'

// import helper functions
import { formatTime } from '../../helpers/utilities'

const RecipeTime = props => {
	// destructure props
	const {
		errors,
		liftHours,
		liftMinutes,
		name,
		resolveErrors
	} = props

	// state hook variables
	const [hours, setHours] = useState(0)
	const [minutes, setMinutes] = useState(0)
	const [valid, setValid] = useState(true)

	const handleBlur = e => {
		// destructure event
		const {
			name,
			value
		} = e.target

		// updsate state
		if (name === 'hours') {
			setHours(value ? parseInt(value) : 0)
		} else {
			setMinutes(value ? parseInt(value) : 0)
		}
	}

	const handleChange = e => {
		// destructure event
		const {
			name,
			value
		} = e.target

		// updsate state
		if (name === 'hours') {
			if (value < 0) {
				setHours(0)
			} else if (value > 23) {
				setHours(23)
			} else {
				setHours(parseInt(value))
			}
		} else {
			if (value < 0) {
				setMinutes(0)
			} else if (value > 59) {
				setMinutes(59)
			} else {
				setMinutes(parseInt(value))
			}
		}
	}

	const handleFocus = () => {
		setValid(true)
		resolveErrors(name)
	}

	// update state when errors value changes
	useEffect(() => {
		if (errors[name]) {
			setValid(false)
		}
	}, [errors[name]])

	// lift hours when hours value changes
	useEffect(() => {
		liftHours(hours)
	}, [hours])

	// lift minutes when minutes value changes
	useEffect(() => {
		liftMinutes(minutes)
	}, [minutes])

	return (
		<div className="row time">
			<div className={`col s12 time-input ${!valid ? 'invalid-input' : ''}`}>
				<span>Hours:</span>
				<input
					onBlur={handleBlur}
					onChange={handleChange}
					onFocus={handleFocus}
					min="0"
					max="23"
					name="hours"
					type="number"
					value={hours}
				/>
				<input
					min="0"
					max="23"
					name="hours"
					onChange={handleChange}
					onFocus={handleFocus}
					type="range"
					value={hours}
				/>
			</div>
			<div className={`col s12 time-input ${!valid ? 'invalid-input' : ''}`}>
				<span>Minutes:</span>
				<input
					onBlur={handleBlur}
					onChange={handleChange}
					onFocus={handleFocus}
					min="0"
					max="59"
					name="minutes"
					type="number"
					value={minutes}
				/>
				<input
					min="0"
					max="59"
					name="minutes"
					onChange={handleChange}
					onFocus={handleFocus}
					type="range"
					value={minutes}
				/>
			</div>
			<div className="col s12 time-output">
				{formatTime(hours)}:{formatTime(minutes)}
			</div>
			{!valid ? <div className="col s12 error-message">{errors[name]}</div> : null}
		</div>
	)
}

RecipeTime.propTypes = {
    errorMessage: PropTypes.string,
	liftHours: PropTypes.func,
	liftMinutes: PropTypes.func,
	name: PropTypes.string,
	resolveErrors: PropTypes.func
}

export default RecipeTime
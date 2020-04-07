// import dependencies
import React, { useEffect, useState } from 'react'

// import custom hooks
import { useValidNumberValue } from '../../helpers/customHooks'

const RecipeTime = props => {
	// state hook variables
	const [blurredHours, setBlurredHours] = useState(false)
	const [blurredMinutes, setBlurredMinutes] = useState(false)
	const [hours, setHours] = useState(0)
	const [minutes, setMinutes] = useState(0)
	const [validHours, setValidHours] = useState(true)
	const [validMinutes, setValidMinutes] = useState(true)

	// // custom hook variables
	// const hours = useValidNumberValue(0)
	// const minutes = useValidNumberValue(0)

	// destructure props
	const {
		config,
		liftHours,
		liftMinutes,
	} = props

	const handleBlur = e => {
		// destructure event
		const {
			name,
			value
		} = e.target

		// updsate state
		if (name === 'hours') {
			setHours(value ? value : 0)
		} else {
			setMinutes(value ? value : 0)
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
				setHours(value)
			}
		} else {
			if (value < 0) {
				setMinutes(0)
			} else if (value > 59) {
				setMinutes(59)
			} else {
				setMinutes(value)
			}
		}
	}

	// update hours
	useEffect(() => {
		liftHours(hours.value)
		setValidHours(hours.valid)
	}, [hours.valid, hours.value])

	// update minutes
	useEffect(() => {
		liftMinutes(minutes.value)
		setValidMinutes(minutes.valid)
	}, [minutes.valid, minutes.value])

	return (
		<div className="row time">
			<div className="col s12">
				<div className="row">
					<div className="col s12">
						<h5>{config.name} Time</h5>
					</div>
				</div>
				<div className="row">
					<div className="col s12 time-input">
						<span>Hours:</span>
						<input
							onBlur={handleBlur}
							onChange={handleChange}
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
							type="range"
							value={hours}
						/>
					</div>
					<div className="col s12 time-input">
						<span>Minutes:</span>
						<input
							onBlur={handleBlur}
							onChange={handleChange}
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
							type="range"
							value={minutes}
						/>
					</div>
					<div className="col s12 time-output">
						{("00" + hours).slice(-2)}:{("00" + minutes).slice(-2)}
					</div>
				</div>
				<div className="row">
					<div className="col s12 center-align invalid-message">
						{validHours || validMinutes ? null : `${config.name} time is required`}
					</div>
				</div>
			</div>
		</div >
	)
}

export default RecipeTime

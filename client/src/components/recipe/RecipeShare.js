// import dependencies
import React, { useEffect, useState } from 'react'
import PropTypes from 'prop-types'
import isEmpty from 'lodash.isempty'

// import custom hooks
import { useCheckboxValue } from '../../helpers/customHooks'

const ShareSetting = props => {
	// destructure props
	const {
		errors,
		liftState,
		resolveErrors
	} = props

	// state hook variables
	const [valid, setValid] = useState(true)

	// custom hook variables
	const checkbox = useCheckboxValue(false)

    const handleFocus = () => {
        setValid(true)
        resolveErrors('share')
    }

	// update state when checked value changes
	useEffect(() => {
		liftState(checkbox.checked)
	}, [checkbox.checked])

	// update state when errors value changes
	useEffect(() => {
		isEmpty(errors) ? setValid(true) : setValid(false)
	}, [errors])

	return (
		<div className="row share">
			<div className="col s12">
				<div className="switch">
					<label>
						Off
						<input
							{...checkbox}
							onFocus={handleFocus}
						/>
						<span className="lever"></span>
						On
					</label>
				</div>
				{valid ? null : <span className="error-message">{errors.share}</span>}
			</div>
		</div>
	)
}

ShareSetting.propTypes = {
	errors: PropTypes.object,
	liftState: PropTypes.func,
	resolveErrors: PropTypes.func
}

export default ShareSetting

// import dependencies
import React, { useEffect, useState } from 'react'
import PropTypes from 'prop-types'
import isEmpty from 'lodash.isempty'

// import custom hooks
import { useCheckboxValue } from '../../helpers/customHooks'

const ShareSetting = ({ liftState }) => {
	// custom hook variables
	const checkbox = useCheckboxValue(false)

	// update state when checked value changes
	useEffect(() => {
		liftState(checkbox.checked)
	}, [checkbox.checked])

	return (
		<div className="row share">
			<div className="col s12">
				<div className="switch">
					<label>
						Off
						<input {...checkbox} />
						<span className="lever"></span>
						On
					</label>
				</div>
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

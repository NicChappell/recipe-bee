// import dependencies
import React, { useEffect, useState } from 'react'
import PropTypes from 'prop-types'

const ShareSetting = props => {
	// destructure props
	const {
		initValue: initShare,
		liftState
	} = props

	// state hook variables
	const [checked, setChecked] = useState(false)

	// update state when initial value changes
	useEffect(() => {
		if (initShare) {
			setChecked(initShare)
		}
	}, [initShare])

	// update state when checked value changes
	useEffect(() => {
		liftState(checked)
		// eslint-disable-next-line react-hooks/exhaustive-deps
	}, [checked])

	return (
		<div className="row share">
			<div className="col s12">
				<div className="switch">
					<label>
						Off
						<input
							onChange={() => setChecked(!checked)}
							type="checkbox"
							checked={checked}
						/>
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
	initValue: PropTypes.bool,
	liftState: PropTypes.func,
	resolveErrors: PropTypes.func
}

export default ShareSetting

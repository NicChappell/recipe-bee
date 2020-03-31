// import dependencies
import React, { useEffect } from 'react'
import PropTypes from 'prop-types'

// import custom hooks
import { useCheckboxValue } from '../../helpers/customHooks'

const ShareSetting = props => {
    // custom hook variables
    const checkbox = useCheckboxValue(false)

    // destructure props
    const {
        liftState,
        valid,
        validate
    } = props

    // update share setting
    useEffect(() => {
        liftState(checkbox.checked)
        validate(true)
    }, [checkbox.checked])

    return (
        <div className="row share">
            <div className="col s12">
                <span className="left mr-1">
                    <i className="material-icons left">share</i> Share
                </span>
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
    liftState: PropTypes.func.isRequired,
    valid: PropTypes.bool.isRequired,
    validate: PropTypes.func.isRequired
}

export default ShareSetting

// import dependencies
import React, { useEffect } from 'react'
import PropTypes from 'prop-types'

// import custom hooks
import { useCheckboxValue } from '../../helpers/customHooks'

const ShareSetting = ({ liftState }) => {
    // custom hook variables
    const checkbox = useCheckboxValue(false)

    // update share setting
    useEffect(() => {
        liftState(checkbox.checked)
    }, [checkbox.checked])

    return (
        <div className="share">
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
    )
}

ShareSetting.propTypes = { liftState: PropTypes.func.isRequired }

export default ShareSetting

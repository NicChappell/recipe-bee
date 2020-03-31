// import dependencies
import React, { useEffect, useState } from 'react'

// import custom hooks
import { useValidNumberValue } from '../../helpers/customHooks'

const CreateRecipeTime = props => {
    // state hook variables
    const [validHours, setValidHours] = useState(true)
    const [validMinutes, setValidMinutes] = useState(true)

    // custom hook variables
    const hours = useValidNumberValue(0)
    const minutes = useValidNumberValue(0)

    // destructure props
    const {
        liftHours,
        liftMinutes,
        type
    } = props

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
        <div className="row recipe-time">
            <div className="col s12">
                <h5>{type} Time</h5>
            </div>
            <div className={`input-field col s12 ${validHours || validMinutes ? null : 'invalid-input'}`}>
                <div className="row">
                    <div className="col s3 center-align">
                        <p>Hours:</p>
                    </div>
                    <div className="col s3">
                        <input
                            onBlur={hours.onBlur}
                            onChange={hours.onChange}
                            onFocus={hours.onFocus}
                            min="0"
                            name="hours"
                            type={hours.type}
                            value={hours.value}
                        />
                    </div>
                    <div className="col s3 center-align">
                        <p>Minutes:</p>
                    </div>
                    <div className="col s3">
                        <input
                            onBlur={minutes.onBlur}
                            onChange={minutes.onChange}
                            onFocus={minutes.onFocus}
                            min="0"
                            name="minutes"
                            type={minutes.type}
                            value={minutes.value}
                        />
                    </div>
                    {validHours || validMinutes
                        ? null
                        : <div className="col s12 invalid-message center-align">{type} time is required</div>
                    }
                </div>
            </div>
        </div>
    )
}

export default CreateRecipeTime

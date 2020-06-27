// import dependencies
import React, { useEffect } from 'react'
import PropTypes from 'prop-types'

// import custom hooks
import { useSelectValue } from '../../helpers/customHooks'

const DateRanges = props => {
    // destructure props
    const {
        context,
        initState,
        liftState,
    } = props

    // custom hook variables
    const dateRanges = useSelectValue(initState)

    // lift state when date ranges value changes
    useEffect(() => {
        liftState(dateRanges.value)
		// eslint-disable-next-line react-hooks/exhaustive-deps
    }, [dateRanges.value])

    return (
        <div className="date-ranges">
            <span>{context}</span>
            <select
                {...dateRanges}
                name="date-range"
            >
                <option value="1">day</option>
                <option value="7">week</option>
                <option value="30">month</option>
                <option value="365">year</option>
            </select>
        </div>
    )
}

DateRanges.propTypes = {
    context: PropTypes.string,
    initState: PropTypes.string,
    liftState: PropTypes.func
}

export default DateRanges

// import dependencies
import React, { useEffect, useState } from 'react'
import PropTypes from 'prop-types'

// import custom hooks
import { useTextAreaValue } from '../../helpers/customHooks'

const RecipeNotes = props => {
    // destructure props
    const {
        initValue: initNotes,
        liftState
    } = props

    // state hook variables
    const [notes, setNotes] = useState('')

    // update state when initial value changes
    useEffect(() => initNotes && setNotes(initNotes), [initNotes])

    // update state when value changes
    useEffect(() => liftState(notes), [notes])

    return (
        <div className="row notes">
            <div className="input-field col s12">
                <textarea
                    className="materialize-textarea"
                    onChange={e => setNotes(e.target.value)}
                    name="notes"
                    placeholder="Notes"
                    value={notes}
                >
                </textarea>
        </div>
        </div >
    )
}

RecipeNotes.propTypes = {
    initValue: PropTypes.string,
    liftState: PropTypes.func
}

export default RecipeNotes

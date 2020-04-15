// import dependencies
import React, { useEffect } from 'react'
import PropTypes from 'prop-types'

// import custom hooks
import { useTextAreaValue } from '../../helpers/customHooks'

const RecipeNotes = ({ liftState }) => {
    // custom hook variables
    const notes = useTextAreaValue('')

    // update state when value changes
    useEffect(() => {
        liftState(notes.value)
    }, [notes.value])

    return (
        <div className="row notes">
            <div className="input-field col s12">
                <textarea
                    {...notes}
                    name="notes"
                    placeholder="Notes"
                >
                </textarea>
            </div>
        </div>
    )
}

RecipeNotes.propTypes = { liftState: PropTypes.func }

export default RecipeNotes

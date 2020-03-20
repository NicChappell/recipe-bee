// import dependencies
import React, { useState } from 'react'
import PropTypes from 'prop-types'

// import components
import Suggestions from './Suggestions'

const Autocomplete = props => {
    // useState hook variables
    const [activeSuggestion, setActiveSuggestion] = useState(0)
    const [filteredSuggestions, setFilteredSuggestions] = useState([])
    const [showSuggestions, setShowSuggestions] = useState(false)
    const [userInput, setUserInput] = useState('')

    // destructure props
    const {
        options,
        liftState
    } = props

    const handleChange = e => {
        // destructure event
        const { value } = e.target

        // filter options array
        let filteredSuggestions = []
        if (value.length > 0) {
            filteredSuggestions = options.filter(opt => opt.toLowerCase().indexOf(value.toLowerCase()) > -1)
        } else {
            filteredSuggestions = []
        }

        // update state
        setActiveSuggestion(0)
        setFilteredSuggestions(filteredSuggestions)
        setShowSuggestions(filteredSuggestions.length > 0 ? true : false)
        setUserInput(value)
    }

    const handleClick = selection => {
        // lift state
        liftState(selection)

        // update state
        setActiveSuggestion(0)
        setFilteredSuggestions([])
        setShowSuggestions(false)
        setUserInput('')
    }

    const handleKeyDown = e => {
        // destructure event
        const { keyCode } = e

        // determine the selected suggestion
        const selectedSuggestion = filteredSuggestions[activeSuggestion]

        // update state
        if (keyCode === 13) { // return
            setActiveSuggestion(0)
            setFilteredSuggestions([])
            setShowSuggestions(false)
            setUserInput(selectedSuggestion ? selectedSuggestion : '')
        } else if (keyCode === 38) { // up arrow
            if (activeSuggestion === 0) {
                return
            }
            setActiveSuggestion(activeSuggestion - 1)
        } else if (keyCode === 40) { // down arrow
            if (filteredSuggestions.length === 0 || activeSuggestion === filteredSuggestions.length - 1) {
                return
            }
            setActiveSuggestion(activeSuggestion + 1)
        }
    }

    return (
        <div className="autocomplete">
            <div className="input-field">
                <i className="material-icons prefix">add_box</i>
                <input
                    autoComplete="off"
                    name="autocomplete"
                    onChange={handleChange}
                    onKeyDown={handleKeyDown}
                    placeholder="Tag Name"
                    type='text'
                    value={userInput}
                />
            </div>
            <Suggestions
                activeSuggestion={activeSuggestion}
                filteredSuggestions={filteredSuggestions}
                handleClick={handleClick}
                showSuggestions={showSuggestions}
                userInput={userInput}
            />
        </div>
    )
}

Autocomplete.propTypes = {
    options: PropTypes.array.isRequired
}

export default Autocomplete

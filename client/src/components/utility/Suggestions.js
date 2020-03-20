// import dependencies
import React from 'react'

const Suggestions = props => {
    // destructure props
    const {
        activeSuggestion,
        filteredSuggestions,
        handleClick,
        showSuggestions,
        userInput
    } = props

    if (showSuggestions && userInput) {
        return (
            <ul className="suggestions">
                {filteredSuggestions.length && filteredSuggestions.map((suggestion, index) => (
                    <li className={index === activeSuggestion ? 'active' : ''} key={suggestion} onClick={() => handleClick(suggestion)}>
                        {suggestion.toUpperCase()}
                    </li>
                ))}
            </ul>
        )
    }

    return null
}

export default Suggestions

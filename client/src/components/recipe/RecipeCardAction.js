// import dependencies
import React from 'react'

const RecipeCardAction = props => {
    // destructure props
    const {
        downVote,
        handleDownVoteClick,
        handleUpVoteClick,
        isAuthenticated,
        newCount,
        upVote
    } = props

    if (isAuthenticated) {
        return (
            <div className="card-action">
                <button className="btn-flat" onClick={handleUpVoteClick}>
                    <i className={`material-icons ${(upVote ? 'orange-text' : '')}`}>thumb_up</i>
                </button>
                <span className="vote-count">{newCount.toLocaleString()}</span>
                <button className="btn-flat" onClick={handleDownVoteClick}>
                    <i className={`material-icons ${(downVote ? 'blue-text' : '')}`}>thumb_down</i>
                </button>
            </div>
        )
    }
    return (
        <div className="card-action">
            <button className="btn-flat" disabled>
                <i className="material-icons">thumb_up</i>
            </button>
            <span className="vote-count">{newCount.toLocaleString()}</span>
            <button className="btn-flat" disabled>
                <i className="material-icons">thumb_down</i>
            </button>
        </div>
    )
}

export default RecipeCardAction

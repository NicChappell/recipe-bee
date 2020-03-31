// import dependencies
import React, { useEffect, useState } from 'react'

// import custom hooks
import { useDidMount } from '../../helpers/customHooks'

const VoteAction = props => {
    // custom hook variables
    const didMount = useDidMount()

    // destructure props
    const {
        downVotes,
        isAuthenticated,
        recipeId,
        netVotes,
        updateRecipe,
        upVotes,
        userId
    } = props

    // determine if user is already in downVotes array
    const alreadyDownVoted = downVotes && downVotes.includes(userId)

    // determine if user is already in upVotes array
    const alreadyUpVoted = upVotes && upVotes.includes(userId)

    let prevVotes
    if (alreadyDownVoted) {
        prevVotes = netVotes + 1
    } else if (alreadyUpVoted) {
        prevVotes = netVotes - 1
    } else {
        prevVotes = netVotes
    }

    // state hook variables
    const [downVoted, setDownVoted] = useState(alreadyDownVoted)
    const [newDownVotes, setNewDownVotes] = useState(downVotes)
    const [newUpVotes, setNewUpVotes] = useState(upVotes)
    const [newVotesCount, setNewVoteCount] = useState(netVotes)
    const [prevVotesCount, setPrevVoteCount] = useState(prevVotes)
    const [upVoted, setUpVoted] = useState(alreadyUpVoted)

    // temporary variables
    let tempDownVotes = newDownVotes
    let tempUpVotes = newUpVotes
    let tempVoteCount = newVotesCount

    const handleUpVoteClick = () => {
        if (newVotesCount > prevVotesCount) {
            // subtract 1 vote from count
            tempVoteCount--

            // remove user upvote
            tempUpVotes = tempUpVotes.filter(id => id !== userId)

            // update state
            setDownVoted(false)
            setNewVoteCount(tempVoteCount)
            setNewUpVotes(tempUpVotes)
            setUpVoted(false)
        } else if (newVotesCount === prevVotesCount) {
            // add 1 vote to count
            tempVoteCount++

            // add user upvote
            tempUpVotes.push(userId)

            // update state
            setDownVoted(false)
            setNewVoteCount(tempVoteCount)
            setNewUpVotes(tempUpVotes)
            setUpVoted(true)
        } else if (newVotesCount < prevVotesCount) {
            // add 2 votes to count
            tempVoteCount += 2

            // remove user downvote
            tempDownVotes = tempDownVotes.filter(id => id !== userId)

            // add user upvote
            tempUpVotes.push(userId)

            // update state
            setDownVoted(false)
            setNewVoteCount(tempVoteCount)
            setNewDownVotes(tempDownVotes)
            setNewUpVotes(tempUpVotes)
            setUpVoted(true)
        }
    }

    const handleDownVoteClick = () => {
        if (newVotesCount > prevVotesCount) {
            // subtract 2 votes to count
            tempVoteCount -= 2

            // add user downvote
            tempDownVotes.push(userId)

            // remove user upvote
            tempUpVotes = tempUpVotes.filter(id => id !== userId)

            // update state
            setDownVoted(true)
            setNewVoteCount(tempVoteCount)
            setNewDownVotes(tempDownVotes)
            setNewUpVotes(tempUpVotes)
            setUpVoted(false)
        } else if (newVotesCount === prevVotesCount) {
            // subtract 1 vote from count
            tempVoteCount--

            // add user downvote
            tempDownVotes.push(userId)

            // update state
            setDownVoted(true)
            setNewVoteCount(tempVoteCount)
            setNewDownVotes(tempDownVotes)
            setUpVoted(false)
        } else if (newVotesCount < prevVotesCount) {
            // add 1 vote to count
            tempVoteCount++

            // remove user downvote
            tempDownVotes = tempDownVotes.filter(id => id !== userId)

            // update state
            setDownVoted(false)
            setNewVoteCount(tempVoteCount)
            setNewDownVotes(tempDownVotes)
            setUpVoted(false)
        }
    }

    // update recipe when newVotesCount changes
    useEffect(() => {
        // prevent effect on first render
        if (didMount) {
            const recipeData = {
                downVotes: newDownVotes,
                netVotes: newVotesCount,
                upVotes: newUpVotes
            }

            updateRecipe(recipeId, recipeData)
        }
    }, [newVotesCount])

    return (
        <div className="vote-action">
            <button className="btn-flat up-vote-button" disabled={!isAuthenticated} onClick={handleUpVoteClick}>
                <i className={`material-icons ${(upVoted ? 'orange-text lighten-2' : '')}`}>thumb_up</i>
            </button>
            <span className="vote-count">{newVotesCount.toLocaleString()}</span>
            <button className="btn-flat down-vote-button" disabled={!isAuthenticated} onClick={handleDownVoteClick}>
                <i className={`material-icons ${(downVoted ? 'blue-text lighten-2' : '')}`}>thumb_down</i>
            </button>
        </div>
    )
}

export default VoteAction

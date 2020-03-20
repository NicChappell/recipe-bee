// import dependencies
import React, { useEffect, useState } from 'react'
import { Link } from 'react-router-dom'

// import components
import RecipeCardAction from './RecipeCardAction'

// import custom hooks
import { useDidMount } from '../../helpers/customHooks'

const RecipeCard = props => {
    // custom hook variables
    const didMount = useDidMount()

    // destructure props
    const {
        isAuthenticated,
        recipe,
        updateRecipe,
        userId
    } = props

    // destructure recipe
    const {
        downVotes,
        netVotes,
        upVotes,
    } = recipe

    // determine if user in downVotes array
    const downVoted = downVotes.includes(userId)

    // determine if user in upVotes array
    const upVoted = upVotes.includes(userId)

    // calculate previous count
    let prevCount
    if (downVoted) {
        prevCount = netVotes + 1
    } else if (upVoted) {
        prevCount = netVotes - 1
    } else {
        prevCount = netVotes
    }

    // state hook variables
    const [downVote, setDownVote] = useState(downVoted)
    const [newCount, setNewCount] = useState(netVotes)
    const [newDownVotes, setNewDownVotes] = useState(downVotes)
    const [newUpVotes, setNewUpVotes] = useState(upVotes)
    const [upVote, setUpVote] = useState(upVoted)

    // temporary variables
    let tempCount = newCount
    let tempDownVotes = newDownVotes
    let tempUpVotes = newUpVotes

    const handleUpVoteClick = () => {
        if (newCount > prevCount) {
            // subtract 1 vote from count
            tempCount--

            // remove user upvote
            tempUpVotes = tempUpVotes.filter(id => id !== userId)

            // update state
            setDownVote(false)
            setNewCount(tempCount)
            setNewUpVotes(tempUpVotes)
            setUpVote(false)
        } else if (newCount === prevCount) {
            // add 1 vote to count
            tempCount++

            // add user upvote
            tempUpVotes.push(userId)

            // update state
            setDownVote(false)
            setNewCount(tempCount)
            setNewUpVotes(tempUpVotes)
            setUpVote(true)
        } else if (newCount < prevCount) {
            // add 2 votes to count
            tempCount += 2

            // remove user downvote
            tempDownVotes = tempDownVotes.filter(id => id !== userId)

            // add user upvote
            tempUpVotes.push(userId)

            // update state
            setDownVote(false)
            setNewCount(tempCount)
            setNewDownVotes(tempDownVotes)
            setNewUpVotes(tempUpVotes)
            setUpVote(true)
        }
    }

    const handleDownVoteClick = () => {
        if (newCount > prevCount) {
            // subtract 2 votes to count
            tempCount -= 2

            // add user downvote
            tempDownVotes.push(userId)

            // remove user upvote
            tempUpVotes = tempUpVotes.filter(id => id !== userId)

            // update state
            setDownVote(true)
            setNewCount(tempCount)
            setNewDownVotes(tempDownVotes)
            setNewUpVotes(tempUpVotes)
            setUpVote(false)
        } else if (newCount === prevCount) {
            // subtract 1 vote from count
            tempCount--

            // add user downvote
            tempDownVotes.push(userId)

            // update state
            setDownVote(true)
            setNewCount(tempCount)
            setNewDownVotes(tempDownVotes)
            setUpVote(false)
        } else if (newCount < prevCount) {
            // add 1 vote to count
            tempCount++

            // remove user downvote
            tempDownVotes = tempDownVotes.filter(id => id !== userId)

            // update state
            setDownVote(false)
            setNewCount(tempCount)
            setNewDownVotes(tempDownVotes)
            setUpVote(false)
        }
    }

    // update recipe when newCount changes
    useEffect(() => {
        // prevent effect on first render
        if (didMount) {
            const recipeId = recipe._id
            const recipeData = {
                downVotes: newDownVotes,
                netVotes: newCount,
                upVotes: newUpVotes
            }
            updateRecipe(recipeId, recipeData)
        }
    }, [newCount])

    return (
        <div className="card recipeCard">
            <Link to={`recipes/${recipe._id}`}>
                {/* <div className="card-image">
                    <img src={recipe.image} alt="" />
                    <span className="card-title">{recipe.title}</span>
                    <button className="btn-floating btn-large halfway-fab amber">
                        <i className="material-icons">favorite_border</i>
                    </button>
                </div> */}
                <div className="card-image">
                    <img src="https://via.placeholder.com/400x300" alt="" />
                    <span className="card-title">{recipe.title}</span>
                    <button className="btn-floating btn-large halfway-fab amber">
                        <i className="material-icons">favorite_border</i>
                    </button>
                </div>
                <div className="card-content">
                    <p>{recipe.description}</p>
                </div>
            </Link>
            <RecipeCardAction
                downVote={downVote}
                handleDownVoteClick={handleDownVoteClick}
                handleUpVoteClick={handleUpVoteClick}
                isAuthenticated={isAuthenticated}
                newCount={newCount}
                upVote={upVote}
            />
        </div>
    )
}

export default RecipeCard

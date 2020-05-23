// import dependencies
import React, { useEffect, useState } from 'react'
import PropTypes from 'prop-types'

// import custom hooks
import { useDidMount } from '../../helpers/customHooks'

const HeartAction = props => {
    // destructure props
    const {
        action,
        hearts,
        isAuthenticated,
        recipeId,
        totalHearts,
        userId
    } = props

    // // determine if user is already in hearts array
    // const alreadyLoved = hearts && hearts.includes(userId)

    // state hook variables
    const [loved, setLoved] = useState(hearts.includes(userId))
    const [newHearts, setNewHearts] = useState(hearts)
    const [newHeartsCount, setNewHeartsCount] = useState(totalHearts)
    // console.log(newHeartsCount)
    const [prevHeartsCount, setPrevHeartsCount] = useState(hearts.includes(userId) ? totalHearts - 1 : totalHearts)
    // console.log(prevHeartsCount)

    // custom hook variables
    const didMount = useDidMount()

    // temporary variables
    let tempHearts = newHearts
    let tempHeartsCount = newHeartsCount

    const handleHeartClick = () => {
        if (newHeartsCount > prevHeartsCount) {
            // remove user heart
            tempHearts = tempHearts.filter(id => id !== userId)

            // subtract 1 heart from count
            tempHeartsCount--

            // update state
            setLoved(false)
            setNewHearts(tempHearts)
            setNewHeartsCount(tempHeartsCount)
        } else if (newHeartsCount === prevHeartsCount) {
            // add user heart
            tempHearts.push(userId)

            // add 1 heart to count
            tempHeartsCount++

            // update state
            setLoved(true)
            setNewHearts(tempHearts)
            setNewHeartsCount(tempHeartsCount)
        }
    }

    // update recipe when newHeartsCount changes
    useEffect(() => {
        // prevent effect on first render
        if (didMount) {

            const recipeData = {
                hearts: newHearts,
                totalHearts: newHeartsCount
            }

            action(recipeId, recipeData)
        }
    }, [newHeartsCount])

    return (
        <div className="heart-action">
            {loved
                ? <button className="btn-flat heart-button" disabled={!isAuthenticated} onClick={handleHeartClick}><i className="material-icons red-text lighten-2">favorite</i></button>
                : <button className="btn-flat heart-button" disabled={!isAuthenticated} onClick={handleHeartClick}><i className="material-icons">favorite_border</i></button>
            }
            <span className="heart-count">{newHeartsCount && newHeartsCount.toLocaleString()}</span>
        </div>
    )

}

HeartAction.propTypes = {
    action: PropTypes.func,
    hearts: PropTypes.array,
    isAuthenticated: PropTypes.bool,
    recipeId: PropTypes.string,
    totalHearts: PropTypes.number,
    userId: PropTypes.string
}

export default HeartAction

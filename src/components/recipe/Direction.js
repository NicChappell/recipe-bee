import React, { useState } from 'react'

import DeleteEditUpdateButtons from './DeleteEditUpdateButtons'

import { useTextAreaValue } from '../../helpers/customHooks'

const Direction = (props) => {
    const [disabled, setDisabled] = useState(true)

    const {
        deleteDirection,
        direction,
        index,
        updateDirection
    } = props

    const instruction = useTextAreaValue(direction.instruction)

    const handleDeleteClick = e => {
        e.preventDefault()

        deleteDirection(direction)
    }

    const handleEditClick = e => {
        e.preventDefault()

        setDisabled(!disabled)
    }

    const handleUpdateClick = e => {
        e.preventDefault()

        setDisabled(!disabled)

        const updatedDirection = {
            ...direction,
            direction: direction.value
        }
        updateDirection(updatedDirection)
    }

    return (
        <div className="row direction">
            <div className="col s10">
                <div className="input-field col s1">
                    <p className="center-align">
                        <b>{`${index + 1})`}</b>
                    </p>
                </div>
                <div className="input-field col s11">
                    <textarea
                        disabled={disabled}
                        name="direction"
                        placeholder="Direction"
                        {...instruction}
                    >
                    </textarea>
                </div>
            </div>
            <DeleteEditUpdateButtons
                disabled={disabled}
                handleEditClick={handleEditClick}
                handleDeleteClick={handleDeleteClick}
                handleUpdateClick={handleUpdateClick}
            />
        </div>
    )
}

export default Direction

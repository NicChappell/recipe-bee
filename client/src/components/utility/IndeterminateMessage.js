// import dependencies
import React, { useEffect, useState } from 'react'

const IndeterminateMessage = ({ message }) => {
    // state hook variables
    const [dots, setDots] = useState('.')

    // set interval when component mounts
    useEffect(() => {
        // update dots every 1000ms
        const interval = setInterval(() => {
            setDots(dots => {
                switch (dots) {
                    case '.':
                        return '..'
                    case '..':
                        return '...'
                    default:
                        return '.'
                }
            })
        }, 1000)

        // clear interval when component unmounts
        return () => clearInterval(interval)
    }, [])

    return (
        <p className="indeterminate-message">
            <span className="message">{message}</span>
            <span className="dots">{dots}</span>
        </p>
    )
}

export default IndeterminateMessage

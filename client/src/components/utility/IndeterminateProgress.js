// import dependencies
import React, { useEffect, useState } from 'react'

const IndeterminateProgress = ({ message }) => {
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
        <div className="row center-align indeterminate-progress">
            <div className="col s4 push-s4">
                <p>{message}<span className="dots">{dots}</span></p>
                <div className="progress">
                    <div className="indeterminate"></div>
                </div>
            </div>
        </div>
    )
}

export default IndeterminateProgress

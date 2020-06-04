// import dependencies
import React, { useEffect, useState } from 'react'

const Dots = () => {
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

    return <span className="dots">{dots}</span>
}

export default Dots

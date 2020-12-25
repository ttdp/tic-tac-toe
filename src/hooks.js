import React, { useState, useEffect } from 'react'

export default function Count() {
    const [count, setCount] = useState(0)

    useEffect(() => {
        document.title = `You clicked ${count} times`
    })

    return (
        <div>
            <p>You clicked {count} times</p>
            <button onClick={() => setCount(count + 1)}>
                Click me
            </button>
            <button onClick={() => setCount(prev => prev + 1)}>
                +
            </button>
            <button onClick={() => setCount(prev => prev - 1)}>
                -
            </button>
        </div>
    )
}
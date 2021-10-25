import { useEffect, useState } from 'react'

const o = {}
export default function Counter() {
    const [count, setCount] = useState(0)

    useEffect(() => {
        console.log('1')
    }, ['1', undefined, null, o])
    return (
        <>
            <div>{count}</div>
            <button onClick={() => setCount(count + 1)}>click</button>
        </>
    )
}

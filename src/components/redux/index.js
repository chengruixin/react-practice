import React, { useEffect, useState } from 'react'
import { StoreProvider, connect } from './redux'

export default function App() {
    return (
        <StoreProvider>
            <ChildOne />
            <ChildTwo />
            <ChildThree />
        </StoreProvider>
    )
}

const ChildOne = connect((state) => {
    return { count: state.count, text: state.text }
})(({ count, text }) => {
    useEffect(() => {
        console.log('One executed')
    })

    return (
        <div>
            ChildOne: hello there, {count}, {text}
        </div>
    )
})

const ChildTwo = connect(null, (dispatch) => {
    return {
        plusOne() {
            dispatch({ type: 'PLUS' })
        },
        minusOne() {
            dispatch({ type: 'MINUS' })
        },
        updateText(atttrs) {
            dispatch({ type: 'UPDATE', payload: atttrs })
        },
    }
})(({ plusOne, minusOne, updateText, state }) => {
    const handleClickPlus = () => {
        plusOne()
    }

    const handleClickMinus = () => {
        minusOne()
    }

    const handleInputChange = (e) => {
        updateText(e.target.value)
    }

    useEffect(() => {
        console.log('two executed')
    })

    return (
        <>
            <div>ChildTwo: hello there</div>
            <button onClick={handleClickPlus}>plus</button>
            <button onClick={handleClickMinus}>minu</button>
            <input onChange={handleInputChange} />
        </>
    )
})

const ChildThree = connect((state) => {
    return { group: state.group }
})(({ group }) => {
    useEffect(() => {
        console.log('Three executed')
    })
    return <div>ChildThree: hello there, {group.name}</div>
})

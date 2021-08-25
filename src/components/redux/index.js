import React, { useContext, useEffect, useReducer, useState } from 'react'
import { StoreProvider, useDispatch, connect } from './redux'

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

const ChildTwo = connect()(({ dispatch, state }) => {
    const handleClickPlus = () => {
        dispatch({ type: 'PLUS' })
    }

    const handleClickMinus = () => {
        dispatch({ type: 'MINUS' })
    }

    const handleInputChange = (e) => {
        const inputVal = e.target.value
        dispatch({ type: 'UPDATE', payload: inputVal })
    }

    useEffect(() => {
        console.log(state)
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

function ChildThree() {
    useEffect(() => {
        console.log('Three executed')
    })
    return <div>ChildThree: hello there</div>
}

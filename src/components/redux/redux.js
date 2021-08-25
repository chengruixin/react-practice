import React, { useContext, useState } from 'react'

const defaultState = {
    count: 0,
    text: '',
}
const Context = React.createContext()

export const useDispatch = () => {
    const { dispatch, subscribe, state } = useContext(Context)
    const [refresh, toRefresh] = useState(true)
    const unSubscribe = subscribe(() => {
        toRefresh(!refresh)
    })

    return [state, dispatch]
}

export const connect = (selector) => (Component) => {
    return () => {
        const { dispatch, subscribe, state } = useContext(Context)
        const [refresh, toRefresh] = useState(true)
        const data = selector ? selector(state) : { state }
        console.log(data)
        const unSubscribe = subscribe(() => {
            toRefresh(!refresh)
        })
        return <Component dispatch={dispatch} {...data} />
    }
}

export const StoreProvider = ({ children }) => {
    const store = createStore(defaultState, reducers)
    return <Context.Provider value={store}>{children}</Context.Provider>
}

const reducers = (state, { type, payload }) => {
    switch (type) {
        case 'PLUS':
            return {
                ...state,
                count: state.count + 1,
            }
        case 'MINUS':
            return {
                ...state,
                count: state.count - 1,
            }
        case 'UPDATE':
            return {
                ...state,
                text: payload,
            }
        default:
            return {
                ...state,
            }
    }
}

const createStore = (initialState, reducer) => {
    let state = initialState
    let oldState = null;
    const callbacks = []
    function setState(newState) {
        state = newState
    }
    return {
        dispatch(action) {
            setState(reducer(state, action))
            // console.log(state)
            callbacks.forEach((callback) => {
                callback()
            })
        },

        subscribe(fn) {
            callbacks.push(fn)

            return () => {
                // unsubscribe
                const index = callbacks.indexOf(fn)
                callbacks.splice(index, 1)
            }
        },

        get state() {
            return state
        },
    }
}

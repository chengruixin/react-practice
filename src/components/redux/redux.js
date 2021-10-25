import React, { useContext, useEffect, useState } from 'react'
import { Map } from 'immutable'
const defaultState = {
    count: 0,
    text: '',
    group: {
        name: 'to display purpose',
    },
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

export const connect = (selector, dispatcherSelector) => (Component) => {
    return (props) => {
        const { subscribe, state, dispatch } = useContext(Context)
        const [refresh, toRefresh] = useState(true)
        const data = selector ? selector(state) : { state }
        const dispatchers = dispatcherSelector
            ? dispatcherSelector(dispatch)
            : { dispatch }

        useEffect(() => {
            const unSubscribe = subscribe((oldState, newState) => {
                const oldMap = Map(selector ? selector(oldState) : oldState)
                const newMap = Map(selector ? selector(newState) : newState)

                if (!oldMap.equals(newMap)) {
                    toRefresh(!refresh)
                }
            })

            return () => {
                unSubscribe()
            }
        })

        return <Component {...props} {...dispatchers} {...data} />
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
    let oldState = null
    const callbacks = []
    function setState(newState) {
        oldState = state
        state = newState
    }
    return {
        dispatch(action) {
            setState(reducer(state, action))
            // console.log(state)
            callbacks.forEach((callback) => {
                callback(oldState, state)
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

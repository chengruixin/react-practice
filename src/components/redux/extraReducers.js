// reducers
const countReducer = (state, { type, payload }) => {
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

        default:
            return {
                ...state,
            }
    }
}

const textReducer = (state, { type, payload }) => {
    switch (type) {
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

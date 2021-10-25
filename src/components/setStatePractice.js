import React, { useEffect, useState } from 'react'
import reactDom from 'react-dom'

function UpdaterFn() {
    const [state, setState] = useState({ count: 0 })

    useEffect(() => {
        console.log('1231')
    }, [state.count])
    const handler = () => {
        setState((state) => ({ ...state, count: state.count + 1 }))
        console.log(state)
        setState((state) => ({ ...state, count: state.count + 1 }))
        console.log(state)

        // reactDom.unstable_batchedUpdates(() => {
        //     setTimeout(() => {
        //         setState(state + 1)
        //         console.log(state)
        //         setState(state + 1)
        //         console.log(state)
        //         setState(state + 1)
        //         console.log(state)
        //     })
        // })
        setTimeout(() => {
            reactDom.unstable_batchedUpdates(() => {
                setState((state) => ({ ...state, count: state.count + 1 }))
                console.log(state)
                setState((state) => ({ ...state, count: state.count + 2 }))
                console.log(state)
            })
        }, 100);
    }

    return <div onClick={handler}>{state.count}</div>
}

class UpdaterCl extends React.Component {
    constructor(props) {
        super(props)
        this.state = {
            count: 0,
        }
    }

    componentDidUpdate() {
        console.log('s')
    }
    handler = () => {
        this.setState({ count: this.state.count + 1 })
        console.log(this.state.count)
        this.setState({ count: this.state.count + 1 })
        console.log(this.state.count)

        setTimeout(() => {
            reactDom.unstable_batchedUpdates(() => {
                this.setState({ count: this.state.count + 1 })
                console.log(this.state.count)
                this.setState({ count: this.state.count + 1 })
                console.log(this.state.count)
            })
        })
    }

    que

    render() {
        return <div onClick={this.handler}>{this.state.count}</div>
    }
}

export default UpdaterFn

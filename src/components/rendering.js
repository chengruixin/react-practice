import React, { useEffect, useMemo } from 'react'

export default class ClassRendering extends React.Component {
    constructor(props) {
        super(props)
        this.state = {
            count: 1,
        }
    }

    handleClick = () => {
        let count = this.state.count
        this.setState({ count: count + 1 })
    }

    render() {
        return (
            <div>
                <ShowArea value={this.state.count} />
                <div>{this.state.count}</div>
                <button onClick={this.handleClick}>click</button>
            </div>
        )
    }
}

// class ShowArea extends React.Component {
//     constructor(props) {
//         super(props)
//     }
//     componentDidMount() {
//         console.log("ShowArea is mounted")
//     }
//     componentDidUpdate() {
//         console.log("ShowArea is updated")
//     }

//     renderFn = (value) => <Content value={value}/>

//     render() {
//         return <Wrapper render={this.renderFn}>
//             hello
//         </Wrapper>
//     }
// }

function ShowArea({ value }) {
    useEffect(() => {
        console.log('ShowArea is updated', this)
    })

    // const renderFn = useMemo(() => {
    //     console.log('exe')
    //     return (value) => <Content value={value} />
    // }, [value])
    const call = (value) => <Content value={value} />;
    const renderFn = useMemo(() => call, [])
    return <Wrapper render={renderFn}>hello</Wrapper>
}
class Wrapper extends React.PureComponent {
    constructor(props) {
        super(props)
    }
    componentDidMount() {
        console.log('Wrapper is mounted')
    }
    componentDidUpdate() {
        console.log('Wrapper is updated')
    }

    render() {
        return <div>{this.props.render('hello there')}</div>
    }
}

// function Wrapper({ render }) {
//     useEffect(() => {
//         console.log('Wrapper is udpated')
//     }, [])

//     return <div>{render('bingo there')}</div>
// }

class Content extends React.Component {
    constructor(props) {
        super(props)
    }
    componentDidMount() {
        console.log('Content is mounted')
    }
    componentDidUpdate() {
        console.log('Content is updated')
    }

    render() {
        return <p>{this.props.value}</p>
    }
}

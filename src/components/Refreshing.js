import React from 'react'

export default class Normal extends React.PureComponent {
    constructor(props) {
        super(props)
        this.state = {
            words: ['marklar'],
        }
        this.handleClick = this.handleClick.bind(this)
    }

    handleClick() {
        // 这部分代码很糟，而且还有 bug
        const words = this.state.words
        words.push('marklar')
        this.setState({ words: words })
    }

    render() {
        return (
            <div>
                <button onClick={this.handleClick}> click me </button>
                <ListOfWords words={this.state.words} />
            </div>
        )
    }
}

class ListOfWords extends React.Component {
    render() {
        return <div>{this.props.words.join(',')}</div>
    }
}

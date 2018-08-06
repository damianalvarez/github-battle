import React from 'react'
import PropTypes from 'prop-types'

const styles = {
    content: {
        textAlign: 'center',
        fontSize: '35px'
    }
}

export default class Loading extends React.Component {

    static propTypes = {
        text: PropTypes.string.isRequired,
        speed: PropTypes.number.isRequired
    }

    static defaultProps = {
        text: 'Loading',
        speed: 500
    }    

    state = {
        text: this.props.text || this.defaultProps.text
    }

    componentDidMount() {
        const { text, speed } = this.props
        const stopper = `${text} ...`

        this.interval = window.setInterval(() => {
            this.state.text === stopper 
                ? this.setState({ text })
                : this.setState(prevState => ({ text: prevState.text + '.'}))
        }, speed)
    }

    render() {
        return (
            <p style={styles.content}>
                {this.state.text}
            </p>
        )
    }

    componentWillUnmount() {
        window.clearInterval(this.interval)
    }
}
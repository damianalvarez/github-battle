import React from 'react'
import PropTypes from 'prop-types'

const styles = {
    content: {
        textAlign: 'center',
        fontSize: '35px'
    }
}

class Loading extends React.Component {

    constructor(props) {
        super(props)

        this.state = {
            text: props.text || defaultProps.text
        }
    }

    componentDidMount() {
        const stopper = this.props.text + '...'

        this.interval = window.setInterval(() => {
            if (this.state.text === stopper) {
                this.setState({
                    text: this.props.text
                })
            } else {
                this.setState(prevState => {
                    return {
                        text: prevState.text + '.'
                    }
                })
            }
        }, this.props.speed)
    }

    render() {
        return (
            <p className={styles}>
                {this.state.text}
            </p>
        )
    }

    componentWillUnmount() {
        window.clearInterval(this.interval)
    }
}

Loading.propTypes = {
    text: PropTypes.string.isRequired,
    speed: PropTypes.number.isRequired
}

Loading.defaultProps = {
    text: 'Loading',
    speed: 500
}

export default Loading
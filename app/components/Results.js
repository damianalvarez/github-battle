import React from 'react'
import PropTypes from 'prop-types'
import queryString from 'query-string'
import { Link } from 'react-router-dom'
import Loading from './Loading'
import PlayerPreview from './PlayerPreview';
import API from '../utils/api'

const Profile = props => {

    const info = props.info

    return (
        <PlayerPreview
            avatar={info.avatar_url}
            username={info.login}
        >
            <ul className='space-list-items'>
                {info.name && <li>{info.name}</li>}
                {info.location && <li>{info.location}</li>}
                {info.company && <li>{info.company}</li>}
                <li>Followers: {info.followers}</li>
                <li>Following: {info.following}</li>
                <li>Public Repos: {info.public_repos}</li>
                {info.blog && <li><a className='link' href={info.blog}>{info.blog}</a></li>}
            </ul>
        </PlayerPreview>
    )
}

Profile.propTypes = {
    info: PropTypes.object.isRequired
}

const Player = props => (
    <div>
        <h1 className='header'>{props.label}</h1>
        <h3 className='player'>Score: {props.score}</h3>
        <Profile info={props.profile} />
    </div>
)

Player.propTypes = {
    label: PropTypes.string.isRequired,
    score: PropTypes.number.isRequired,
    profile: PropTypes.object.isRequired
}

class Results extends React.Component {

    constructor(props) {
        super(props)

        this.state = {
            winner: null,
            loser: null,
            error: null,
            loading: true
        }
    }

    componentDidMount() {
        const players = queryString.parse(this.props.location.search)
        API.battle([
            players.playerOneName,
            players.playerTwoName
        ]).then(results => {
            if (results === null) {
                this.setState({
                    error: 'Looks like there was an error. Check that both users exist on GitHub.',
                    loading: false
                })
            }

            this.setState({
                error: false,
                winner: results[0],
                loser: results[1],
                loading: false
            })
        })
    }

    render() {
        const error = this.state.error
        const winner = this.state.winner
        const loser = this.state.loser
        const loading = this.state.loading

        if (loading) {
            return <Loading className='loading'/>
        } else {
            if (error) {
                return (
                    <div>
                        <p>{ error }</p>
                        <Link to='/battle'>Reset</Link>
                    </div>
                )
            } else {
                return (
                    <div className='row'>
                        <Player
                            label='Winner'
                            score={winner.score}
                            profile={winner.profile}
                        />
                        <Player
                            label='Loser'
                            score={loser.score}
                            profile={loser.profile}
                        />
                    </div>
                )
            }
        }
    }
}

export default Results
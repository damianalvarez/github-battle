import React from 'react'
import PropTypes from 'prop-types'
import Loading from './Loading'
import RepoGrid from './RepoGrid'
import API from '../utils/api'

const SelectLanguage = (props) => {
    
    const languages = ['All', 'JavaScript', 'Ruby', 'Java', 'CSS', 'Python']

    return (
        <ul className='languages'>
            {languages.map(lang => {
                return (
                    <li key={lang}
                        onClick={() => props.onSelect(lang)}
                        className={(props.selectedLanguage === lang ? 'active' : '')}>
                        {lang}
                    </li>
                )
            })}
        </ul>
    )
}

SelectLanguage.propTypes = {
    selectedLanguage: PropTypes.string.isRequired,
    onSelect: PropTypes.func.isRequired
}

export default class Popular extends React.Component {
    
    constructor(props) {
        super(props)
        
        this.state = {
            selectedLanguage: 'All',
            repos: null
        }
        this.updateLanguage = this.updateLanguage.bind(this)
    }

    componentDidMount() {
        this.updateLanguage(this.state.selectedLanguage)
    }

    updateLanguage(lang) {
        this.setState({
            selectedLanguage: lang,
            repos: null
        })

        API.fetchPopularRepos(lang)
            .then((repos) => {
                this.setState({
                    repos: repos
                })
            })
    }

    render() {
        return (
            <div>
                <SelectLanguage 
                    selectedLanguage={this.state.selectedLanguage}
                    onSelect={this.updateLanguage}
                />
                {this.state.repos
                    ? <RepoGrid repos={this.state.repos}/>
                    : <Loading className='loading'/>
                }
            </div>
        )
    }
}

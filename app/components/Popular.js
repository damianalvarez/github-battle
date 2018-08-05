import React from 'react'
import PropTypes from 'prop-types'
import Loading from './Loading'
import RepoGrid from './RepoGrid'
import API from '../utils/api'

const SelectLanguage = ({ onSelect, selectedLanguage }) => {
    
    const languages = ['All', 'JavaScript', 'Ruby', 'Java', 'CSS', 'Python']

    return (
        <ul className='languages'>
            {languages.map(lang => {
                return (
                    <li key={lang}
                        onClick={() => onSelect(lang)}
                        className={(selectedLanguage === lang ? 'active' : '')}>
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

        API.fetchPopularRepos(lang).then((repos) => this.setState({ repos }))
    }

    render() {

        const { selectedLanguage, repos } = this.state
        return (
            <div>
                <SelectLanguage 
                    selectedLanguage={selectedLanguage}
                    onSelect={this.updateLanguage}
                />
                {repos
                    ? <RepoGrid repos={repos}/>
                    : <Loading className='loading'/>
                }
            </div>
        )
    }
}

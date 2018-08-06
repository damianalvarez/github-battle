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
    
    state = {
        selectedLanguage: 'All',
        repos: null
    }

    componentDidMount() {
        this.updateLanguage(this.state.selectedLanguage)
    }

    updateLanguage = async (lang) => {
        this.setState({
            selectedLanguage: lang,
            repos: null
        })

        const repos = await API.fetchPopularRepos(lang)

        this.setState({ repos })
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

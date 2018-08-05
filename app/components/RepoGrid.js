import React from 'react'
import PropTypes from 'prop-types'

const RepoGrid = ({ repos }) => (
    <ul className='popular-list'>
        {repos.map(({ name, owner, html_url, stargazers_count }, index) => {
            return (
                <li key={name} className='popular-item'>
                    <div className='popular-rank'>
                        #{index + 1}
                    </div>
                    <ul className='space-list-items'>
                        <li>
                            <img
                                className='avatar'
                                src={owner.avatar_url}
                                alt={'Avatar for ' + owner.login}
                            />
                        </li>
                        <li><a href={html_url}>{name}</a></li>
                        <li>@{owner.login}</li>
                        <li>{stargazers_count} stars</li>
                    </ul>
                </li>
            )
        })}
    </ul>
)

RepoGrid.propTypes = {
    repos: PropTypes.arrayOf(PropTypes.object).isRequired
}

export default RepoGrid
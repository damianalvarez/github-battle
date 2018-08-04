import axios from 'axios'

const id = ''
const secretKey = ''
const params = `?client_id=${id}&client_secret=${secretKey}`

const getProfile = username => {
    return axios.get(`https://api.github.com/users/${username}${params}`)
        .then(({ data }) => data)
}

const getRepos = username => {
    return axios.get(`https://api.github.com/users/${username}/
        repos${params}&per_page=100`)
}

const getStarsCount = repos => {
    return repos.data.reduce((count, { stargazers_count }) => {
        return count + stargazers_count, 0
    })
}

const calculateScore = ({ followers }, repos) => {
    return (followers * 3) + getStarsCount(repos)
}

const handleError = error => {
    console.warn(error)
    return null
}

const getUserData = player => 
    Promise.all([
        getProfile(player),
        getRepos(player)
    ]).then(([ profile, repos ]) => ({
        profile,
        score: calculateScore(profile, repos)
    }))

const sortPlayers = players => players.sort((a, b) => b.score - a.score)
  
const API = {
    battle(players) {
        return Promise.all(players.map(getUserData))
                    .then(sortPlayers)
                    .catch(handleError)
    },
    fetchPopularRepos(language) {
        const encodedURI = window.encodeURI(`https://api.github.com/search/
            repositories?q=stars:>1+language:${language}
            &sort=stars&order=desc&type=Repositories`)
        
        return axios.get(encodedURI).then(({ data }) => data.items)
    }
}

export default API
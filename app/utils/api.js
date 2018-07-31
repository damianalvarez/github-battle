import axios from 'axios'

const id = ''
const secretKey = ''
const params = '?client_id=' + id + '&client_secret=' + secretKey

const getProfile = username => {
    return axios.get('https://api.github.com/users/' + username + params)
        .then(user => user.data)
}

const getRepos = username => {
    return axios.get('https://api.github.com/users/' + username + '/repos' + params + '&per_page=100')
}

const getStarsCount = repos => repos.data.reduce((count, repo) => count + repo.stargazers_count, 0)

const calculateScore = (profile, repos) => {
    const followers = profile.followers
    const totalStars = getStarsCount(repos)

    return totalStars * 3 + followers
}

const handleError = error => {
    console.warn(error)
    return null
}

const getUserData = player => {
    return axios.all([
        getProfile(player),
        getRepos(player)
    ]).then(data => {
        const profile = data[0]
        const repos = data[1]

        return {
            profile,
            score: calculateScore(profile, repos)
        }
    })
}

const sortPlayers = players => {
    return players.sort((a, b) => b.score - a.score)
}
  
const API = {
    battle(players) {
        return axios.all(players.map(getUserData))
                    .then(sortPlayers)
                    .catch(handleError)
    },
    fetchPopularRepos(language) {
        const encodedURI = window.encodeURI('https://api.github.com/search/'+
            'repositories?q=stars:>1+language:'+ language +
            '&sort=stars&order=desc&type=Repositories')
        
        return axios.get(encodedURI)
            .then(response => {
                return response.data.items
            })
    }
}

export default API
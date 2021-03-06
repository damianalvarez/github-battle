import React from 'react'
import { 
    BrowserRouter as Router, 
    Route,
    Switch
} from 'react-router-dom'
import Battle from './Battle'
import Home from './Home'
import Nav from './Nav'
import Popular from './Popular'
import Results from './Results'

const App = () => (
    <Router>
        <div className='container'>
            <Nav />
            <Switch>
                <Route exact path='/' component={Home} />
                <Route exact path='/battle' component={Battle} />
                <Route path='/popular' component={Popular} />
                <Route path='/battle/results' component={Results} />
                <Route render={() => <p>Not found!</p>} />
            </Switch>
        </div>
    </Router>
)

export default App
import './App.css'
import {Route, Switch} from 'react-router-dom'
import ProtectedRoute from './components/ProtectedRoute'
import SignIn from './components/SignIn'
import Home from './components/Home'
import HomeMovies from './components/HomeMovies'
import HomeSearch from './components/HomeSearch'
import PopularMovies from './components/PopularMovies'
import AccountSection from './components/AccountSection'
import NotFound from './components/NotFound'

const App = () => (
  <Switch>
    <Route exact path="/sign-in" component={SignIn} />
    <ProtectedRoute exact path="/" component={Home} />
    <ProtectedRoute
      exact
      path="/home-movies/trending/:id"
      component={HomeMovies}
    />
    <ProtectedRoute
      exact
      path="/home-movies/top-rated/:id"
      component={HomeMovies}
    />
    <ProtectedRoute
      exact
      path="/home-movies/originals/:id"
      component={HomeMovies}
    />
    <ProtectedRoute exact path="/similar/:id" component={HomeMovies} />
    <ProtectedRoute exact path="/search-movies" component={HomeSearch} />
    <ProtectedRoute exact path="/search-movies/:id" component={HomeMovies} />
    <ProtectedRoute exact path="/popular-movies" component={PopularMovies} />
    <ProtectedRoute exact path="/popular-movies/:id" component={HomeMovies} />
    <ProtectedRoute exact path="/movies-account" component={AccountSection} />
    <Route component={NotFound} />
  </Switch>
)

export default App

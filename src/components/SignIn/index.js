import {Component} from 'react'
import Cookies from 'js-cookie'
import {Redirect} from 'react-router-dom'

import './index.css'

class SignIn extends Component {
  state = {
    username: '',
    password: '',
    requestToken: '',
    showSubmitError: false,
    errorMsg: '',
  }

  componentDidMount() {
    this.getRequestToken()
  }

  getRequestToken = async () => {
    const url =
      'https://api.themoviedb.org/3/authentication/token/new?api_key=a709ef5cf669a418dea9126a1637e743'
    const response = await fetch(url)
    const data = await response.json()
    const formattedData = {
      expiresAt: data.expires_at,
      requestToken: data.request_token,
      success: data.success,
    }
    this.setState({
      requestToken: formattedData.requestToken,
    })
  }

  onChangeUsername = event => {
    this.setState({username: event.target.value})
  }

  onChangePassword = event => {
    this.setState({password: event.target.value})
  }

  onSubmitSuccess = jwtToken => {
    const {history} = this.props

    Cookies.set('jwt_token', jwtToken, {
      expires: 30,
    })
    history.replace('/')
  }

  onSubmitFailure = () => {
    this.setState({
      showSubmitError: true,
      errorMsg: 'Please enter a valid Email & Password',
    })
  }

  submitForm = async event => {
    event.preventDefault()
    const {username, password, requestToken} = this.state
    const userDetails = {
      username,
      password,
      request_token: requestToken,
    }
    const url =
      'https://api.themoviedb.org/3/authentication/token/validate_with_login?api_key=a709ef5cf669a418dea9126a1637e743'
    const options = {
      method: 'POST',
      headers: {
        'Content-type': 'application/json',
      },
      body: JSON.stringify(userDetails),
    }
    const response = await fetch(url, options)
    const data = await response.json()
    if (response.ok === true) {
      this.onSubmitSuccess(data.jwt_token)
    } else {
      this.onSubmitFailure(data.error)
    }
  }

  renderPasswordField = () => {
    const {password} = this.state
    return (
      <>
        <label className="input-label" htmlFor="password">
          PASSWORD
        </label>
        <input
          type="password"
          id="password"
          className="password-input-filed text-white"
          value={password}
          onChange={this.onChangePassword}
          placeholder="Password"
        />
      </>
    )
  }

  renderUsernameField = () => {
    const {username} = this.state
    return (
      <>
        <label className="input-label" htmlFor="username">
          USERNAME
        </label>
        <input
          type="text"
          id="username"
          className="username-input-filed text-white"
          value={username}
          onChange={this.onChangeUsername}
          placeholder="Username"
        />
      </>
    )
  }

  render() {
    const {showSubmitError, errorMsg} = this.state
    const jwtToken = Cookies.get('jwt_token')
    if (jwtToken !== undefined) {
      return <Redirect to="/" />
    }
    return (
      <div className="sign-in-bg-container">
        <div className="container d-flex flex-column align-items-center">
          <img
            className="nav-logo align-self-start"
            alt="movies-logo"
            src="https://fontmeme.com/permalink/210704/5626de302b79cd672861215379764815.png"
          />
          <div className="sign-in-container mt-5">
            <form className="form-container" onSubmit={this.submitForm}>
              <p className="sign-in-heading">Sign in</p>
              <div className="input-container">
                {this.renderUsernameField()}
              </div>
              <div className="input-container">
                {this.renderPasswordField()}
              </div>
              {showSubmitError && <p className="error-message">{errorMsg}</p>}
              <button type="submit" className="login-button">
                Sign in
              </button>
            </form>
          </div>
        </div>
      </div>
    )
  }
}

export default SignIn

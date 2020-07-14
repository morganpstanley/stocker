import React, { Component } from 'react';
import { connect } from 'react-redux'
import { loginUser } from '../../actions/loginUser'
import Header from '../../components/Header/Header'
import { Link, withRouter} from 'react-router-dom';
import './Login.css'
import axios from 'axios'

class Login extends Component {

  state = { 
    username: '',
    password: '',
    password_confirmation: '',
    errors: ''
  };

  componentDidMount = () => {

    console.log('user', this.props.user)

    if (this.props.user) {
      this.props.history.push('/')
    }

  }
  
  handleChange = (event) => {
    const {name, value} = event.target
    this.setState({
      [name]: value
    })
  };

  handleSubmit = (event) => {
    event.preventDefault()

    const {username, password} = this.state

    let user = {
      username: username,
      password: password,
    }
 
    axios.post('http://localhost:3000/login', {user}, {withCredentials: true})
    .then(response => {
      if (response.data.logged_in) {
        this.props.history.push('/')
      } else {
        this.setState({
          errors: response.data.errors
        })
      }
    })
    .catch(error => console.log('api errors:', error))
  };

  render() {
    return(
      <div id='login-page'>
          <Header />
          <div id="login-body">
            <h1>WELCOME.</h1>
            <form onSubmit={this.handleSubmit}>
            <input 
              type="text" 
              placeholder="username" 
              name="username" 
              value={this.state.username} 
              onChange={this.handleChange} 
              required
            /> <br />
            <input 
              type="text" 
              placeholder="password" 
              name="password" 
              value={this.state.password} 
              onChange={this.handleChange} 
              required
            /> <br />
              <button>Log in</button>
          </form>
            <p>New to Stocker? <Link to="/signup">Create an account.</Link></p>  
          </div>
      </div>
    )
  }
}

const mapDispatchToProps = dispatch => {
  return({
      loginUser: (username, id) => dispatch(loginUser(username, id))
  })
}

export default withRouter(connect(null, mapDispatchToProps)(Login))
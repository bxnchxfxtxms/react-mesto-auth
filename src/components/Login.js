import React from 'react'
import { withRouter } from 'react-router-dom'

class Login extends React.Component {
  constructor(props) {
    super(props)
    this.state = {
      email: '',
      password: ''
    }
  }

  handleChange = event => {
    const { name, value } = event.target
    this.setState({
      [name]: value
    })
  }

  handleSubmit = event => {
    event.preventDefault()
    this.props.onLogin(this.state)
  }

  render() {
    return(
      <div className="site-entrance">
        <h3 className="site-entrance__title">
          Вход
        </h3>
        <form
          className="site-entrance__form"
          onSubmit={this.handleSubmit}
          >
          <input
            className="site-entrance__input-field"
            required
            id="email"
            name="email"
            type="email"
            value={this.state.email}
            onChange={this.handleChange}
            placeholder="Email" />
          <input
            className="site-entrance__input-field"
            required
            id="password"
            name="password"
            type="password"
            value={this.state.password}
            onChange={this.handleChange}
            placeholder="Пароль" />
          <button
            className="site-entrance__submit-button"
            type="submit" >
              Войти
          </button>
        </form>
      </div>
    )
  }
}

export default withRouter(Login)
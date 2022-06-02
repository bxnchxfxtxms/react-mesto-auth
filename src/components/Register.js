import React from 'react'
// import Auth from '../utils/Auth'
import { auth } from '../utils/Auth'
import { Link, withRouter } from 'react-router-dom'

class Register extends React.Component {
  constructor(props){
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
    this.props.onRegister(this.state)
  }

  render() {
    return (
      <div className="site-entrance">
      <h3 className="site-entrance__title">
        Регистрация
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
            Зарегистрироваться
        </button>
        <Link className="site-entrance__redirect-link" to="/sign-in">
          Уже зарегистрированы? Войти
        </Link>
      </form>
    </div>
    )
  }
}

export default withRouter(Register)
import React from 'react';
import headerLogo from '../images/headerLogo.svg';
import { Link, withRouter } from 'react-router-dom'

class Header extends React.Component {
  constructor(props) {
    super(props)
  }

  switchLink = () => {
    let link = { location: '', title: '' }
    const currentLocation = this.props.history.location.pathname
    if (currentLocation === '/sign-in') {
      return link = { location: '/sign-up', title: 'Зарегистрироваться' }
    } else if (currentLocation === '/sign-up') {
      return link = { location: '/sign-in', title: 'Войти' }
    }
  }
  
  render() {
    return (
      <header className="header">
        <img className="header__logo" src={headerLogo} alt="Логотип сайта" />
        <div className="site-entrance__link-container">
          <p className="site-entrance__email">{this.props.email}</p>
          <div>
            {this.props.history.location.pathname === '/'
            ?
            <button className="site-entrance__logout-button" onClick={this.props.onLogoutClick}>Выйти</button>
            :
            <Link className="site-entrance__redirect-link site-entrance__redirect-link_place_header" to={this.switchLink().location}>{this.switchLink().title}</Link>}
          </div>
        </div>
      </header>
    );
  }
}

export default withRouter(Header)
import React from 'react';
import headerLogo from '../images/headerLogo.svg';

class Header extends React.Component {
  
  render() {
    return (
      <header className="header">
        <img className="header__logo" src={headerLogo} alt="Логотип сайта" />
      </header>
    );
  }
}

export default Header;
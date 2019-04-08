import React from 'react';
import { Link } from 'react-router-dom';
import Banner from './images/banner.png';
import './style.scss';

class Header extends React.Component { // eslint-disable-line react/prefer-stateless-function
  render() {
    return (
      <div className="header">
        <a href="https://github.com/is4302-nus-2019-Fri12-Group5/blockchain-healthcare">
          <img src={Banner} alt="react-redux-boilerplate - Logo" />
        </a>
        <div className="nav-bar">
          <Link className="router-link" to="/">
            Home
          </Link>
          <Link className="router-link" to="/features">
            Features
          </Link>
		  <Link className="router-link" to="/login">
            Login
          </Link>
        </div>
      </div>
    );
  }
}

export default Header;
/**
 * Theme: Web Project 2
 * Description: Creating a gaming platform for exchange between players
 * File: AuthPanel.js, Authorization panel component
 * Authors: Oleg Smolovyk, Piotr Iablocichin, Iana Kravchenko, Svitlana Melnyk
 * Date: October 2018
 */

import React from 'react';
import {Redirect, Link, withRouter} from 'react-router-dom';

class AuthPanel extends React.Component {

  constructor(props) {
    super(props);
    this.state = {
      redirectTo: null,
    };
    this.handleLogout = this.handleLogout.bind(this);
  }

  handleLogout(e) {
    e.preventDefault();
    this.props.logoutUser();
    this.props.history.push('/');
  }

  render() {

    let buttons;

    if (this.props.user) {
      buttons =
        <div>
          <Link className="dropdown-item" to={'/user/'}>Your Account</Link>
          <a className="dropdown-item" onClick={this.handleLogout}>Log out</a>
        </div>;
    } else {
      buttons =
        <div>
          <Link id="Login" className="dropdown-item" to={'/user/login'}>Log in</Link>
          <Link id="SignUp" className="dropdown-item" to={'/user/signup'}>Sign up</Link>
        </div>;
    }

    return (
      <div className="dropdown-menu dropdown-menu-right" aria-labelledby="dropdownMenu">
        {buttons}
      </div>
    );
  }
}

export default withRouter(AuthPanel);

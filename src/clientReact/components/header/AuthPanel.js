import React from 'react';
import ReactDom from 'react-dom';
import LoginPage from '../content/LoginPage';
import SignUpPage from '../content/SignUpPage';
import {Route, Link} from 'react-router-dom';

class AuthPanel extends React.Component {

  onLogin(e) {
    e.preventDefault();
    ReactDom.render(
      <LoginPage/>,
      document.getElementById('mainContent')
    );
  }

  onSignUp(e) {
    e.preventDefault();
    ReactDom.render(
      <SignUpPage/>,
      document.getElementById('mainContent')
    );
  }

  render() {
    return (
      <div>
        <button className="btn btn-outline-warning my-2 my-sm-0 mr-2">
          <Link to={'/login'}>Log in</Link>
          {/*<a id="lienLogin" href={''}></a>*/}
        </button>
        <button className="btn btn-outline-warning my-2 my-sm-0 mr-5" onClick={this.onSignUp}>
          <a id="lienSignUp" href={''}>Sign up</a>
        </button>
      </div>
    );
  }
}

export default AuthPanel;

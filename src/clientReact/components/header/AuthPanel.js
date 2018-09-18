import React from 'react';
import ReactDom from 'react-dom';
import LoginPage from '../content/LoginPage';
import SignUpPage from '../content/SignUpPage';

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
        <button className="btn btn-outline-warning my-2 my-sm-0 mr-2" onClick={this.onLogin}>
          <a id="lienLogin" href={''}>Log in</a>
        </button>
        <button className="btn btn-outline-warning my-2 my-sm-0 mr-5" onClick={this.onSignUp}>
          <a id="lienSignUp" href={''}>Sign up</a>
        </button>
      </div>
    );
  }
}

export default AuthPanel;

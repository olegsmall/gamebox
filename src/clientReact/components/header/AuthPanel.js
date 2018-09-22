import React from 'react';
import ReactDom from 'react-dom';
import LoginPage from '../content/LoginPage';
import SignUpPage from '../content/SignUpPage';
import {Link} from 'react-router-dom';

class AuthPanel extends React.Component {

  render() {
    return (
      <div>
        <button className="btn btn-outline-warning my-2 my-sm-0 mr-2">
          <Link id="lienLogin" to={'/user/login'}>Log in</Link>
        </button>
        <button className="btn btn-outline-warning my-2 my-sm-0 mr-5">
          <Link id="lienSignUp" to={'/user/signup'}>Sign up</Link>
        </button>
      </div>
    );
  }
}

export default AuthPanel;

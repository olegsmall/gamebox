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

//     buttons =
//       <div className={'d-flex flex-row flex-nowrap'}>
//         <div>
//           <Link to={'/user/'} className="user-icon">
//             <i className="fa fa-user-o fa-2x mr-3" aria-hidden="true"></i>
//           </Link>
//         </div>
//
//         {/*<button className="btn btn-sm btn-outline-success my-2 my-sm-0 mr-2">*/}
//         {/*<Link to={'/user/'}>Profile</Link>*/}
//         {/*</button>*/}
//         <button className="btn btn-sm btn-outline-success my-2 my-sm-0 mr-5">
//           <a onClick={this.handleLogout}>Log out</a>
//         </button>
//       </div>;
//   } else {
//   buttons =
//     <div>
//       <button className="btn btn-sm btn-outline-success my-2 my-sm-0 mr-2">
//         <Link id="linkLogin" to={'/user/login'}>Log in</Link>
//       </button>
//       <button className="btn btn-sm btn-outline-success my-2 my-sm-0 mr-5">
//         <Link id="linkSignUp" to={'/user/signup'}>Sign up</Link>
//       </button>
//     </div>;
// }

    return (
      <div className="dropdown-menu dropdown-menu-right" aria-labelledby="dropdownMenu">
        {buttons}
      </div>
    );
  }
}

export default withRouter(AuthPanel);

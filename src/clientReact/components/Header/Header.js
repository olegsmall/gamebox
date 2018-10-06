import React from 'react';
// import ReactPropTypes from 'prop-types';
import AuthPanel from './AuthPanel';
import {Link} from 'react-router-dom';
import axios from 'axios';

require('./Header.scss');

class Header extends React.Component {

  constructor(props){
    super(props);
    this.state = {
      headerStickToTop: false,
    };
    this.headerAnimation.bind(this);
  }

  headerAnimation() {
    const self = this;
    $(window).scroll(function () {
      if ($(this).scrollTop() > 200) {
        self.setState({headerStickToTop: true});
      } else {
        self.setState({headerStickToTop: false});
      }
    });
  }

  showSearchPanel() {
    $(this.refs['inputSearch']).toggle(100, "linear");
  }

  componentDidMount() {
    this.headerAnimation();
  }


  render() {

    // let headerNavClasses = "navbar navbar-expand-lg  navbar-lignt bg-light fixed-top navbar-inverse mid";
    // headerNavClasses += this.state.headerStickToTop ? "stickytop" : "";

    return (
      <header className={"Header"}>
        <div className="mr-5 ml-5">
          <nav className={`navbar navbar-expand-lg  navbar-lignt fixed-top navbar-inverse mid ${this.state.headerStickToTop ? "stickytop" : ""} `}>
            <Link className="navbar-brand" to={'/'}>
              <img src="/image/logo1.png" width="40" height="40"/>
            </Link>
            <button
              className="navbar-toggler"
              type="button"
              data-toggle="collapse"
              data-target="#navbarToggler"
              aria-controls="navbarToggler"
              aria-expanded="false"
              aria-label="Toggle navigation">
              <span className="navbar-toggler-icon"><i className="fa fa-bars" aria-hidden="false"></i></span>
            </button>
            <div className="collapse navbar-collapse" id="navbarToggler">
              <ul className="navbar-nav mr-auto mt-sm-0">
                <li className="nav-item">
                  <Link className="nav-link" to={'/'}>Home</Link>
                </li>
                <li className="nav-item">
                  <a className="nav-link" href="#">About</a>
                </li>
                <li className=" nav-item">
                  <Link className=" nav-link" to={'/product'}>Games</Link>
                </li>
                <li className="nav-item">
                  <a className="nav-link" href="#">Help</a>
                </li>
                <li className="nav-item">
                  <Link className="nav-link" to={'/article'}>Blog</Link>
                </li>
              </ul>
              <form>
                <input type="text" name="search" className="inputSearch" ref="inputSearch"/>
                <img src="image/loupe.png" width="25" className="mr-4 btnSearch" alt="Loupe"
                     onClick={this.showSearchPanel.bind(this)}/>
              </form>
              <div className="dropdown">
                <a className="dropdown"
                   id="dropdownMenu"
                   data-toggle="dropdown"
                   aria-haspopup="true"
                   aria-expanded="false">
                  <i className="fa fa-user-plus" aria-hidden="true"></i>
                </a>
                <AuthPanel
                  history={this.props.history}
                  logoutUser={this.props.logoutUser}
                  loggedIn={this.props.loggedIn}
                  user={this.props.user}
                />
              </div>
            </div>

            {/*<form className="form-inline mt-2">*/}
            {/*<AuthPanel*/}
            {/*history={this.props.history}*/}
            {/*logoutUser={this.props.logoutUser}*/}
            {/*loggedIn={this.props.loggedIn}*/}
            {/*user={this.props.user}*/}
            {/*/>*/}
            {/*<input*/}
            {/*className="form-control-sm mr-sm-2"*/}
            {/*type="search"*/}
            {/*placeholder="Search"*/}
            {/*aria-label="Search"/>*/}
            {/*<button*/}
            {/*className="btn btn-sm btn-outline-success my-2 my-sm-0"*/}
            {/*type="submit">*/}
            {/*Search*/}
            {/*</button>*/}
            {/*</form>*/}
          </nav>
        </div>
      </header>
    );
  }
}

export default Header;

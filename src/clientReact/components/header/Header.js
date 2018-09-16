import React from 'react';
import ReactPropTypes from 'prop-types';

const Header = ({message}) => {
  return (
    <header>
      <div className="mr-5 ml-5">
        <nav className="navbar navbar-expand-lg  navbar fixed-top navbar-inverse mid">
          <a className="navbar-brand" href="#"><img src="/image/logo5.jpg" width="90" height="65"/></a>
          <button className="navbar-toggler" type="button" data-toggle="collapse" data-target="#navbarTogglerDemo02"
            aria-controls="navbarTogglerDemo02" aria-expanded="false" aria-label="Toggle navigation">
            <span className="navbar-toggler-icon-light"></span>
          </button>

          <div className="collapse navbar-collapse" id="navbarTogglerDemo02">
            <ul className="navbar-nav mr-auto mt-lg-0">
              <li className="nav-item">
                <a className="nav-link h5" href="#">Home</a>
              </li>
              <li className="nav-item">
                <a className="nav-link h5" href="#">About</a>
              </li>
              <li className="nav-item">
                <a className="nav-link h5" href="#">Rent/Buy</a>
              </li>
              <li className="nav-item">
                <a className="nav-link h5" href="#">Help</a>
              </li>
              <li className="nav-item">
                <a className="nav-link h5" href="#">Blog</a>
              </li>
            </ul>
          </div>
          <form className="form-inline mt-2">
            <button className="btn btn-outline-warning my-2 my-sm-0 mr-2" type="submit">
              <a id="lienLogin" href="login.html">Log in</a>
            </button>
            <button className="btn btn-outline-warning my-2 my-sm-0 mr-5" type="submit">
              <a id="lienSignUp" href="signUp.html">Sign up</a>
            </button>
            <input className="form-control mr-sm-2" type="search" placeholder="Search" aria-label="Search"/>
            <button className="btn btn-outline-success my-2 my-sm-0" type="submit">Search</button>
          </form>
        </nav>
      </div>
    </header>
  );
};

// React properties validation. Validates the type of properties
Header.propTypes = {
  message: ReactPropTypes.string.isRequired
};
// Default values for react properties
Header.defaultProps = {
  message: 'Hello Default Props!'
};

export default Header;

import React from 'react';
// import ReactPropTypes from 'prop-types';
import ReactDom from 'react-dom';
import MainPage from '../content/MainPage';
import AuthPanel from './AuthPanel';

const Header = () => {
  const onHome = (e) => {
    e.preventDefault();
    // ReactDom.render(
    //   <MainPage/>,
    //   document.getElementById('mainContent')
    // );
  };
  return (
    <header>
      <div className="mr-5 ml-5">
        <nav className="navbar navbar-expand-lg  navbar fixed-top navbar-inverse mid">
          <a className="navbar-brand" href={''} onClick={onHome}>
            <img src="image/freelogo.PNG" width="90" height="50"/>
          </a>
          <button
            className="navbar-toggler"
            type="button"
            data-toggle="collapse"
            data-target="#navbarTogglerDemo02"
            aria-controls="navbarTogglerDemo02"
            aria-expanded="false"
            aria-label="Toggle navigation">
            <span className="navbar-toggler-icon-light"></span>
          </button>

          <div className="collapse navbar-collapse" id="navbarTogglerDemo02">
            <ul className="navbar-nav mr-auto mt-lg-0">
              <li className="nav-item">
                <a className="nav-link" href="" onClick={onHome}>Home</a>
              </li>
              <li className="nav-item">
                <a className="nav-link" href="#">About</a>
              </li>
              <li className=" nav-item">
                <a className=" nav-link" href="#">Games</a>
              </li>
              <li className="nav-item">
                <a className="nav-link" href="#">Help</a>
              </li>
              <li className="nav-item">
                <a className="nav-link" href="#">Blog</a>
              </li>
            </ul>
          </div>
          <form className="form-inline mt-2">
            <AuthPanel/>
            <input
              className="form-control-sm mr-sm-2"
              type="search"
              placeholder="Search"
              aria-label="Search"/>
            <button className="btn btn-sm btn-outline-success my-2 my-sm-0" type="submit">Search</button>
          </form>
        </nav>
      </div>
    </header>
  );
};

export default Header;

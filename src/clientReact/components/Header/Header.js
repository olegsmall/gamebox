/**
 * Theme: Web Project 2
 * Description: Creating a gaming platform for exchange between players
 * File: Header.js, Header component
 * Authors: Oleg Smolovyk, Iana Kravchenko, Svitlana Melnyk
 * Date: October 2018
 */

import React from 'react';
import AuthPanel from './AuthPanel';
import {Link} from 'react-router-dom';

require('./Header.scss');

/**
 * Class Header, Header component
 */
class Header extends React.Component {
  //Class constructor using for a state props and for initializing state properties
  constructor(props){
    super(props);
    this.state = {
      headerStickToTop: false,
    };
    this.headerAnimation.bind(this);
  }

  /**
   * Scroll menu
   */
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

  /**
   * Show search panel
   */
  showSearchPanel() {
    $(this.refs['inputSearch']).toggle(100, "linear");
  }

  //Component mount method, guaranteed that component was mounted
  componentDidMount() {
    this.headerAnimation();
  }

  //Add to DOM
  render() {

    return (
      <header className={"Header"}>
        <div className="mr-5 ml-5">
          {/*Logo*/}
          <nav className={`navbar navbar-expand-lg  navbar-lignt fixed-top navbar-inverse mid ${this.state.headerStickToTop ? "stickytop" : ""} `}>
            <Link className="navbar-brand" to={'/'}>
              <img src="/image/logo11.png" width="40" height="40"/>
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
            {/*Menu*/}
            <div className="collapse navbar-collapse" id="navbarToggler">
              <ul className="navbar-nav mr-auto mt-sm-0">
                <li className="nav-item">
                  <Link className="nav-link" to={'/'}>Home</Link>
                </li>
                <li className="nav-item">
                  <Link className="nav-link" to={'/about'}>About</Link>
                </li>
                <li className=" nav-item">
                  <Link className=" nav-link" to={'/product'}>Games</Link>
                </li>
                <li className="nav-item">
                  <Link className="nav-link" to={'/article'}>Blog</Link>
                </li>
              </ul>
              {/*Search*/}
              <form>
                <input type="text" name="search" className="inputSearch" ref="inputSearch"/>
                <img src="image/loupe.png" width="25" className="mr-4 btnSearch" alt="Loupe"
                     onClick={this.showSearchPanel.bind(this)}/>
              </form>
              {/*Dropdown Menu*/}
              <div className="dropdown">
                <a className="dropdown"
                   id="dropdownMenu"
                   data-toggle="dropdown"
                   aria-haspopup="true"
                   aria-expanded="false">
                  <i className="fa fa-user-plus" aria-hidden="true"></i>
                </a>
                {/*Section for user authorization*/}
                <AuthPanel
                  history={this.props.history}
                  logoutUser={this.props.logoutUser}
                  user={this.props.user}
                  getShoppingCart={this.props.getShoppingCart}
                />
              </div>
              {/*Cart*/}
              <div className="img-fluid">
                <div>
                  <div className="basketNumber">{this.props.shoppingCart.products ? this.props.shoppingCart.products.length : 0}</div>
                </div>
                <Link to={'/cart'}><img src="image/shopBag1.png" width="25" className="imgBasket"/></Link>
              </div>
            </div>
          </nav>
        </div>
      </header>
    );
  }
}

export default Header;

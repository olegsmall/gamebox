/**
 * Theme: Web Project 2
 * Description: Creating a gaming platform for exchange between players
 * File: App.js, application component
 * Authors: Oleg Smolovyk, Iana Kravchenko, Svitlana Melnyk
 * Date: October 2018
 */

import React from 'react';
import Header from '../Header/Header';
import MainPage from '../content/MainPage';
import Footer from '../Footer/Footer';
import {Route, Switch} from 'react-router-dom';
import LoginPage from '../LoginPage/LoginPage';
import SignUpPage from '../SignUpPage/SignUpPage';
import axios from 'axios';
import AllGamesPage from '../content/AllGamesPage/AllGamesPage';
import GamePage from '../content/GamePage/GamePage';
import UserPage from '../content/UserPage/UserPage';
import AllArticlesPage from '../content/AllArticlesPage/AllArticlesPage';
import ArticlePage from '../content/ArticlePage/ArticlePage';
import AboutPage from '../content/AboutPage/AboutPage';
import ShoppingCart from '../ShoppingCart/ShoppingCart';
import MessageBox from "../common/MessageBox/MessageBox";

require('./App.scss');

/**
 * Class App, application component. It's the parent component
 */
//New syntax can be used for components with state or life cycle methods
class App extends React.Component {
  //we can use constructor for initializing state properties
  //or class property instead.
  //Using class constructor for a state props
  constructor(props) {
    super(props);
    this.state = {
      user: null,
      systemMessage: undefined,
      shoppingCart: {},
    };

    this.getUser();

    this.getShoppingCart = this.getShoppingCart.bind(this);
    this.updateUser = this.updateUser.bind(this);
    this.logoutUser = this.logoutUser.bind(this);
    this.showSystemMessage = this.showSystemMessage.bind(this);
    this.hideSystemMessage = this.hideSystemMessage.bind(this);
  }

  //Using class property for a state
  //Experimental syntax working only with babel plugin babel-plugin-transform-class-properties
  //https://babeljs.io/docs/en/babel-plugin-transform-class-properties/
  // state2 = {test2: 34};

  // Life cycle methods
  //component mount method, guaranteed that component was mounted
  componentDidMount() {
    // this.getShoppingCart();
  }

  componentDidUpdate() {

  }

  componentWillUnmount() {
    // clean timers and listeners
  }

  /**
   * Update user profile
   * @param stateObject
   * @param routeCallback
   */
  updateUser(stateObject, routeCallback = null) {
    this.setState(stateObject, () => routeCallback && routeCallback());
  }

  /**
   * Show system message
   * @param message
   * @param type
   */
  showSystemMessage(message, type = 'success') {
    this.setState({
      systemMessage: {
        message,
        type,
        show: true,
      },
    });
    setTimeout(() => this.hideSystemMessage(), 9000);
  }

  /**
   * Hide system message
   */
  hideSystemMessage() {
    const systemMessage = this.state.systemMessage;
    systemMessage.show = false;
    this.setState({systemMessage});
  }

  /**
   * Get user shopping cart
   */
  getShoppingCart() {

    axios.get('/cart')
      .then(res => {
        this.setState({
          shoppingCart: res.data.cart,
        });
      })
      .catch((error) => {
        console.error(error.response);
      });
  }

  /**
   * Get user profile
   */
  getUser() {
    axios.get('/user/session').then(res => {
      if (res.data.user) {
        this.setState({
          user: res.data.user,
        }, this.getShoppingCart);
      } else {
        this.setState({
          user: null,
          shoppingCart: {},
        });
      }
    })
      .catch((error) => {
        console.error('Get User Method: ')
        console.error(error.response);
      });
  }

  /**
   * User logout
   */
  logoutUser() {
    axios.post('/user/logout')
      .then(response => {
        console.info(response.data.message);
        this.showSystemMessage(response.data.message);
      })
      .catch(error => {
        console.error('Logout error: ');
        console.error(error.response);
      });
    this.setState({
      user: null,
      shoppingCart: {},
    });
  }

  //Add to DOM
  render() {
    const {systemMessage, showSystemMessage} = this.state;

    return (
      <div className={'App d-flex flex-column h-100'}>
        <Header
          history={this.props.history}
          logoutUser={this.logoutUser}
          user={this.state.user}
          shoppingCart={this.state.shoppingCart}
          getShoppingCart={this.getShoppingCart}
        />
        <div id="mainContent">
          {/* Routes to different components */}
          <Switch>
            <Route
              exact path="/"
              render={() => <MainPage/>}/>
            <Route
              path="/user/login"
              render={(props) =>
                <LoginPage
                  {...props}
                  updateUser={this.updateUser}
                  showSystemMessage={this.showSystemMessage}
                  getShoppingCart={this.getShoppingCart}
                />}
            />
            <Route
              path="/user/signup"
              render={(props) => <SignUpPage
                {...props}
                showSystemMessage={this.showSystemMessage}
              />}

            />
            <Route
              exac path="/user"
              render={(props) => <UserPage
                {...props}
                user={this.state.user}
                updateUser={this.updateUser}
                showSystemMessage={this.showSystemMessage}
                logoutUser={this.logoutUser}
              />}
            />
            <Route
              exact path="/product"
              render={() => <AllGamesPage/>}
            />
            <Route
              path="/product/:gameId"
              render={(props) => <GamePage
                {...props}
                showSystemMessage={this.showSystemMessage}
                getShoppingCart={this.getShoppingCart}
                user={this.state.user}
              />}
            />
            <Route
              exact path="/article"
              render={() => <AllArticlesPage/>}
            />
            <Route
              path="/article/:articleId"
              component={ArticlePage}
            />
            <Route
              exact path="/about"
              render={() => <AboutPage/>}
            />
            <Route
              exact path="/cart"
              render={(props) => <ShoppingCart
                {...props}
                getShoppingCart={this.getShoppingCart}
                shoppingCart={this.state.shoppingCart}
                showSystemMessage={this.showSystemMessage}
                user={this.state.user}
              />}
            />
          </Switch>
        </div>
        <Footer/>
        {/* Show system messages component */}
        <MessageBox systemMessage={systemMessage} hideSystemMessage={this.hideSystemMessage}/>
      </div>
    );
  }
}

export default App;

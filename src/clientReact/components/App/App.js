import React from 'react';
// import ReactPropTypes from 'prop-types';
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

// require('../../css/main.scss');

//New syntax can be used for components with state or life cycle methods
class App extends React.Component {
  //we can use constructor for initializing state properties
  //or class property instead.
  //Using class constructor for a state props
  constructor(props) {
    super(props);
    this.state = {
      loggedIn: false,
      email: null,
      user: null,
      systemMessage: undefined,
      shoppingCartProducts: [],
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
    this.getShoppingCart();
  }

  componentWillUnmount() {
    // clean timers and listeners
  }

  updateUser(userObject) {
    this.setState(userObject);
  }

  showSystemMessage(message, type = 'success') {
    this.setState({
      systemMessage: {
        message,
        type,
        show: true,
      },
    });
    setTimeout(() => this.hideSystemMessage(), 5000);
  }

  hideSystemMessage() {
    const systemMessage = this.state.systemMessage;
    systemMessage.show = false;
    this.setState({systemMessage});
  }

  getShoppingCart() {

    if (!this.state.user) return;

    axios.get('/cart')
      .then(res => {
        this.setState({
          shoppingCartProducts: res.data.cart,
        });
      })
      .catch((error) => {
        console.log(error.response);
      });
  }

  getUser() {
    axios.get('/user/session').then(res => {
      if (res.data.user) {
        this.setState({
          loggedIn: true,
          email: res.data.user.email,
          user: res.data.user,
        });
      } else {
        this.setState({
          loggedIn: false,
          email: null,
          user: null,
          shoppingCartProducts: [],
        });
      }
    })
      .catch((error) => {
        console.log(error.response);
      });
  }

  logoutUser() {
    // event.preventDefault();
    axios.post('/user/logout').then(response => {
      console.log(response.data);
      if (response.status === 200) {
        this.updateUser({
          loggedIn: false,
          email: null,
          user: null
        });
      }
    }).catch(error => {
      console.log('Logout error');
    });
  }

  render() {
    const {systemMessage, showSystemMessage} = this.state;

    return (
      <div className={'App d-flex flex-column h-100'}>
        <Header
          history={this.props.history}
          logoutUser={this.logoutUser}
          loggedIn={this.state.loggedIn}
          user={this.state.user}
          shoppingCartProducts={this.state.shoppingCartProducts}
        />
        <div id="mainContent">
          {/* Routes to different components */}
          <Switch>
            <Route
              exact path="/"
              render={() => <MainPage/>}/>
            <Route
              path="/user/login"
              render={() =>
                <LoginPage
                  updateUser={this.updateUser}
                />}
            />
            <Route
              path="/user/signup"
              render={() => <SignUpPage/>}
            />
            <Route
              exac path="/user"
              render={() => <UserPage
                user={this.state.user}
                updateUser={this.updateUser}
                showSystemMessage={this.showSystemMessage}
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
              render={() => <ShoppingCart/>}
            />
          </Switch>
        </div>
        <Footer/>
        {/* Show sysem messages component */}
        <MessageBox systemMessage={systemMessage} hideSystemMessage={this.hideSystemMessage}/>
      </div>
    );
  }
}

export default App;

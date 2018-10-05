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
    };

    this.updateUser = this.updateUser.bind(this);
    this.logoutUser = this.logoutUser.bind(this);
  }

  //Using class property for a state
  //Experimental syntax working only with babel plugin babel-plugin-transform-class-properties
  //https://babeljs.io/docs/en/babel-plugin-transform-class-properties/
  // state2 = {test2: 34};

  // Life cycle methods
  //component mount method, guaranteed that component was mounted
  componentDidMount() {
    this.getUser();
  }

  componentWillUnmount() {
    // clean timers and listeners
  }

  updateUser(userObject) {
    this.setState(userObject);
  }

  getUser() {
    axios.get('/user/session').then(res => {

      console.log(res.data.user);
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
          user: null
        });
      }
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

    return (
      <div className={'App'}>
        <Header
          history={this.props.history}
          logoutUser={this.logoutUser}
          loggedIn={this.state.loggedIn}
          user={this.state.user}
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
              />}
            />
            <Route
              exact path="/product"
              render={() => <AllGamesPage/>}
            />
            <Route
              path="/product/:gameId"
              component={GamePage}
            />
            <Route
              exact path="/article"
              render={() => <AllArticlesPage/>}
            />
            <Route
              path="/article/:articleId"
              component={ArticlePage}
            />
          </Switch>
        </div>
        <Footer/>
      </div>
    );
  }
}

export default App;

import React from 'react';
// import ReactPropTypes from 'prop-types';
import Header from './header/Header';
import MainPage from './content/MainPage';
import Footer from './footer/Footer';
import {BrowserRouter as Router, Route, Link} from 'react-router-dom';
import LoginPage from './content/LoginPage';
import SignUpPage from './content/SignUpPage';
import axios from 'axios';


require('../css/main.scss');

// Sytax for components without state (faster)
// const App = () => {
//   return (
//
//
//   );
// };

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
    };
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
    axios.get('/user/').then(response => {
      console.log('Get user response: ');
      console.log(response.data);
      if (response.data.user) {
        console.log('Get User: There is a user saved in the server session: ');

        this.setState({
          loggedIn: true,
          email: response.data.user.email
        });
      } else {
        console.log('Get user: no user');
        this.setState({
          loggedIn: false,
          email: null
        });
      }
    });
  }

  render() {
    return (
      <Router>
        <div className={'App'}>
          <Header loggedIn={this.state.loggedIn}/>
          {/*<Header updateUser={(userObject)=>this.updateUser(userObject)} loggedIn={this.state.loggedIn}/>*/}
          {this.state.loggedIn &&
          <p>Join the party, {this.state.email}!</p>
          }
          <div id="mainContent">
            {/* Routes to different components */}
            <Route
              exact path="/"
              render={()=><MainPage/>}/>
            <Route
              path="/user/login"
              render={() =>
                <LoginPage
                  updateUser={'sdfsdf'}
                />}
            />
            <Route
              path="/user/signup"
              render={() => <SignUpPage/>}
            />
          </div>
          <Footer/>
        </div>
      </Router>
    );
  }
}

export default App;

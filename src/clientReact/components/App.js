import React from 'react';
// import ReactPropTypes from 'prop-types';
import Header from './header/Header';

require('../css/main.scss');

// Sytax for components without state (faster)
// const App = () => {
//   return (
//
//
//   );
// };

//New syntax can be used for components with state or life cycle methods
class App extends React.Component{
  //we can use constructor for initializing state properties
  //or class property instead.
  //Using class constructor for a state props
  constructor(props){
    super(props);
    this.state = { pageHeader: 'Naming Contests state props'};
  }

  //Using class property for a state
  //Experimental syntax working only with babel plugin babel-plugin-transform-class-properties
  //https://babeljs.io/docs/en/babel-plugin-transform-class-properties/
  // state2 = {test2: 34};

  // Life cycle methods
  //component mount method, guaranteed that component was mounted
  componentDidMount(){
    //code for ajax, timers, listeners
  }
  componentWillUnmount(){
    // clean timers and listeners
  }

  render(){
    return (
      <div className={'App'}>
        <Header message={this.state.pageHeader}/>
        <div>
        </div>
      </div>
    );
  }
}

export default App;
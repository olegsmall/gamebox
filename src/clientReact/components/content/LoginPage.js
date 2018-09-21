import React from 'react';
import { Redirect } from 'react-router-dom';
import Axios from 'axios';

class LoginPage extends React.Component{
  constructor(props) {
    super(props);
    debugger;
    this.state = {
      userEmail: '',
      userPassword: '',
      redirectTo: null,
    };

    this.handleInputChange = this.handleInputChange.bind(this);
    this.handleSubmit = this.handleSubmit.bind(this);
  }

  handleInputChange(event) {
    const target = event.target;
    // const value = target.type === 'checkbox' ? target.checked : target.value;
    const value = target.value;
    const name = target.name;

    this.setState({
      [name]: value
    });
  }

  handleSubmit(event) {
    event.preventDefault();

    const self = this;
    Axios.post('/user/login', {
      email: this.state.userEmail,
      password: this.state.userPassword,
    })
      .then(function(res){
        console.log('login response: ');
        console.log(res);
        if (res.status === 200){
          // update app.js state
          debugger;
          self.props.updateUser({
            loggedIn: true,
            email: res.data.email,
          });
        }
        //update the state to redirect to home
        self.setState({
          redirectTo: '/'
        });
      })
      .catch((error) => {
        console.log('login error: ')
        console.log(error);
      });
  }

  render() {
    return (
      <div id="LoginPage" className="container">
        <div className="row justify-content-center">
          <div className="col-md-5">
            <h3 className="text-center text-light mb-4">Log in</h3>
            <form>
              <div className="form-row">
                <div className="form-group col-md-6">
                  <button className="btn btn-primary btn-block btn-sm">
                    <a className="text-light" href="https://www.facebook.com/">
                      <i className="fa fa-facebook-square mr-2"></i>Continue with Facebook
                    </a>
                  </button>
                </div>
                <div className="form-group col-md-6">
                  <button className="btn btn-primary btn-block btn-sm">
                    <a className="text-light" href="https://www.google.ca/">
                      <i className="fa fa-google-plus-square mr-2"></i>Continue with Google
                    </a>
                  </button>
                </div>
              </div>
            </form>
            <p className="text-center text-light">OR</p>
            <form className="mt-3" onSubmit={this.handleSubmit}>
              <div className="form-group">
                <input
                  name="userEmail"
                  type="email"
                  className="form-control form-control-sm"
                  placeholder="Enter email"
                  value={this.state.userEmail}
                  onChange={this.handleInputChange}/>
              </div>
              <div className="form-group">
                <input
                  name="userPassword"
                  type="password"
                  className="form-control form-control-sm"
                  placeholder="Password"
                  value={this.state.userPassword}
                  onChange={this.handleInputChange}/>
              </div>
              <button type="submit" className="btn btn-warning btn-sm btn-block mt-4">Submit</button>
            </form>
          </div>
        </div>
      </div>
    );
  }
}

export default LoginPage;

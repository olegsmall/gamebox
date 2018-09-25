import React from 'react';
import Axios from 'axios';

require('./SignUpPage.scss');

class SignUpPage extends React.Component {

  constructor(props) {
    super(props);
    this.state = {
      userFirstName: '',
      userLastName: '',
      userEmail: '',
      userPhone: '',
      userAddress: '',
      userPassword: '',
      userPasswordConf: '',
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

    //TODO: validation of form data.

    Axios.post('/user', {
      firstName: this.state.userFirstName,
      lastName: this.state.userLastName,
      email: this.state.userEmail,
      phone: this.state.userPhone,
      address: this.state.userAddress,
      password: this.state.userPassword,
    })
      .then((res) => {
        console.log(res);
      })
      .catch((error) => {
        console.log(error);
      });
  }

  render() {
    return (
      <div className={"SignUp"}>
        <div id="signUp" className="container">
          <div className="row justify-content-center">
            <div className="col-md-6">
              <h3 className="text-center text-light mb-4">Create an account</h3>
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
                <div className="form-row">
                  <div className="form-group col-md-6">
                    <input
                      name="userFirstName"
                      type="text"
                      className="form-control form-control-sm"
                      placeholder="First Name"
                      value={this.state.userFirstName}
                      onChange={this.handleInputChange}/>
                  </div>
                  <div className="form-group col-md-6">
                    <input
                      name="userLastName"
                      type="text"
                      className="form-control form-control-sm"
                      placeholder="Last Name"
                      value={this.state.userLastName}
                      onChange={this.handleInputChange}/>
                  </div>
                </div>
                <div className="form-row">
                  <div className="form-group col-md-6">
                    <input
                      name="userEmail"
                      type="email"
                      className="form-control form-control-sm"
                      placeholder="E-mail"
                      value={this.state.userEmail}
                      onChange={this.handleInputChange}/>
                  </div>
                  <div className="form-group col-md-6">
                    <input
                      name="userPhone"
                      type="text"
                      className="form-control form-control-sm"
                      placeholder="Phone number"
                      value={this.state.userPhone}
                      onChange={this.handleInputChange}/>
                  </div>
                </div>
                <div className="form-group">
                  <input
                    name="userAddress"
                    type="text"
                    className="form-control form-control-sm"
                    placeholder="Address"
                    value={this.state.userAddress}
                    onChange={this.handleInputChange}/>
                </div>
                <div className="form-row">
                  <div className="form-group col-md-6">
                    <input
                      name="userPassword"
                      type="password"
                      className="form-control form-control-sm"
                      placeholder="Password"
                      value={this.state.userPassword}
                      onChange={this.handleInputChange}/>
                  </div>
                  <div className="form-group col-md-6">
                    <input
                      name="userPasswordConf"
                      type="password"
                      className="form-control form-control-sm"
                      placeholder="Confirm your password"
                      value={this.state.userPasswordConf}
                      onChange={this.handleInputChange}/>
                  </div>
                </div>
                <button type="submit" className="btn btn-sm btn-block mt-3">Create your account</button>
              </form>
            </div>
          </div>
        </div>
      </div>
    );
  }
}

export default SignUpPage;

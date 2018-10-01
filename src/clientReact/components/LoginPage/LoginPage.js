import React from 'react';
import {Redirect, withRouter} from 'react-router-dom';
import Axios from 'axios';
import {Formik} from 'formik';
import * as Yup from 'yup';

require('./LoginPage.scss');

class LoginPage extends React.Component {
  constructor(props) {
    super(props);
    // this.state = {
    //   userEmail: '',
    //   userPassword: '',
    // };

    // this.handleInputChange = this.handleInputChange.bind(this);
    // this.handleSubmit = this.handleSubmit.bind(this);
  }

  // handleInputChange(event) {
  //   const target = event.target;
  //   // const value = target.type === 'checkbox' ? target.checked : target.value;
  //   const value = target.value;
  //   const name = target.name;
  //
  //   this.setState({
  //     [name]: value
  //   });
  // }

  handleSubmit(values, actions) {
    // event.preventDefault();

    // setTimeout(() => {
    //   alert(JSON.stringify(values, null, 2));
    //   setSubmitting(false);
    // }, 400);

    const self = this;
    Axios.post('/user/login', {
      email: values.email,
      password: values.password,
    })
      .then(function (res) {
        console.log('login response: ');
        console.log(res);
        if (res.status === 200) {
          actions.setSubmitting(false);
          // update app.js state
          self.props.updateUser({
            loggedIn: true,
            email: res.data.user.email,
            user: res.data.user,
          });
          self.props.history.push('/user');
        }

      })
      .catch((error) => {
        actions.setSubmitting(false);
        alert('User name or password is incorrect!');
        console.log('login error: ');
        console.log(error);
      });
  }

  render() {
    return (
      <div className={"LoginPage"}>
        <div id="LoginPage" className="container">
          <div className="row justify-content-center">
            <div className="col-md-5">
              <h3 className="text-center text-light mb-4">Log in</h3>
              <Formik
                initialValues={{email: '', password: ''}}
                validationSchema={Yup.object().shape({
                  email: Yup.string()
                    .email()
                    .required('Required'),
                  password: Yup.string()
                    .required('Required'),
                })}
                onSubmit={(values, actions) => this.handleSubmit(values, actions)}
              >
                {({
                    values,
                    errors,
                    touched,
                    handleChange,
                    handleBlur,
                    handleSubmit,
                    isSubmitting,
                    /* and other goodies */
                  }) => (

                  <form className="mt-3" onSubmit={handleSubmit}>
                    <div className="form-group">
                      <input
                        type="email"
                        name="email"
                        className="form-control form-control-sm"
                        placeholder="Enter email"
                        onChange={handleChange}
                        onBlur={handleBlur}
                        value={values.email}
                        formNoValidate={true}
                      />
                      {errors.email && touched.email && errors.email}
                    </div>
                    <div className="form-group">
                      <input
                        name="password"
                        type="password"
                        className="form-control form-control-sm"
                        placeholder="Password"
                        onChange={handleChange}
                        onBlur={handleBlur}
                        value={values.password}
                      />
                      {errors.password && touched.password && errors.password}
                    </div>
                    <button
                      type="submit"
                      className="btn btn-sm btn-block mt-4"
                      disabled={isSubmitting}
                    >
                      Submit
                    </button>
                  </form>
                )}
              </Formik>
              {/*<form>*/}
                {/*<div className="form-row">*/}
                  {/*<div className="form-group col-md-6">*/}
                    {/*<button className="btn btn-primary btn-block btn-sm">*/}
                      {/*<a className="text-light" href="https://www.facebook.com/">*/}
                        {/*<i className="fa fa-facebook-square mr-2"></i>Continue with Facebook*/}
                      {/*</a>*/}
                    {/*</button>*/}
                  {/*</div>*/}
                  {/*<div className="form-group col-md-6">*/}
                    {/*<button className="btn btn-primary btn-block btn-sm">*/}
                      {/*<a className="text-light" href="https://www.google.ca/">*/}
                        {/*<i className="fa fa-google-plus-square mr-2"></i>Continue with Google*/}
                      {/*</a>*/}
                    {/*</button>*/}
                  {/*</div>*/}
                {/*</div>*/}
              {/*</form>*/}
              {/*<p className="text-center text-light">OR</p>*/}
            </div>
          </div>
        </div>
      </div>
    );
  }
}

export default withRouter(LoginPage);

import React from 'react';
import {Redirect, Link, withRouter} from 'react-router-dom';
import axios from 'axios';
import {Formik} from 'formik';
import * as Yup from 'yup';

require('./LoginPage.scss');

class LoginPage extends React.Component {

  handleSubmit(values, actions) {
    console.log("Values of login");
    console.log(values);
    const self = this;
    axios.post('/user/login', {
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
        console.log(error.response);
      });
  }

  render() {
    return (
      <div className={"LoginPage"}>
        <div id="log" className="container">
          <div className="row justify-content-center">
            <div className="col-md-4 text-center">
              <img src="/image/logo1.png" width="80" height="80"/>
              <p className="mt-1">GameBox</p>
              <Formik
                initialValues={{email: '', password: ''}}
                validationSchema={Yup.object().shape({
                  email: Yup.string()
                    .email('* Email is not correct')
                    .required('* Email is required'),
                  password: Yup.string()
                    .required('* Password is required'),
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

                  <form className="mt-5" onSubmit={handleSubmit}>
                    <div className="form-group">
                      <input
                        type="email"
                        name="email"
                        className="form-control inputLog"
                        placeholder="Enter email"
                        onChange={handleChange}
                        onBlur={handleBlur}
                        value={values.email}
                        formNoValidate={true}
                      />
                      <small
                        className="form-text text-left error">{errors.email && touched.email && errors.email}</small>
                    </div>
                    <div className="form-group">
                      <input
                        name="password"
                        type="password"
                        className="form-control inputLog"
                        placeholder="Password"
                        onChange={handleChange}
                        onBlur={handleBlur}
                        value={values.password}
                      />
                      <small
                        className="form-text text-left error">{errors.password && touched.password && errors.password}</small>
                    </div>
                    <button
                      type="submit"
                      className="btn btn-block mt-3 btnLog"
                      disabled={isSubmitting}
                    >
                      Log in to GameBox
                    </button>
                  </form>
                )}
              </Formik>
              <Link to={'/user/signup'}><p className="mt-3">Create your free GameBox Account</p></Link>
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

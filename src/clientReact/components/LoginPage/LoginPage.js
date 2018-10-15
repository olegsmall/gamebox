/**
 * Theme: Web Project 2
 * Description: Creating a gaming platform for exchange between players
 * File: LoginPage.js, Log in page component
 * Authors: Oleg Smolovyk, Iana Kravchenko, Svitlana Melnyk
 * Date: October 2018
 */

import React from 'react';
import {Redirect, Link, withRouter} from 'react-router-dom';
import axios from 'axios';
import {Formik, Form, Field, ErrorMessage} from 'formik';
import * as Yup from 'yup';

require('./LoginPage.scss');

/**
 * Class LoginPage, Log in page component
 */
class LoginPage extends React.Component {
  //Class constructor using for a state props and for initializing state properties
  constructor(props){
    super(props);
    this.handleSubmit = this.handleSubmit.bind(this);
  }

  /**
   * User Login
   * @param values
   * @param actions
   */
  handleSubmit(values, actions) {
    const self = this;
    axios.post('/user/login', {
      email: values.email,
      password: values.password,
    })
      .then(function (res) {
        if (res.status === 200) {
          actions.setSubmitting(false);
          // update app.js state
          self.props.updateUser(
            {
              user: res.data.user,
            },
            ()=>{
              self.props.getShoppingCart();
              self.props.history.push('/user');
            }
          );
        }
      })
      .catch((error) => {
        actions.setSubmitting(false);
        console.error('login page error: ');
        console.error(error.response);
        self.props.showSystemMessage(error.response.data.message, 'error');
      });
  }

  //Add to DOM
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
                {({isSubmitting}) => (
                  <Form className="mt-5">
                    <div className="form-group">
                      <Field type="email" name="email" className="form-control inputLog" placeholder="Enter email"/>
                      <ErrorMessage name="email">{msg => <small
                        className='form-text text-left error'>{msg}</small>}</ErrorMessage>
                    </div>
                    <div className="form-group">
                      <Field name="password" type="password" className="form-control inputLog" placeholder="Password"/>
                      <ErrorMessage name="password">{msg => <small
                        className='form-text text-left error'>{msg}</small>}</ErrorMessage>
                    </div>
                    <button
                      type="submit"
                      className="btn btn-block mt-3 btnLog"
                      disabled={isSubmitting}
                    >
                      Log in to GameBox
                    </button>
                  </Form>
                )}
              </Formik>
              <Link to={'/user/signup'}><p className="mt-3">Create your free GameBox Account</p></Link>
            </div>
          </div>
        </div>
      </div>
    );
  }
}

export default LoginPage;

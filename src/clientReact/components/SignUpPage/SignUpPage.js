/**
 * Theme: Web Project 2
 * Description: Creating a gaming platform for exchange between players
 * File: SignUpPage.js, Sign up page component
 * Authors: Oleg Smolovyk, Iana Kravchenko, Svitlana Melnyk
 * Date: October 2018
 */

import React from 'react';
import Axios from 'axios';
import {Formik, Form, Field, ErrorMessage} from 'formik';
import * as Yup from 'yup';
import Thumb from '../common/Thumb/Thumb';

require('./SignUpPage.scss');

/**
 * Class SignUpPage, Sign up page component
 */
class SignUpPage extends React.Component {

  /**
   * User sign up
   * @param values
   * @param actions
   */
  handleSubmit(values, actions) {

    if (values === undefined) return;

    let formData = new FormData();
    // formData.append('avatar', values.avatar, (values.avatar !== null) ? values.avatar.name : null);
    formData.append('firstName', values.firstName);
    formData.append('lastName', values.lastName);
    formData.append('email', values.email);
    formData.append('phone', values.phone);
    formData.append('address', values.address);
    formData.append('password', values.password);

    Axios.post('/user', formData)
      .then((res) => {
        this.props.showSystemMessage(res.data.message);
        actions.setSubmitting(false);
        this.props.history.push('/');
      })
      .catch((error) => {
        console.error(error);
        this.props.showSystemMessage(error.response.data.message, 'error');
        actions.setSubmitting(false);
      });
  }

  render() {
    return (
      <div className={'SignUp'}>
        <div id="sign" className="container">
          <div className="row justify-content-center">
            <div className="col-md-3 text-center mb-0 mb-md-5">
              <img src="image/logo1.png" width="80" height="80"/>
              <p className="mt-1">Join to GameBox</p>
            </div>
          </div>

          <Formik
            initialValues={{
              avatar: null,
              firstName: '',
              lastName: '',
              email: '',
              phone: '',
              address: '',
              password: '',
              passwordConf: '',

            }}
            validationSchema={Yup.object().shape({
              firstName: Yup.string()
                .min(3)
                .max(30)
                .required('* Fist name is required'),
              lastName: Yup.string()
                .max(30),
              email: Yup.string()
                .email()
                .required('* Email is required'),
              phone: Yup.string(),
              address: Yup.string()
                .max(50),
              password: Yup.string()
                .required('* Password is required'),
              passwordConf: Yup.string()
                .oneOf([Yup.ref('password'), null], 'Passwords don\'t match')
                .required('* Password confirmation is required'),
            })}
            onSubmit={(values, actions) => this.handleSubmit(values, actions)}
          >
            {({
                values,
                errors,
                touched,
                isSubmitting,
                setFieldValue,
              }) => (
              <Form className="row">
                <div className="col-md-4 text-center">
                  <div className="mt-2 mb-2">
                    <Thumb
                    className="img-thumbnail w-50 mb-3 imgAvatar"
                    file={values.avatar}
                    defaultImage={'/image/default/default_avatar.png'}
                    size={{width: 100, height: 200 }}
                    />
                  </div>
                  <div className="custom-file w-50">
                  <input name="file" type="file" className="custom-file-input" id="customFile" placeholder="Avatar"
                  onChange={event => setFieldValue('avatar', event.currentTarget.files[0])}
                  />
                  <label className="custom-file-label inputLog" htmlFor="customFile">Avatar</label>
                  </div>
                </div>
                <div className="col-md-8 text-center">
                  <div className="mt-4 mt-md-2">
                    <div className="form-row">
                      <div className="form-group col-md-6">
                        <Field name="firstName" type="text" className="form-control inputLog" placeholder="First Name"/>
                        <ErrorMessage name="firstName">{msg => <small
                          className='form-text text-left error'>{msg}</small>}</ErrorMessage>
                      </div>
                      <div className="form-group col-md-6">
                        <Field name="lastName" type="text" className="form-control inputLog" placeholder="Last Name"/>
                        <ErrorMessage name="lastName">{msg => <small
                          className='form-text text-left error'>{msg}</small>}</ErrorMessage>
                      </div>
                    </div>
                    <div className="form-row">
                      <div className="form-group col-md-6">
                        <Field name="email" type="email" className="form-control inputLog" placeholder="E-mail"/>
                        <ErrorMessage name="email">{msg => <small
                          className='form-text text-left error'>{msg}</small>}</ErrorMessage>
                      </div>
                      <div className="form-group col-md-6">
                        <Field name="phone" type="text" className="form-control inputLog" placeholder="Phone number"/>
                        <ErrorMessage name="phone">{msg => <small
                          className='form-text text-left error'>{msg}</small>}</ErrorMessage>
                      </div>
                    </div>
                    <div className="form-group">
                      <Field name="address" type="text" className="form-control inputLog" placeholder="Address"/>
                      <ErrorMessage name="address">{msg => <small
                        className='form-text text-left error'>{msg}</small>}</ErrorMessage>
                    </div>
                    <div className="form-row">
                      <div className="form-group col-md-6">
                        <Field name="password" type="password" className="form-control inputLog"
                               placeholder="Password"/>
                        <ErrorMessage name="password">{msg => <small
                          className='form-text text-left error'>{msg}</small>}</ErrorMessage>
                      </div>
                      <div className="form-group col-md-6">
                        <Field name="passwordConf" type="password" className="form-control inputLog"
                               placeholder="Confirm your password"/>
                        <ErrorMessage name="passwordConf">{msg => <small
                          className='form-text text-left error'>{msg}</small>}</ErrorMessage>
                      </div>
                    </div>
                    <button
                      type="submit"
                      className="btn btn-block mt-2 btnLog"
                      disabled={isSubmitting}
                    >
                      Create your account
                    </button>
                  </div>
                </div>
              </Form>
            )}
          </Formik>
        </div>
      </div>
    );
  }
}

export default SignUpPage;

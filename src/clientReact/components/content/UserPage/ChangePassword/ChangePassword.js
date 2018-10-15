/**
 * Theme: Web Project 2
 * Description: Creating a gaming platform for exchange between players
 * File: ChangePassword.js, Change user password component
 * Authors: Oleg Smolovyk, Iana Kravchenko, Svitlana Melnyk
 * Date: October 2018
 */

import React from 'react';
import axios from "axios";
import {Formik, Form, Field, ErrorMessage} from 'formik';
import * as Yup from "yup";

require('./ChangePassword.scss');

/**
 * Class ChangePassword, Change user password component
 */
class ChangePassword extends React.Component {

  /**
   * Change user password
   * @param values
   * @param actions
   */
  handleSubmit(values, actions) {
    axios.put('/user/password', {
      password: values.password,
    })
      .then((res) => {
        this.props.showSystemMessage(res.data.message);
        this.props.changeInner('Profile');
        actions.setSubmitting(false);
      })
      .catch((error) => {
        this.props.showSystemMessage(res.data.message);
        actions.setSubmitting(false);
      });
  }

  //Add to DOM
  render() {

    return (
      <div className={'ChangePassword col-md-8 text-center'}>
        <Formik
          initialValues={{
            password: '',
            passwordConf: '',

          }}
          validationSchema={Yup.object().shape({
            password: Yup.string()
              .required('* Password is required'),
            passwordConf: Yup.string()
              .oneOf([Yup.ref('password'), null], 'Passwords don\'t match')
              .required('* Password confirmation is required'),
          })}
          onSubmit={(values, actions) => this.handleSubmit(values, actions)}
        >
          {({values, setFieldValue, isSubmitting}) => (
            <Form className="text-center formChangePassword">
              <div className="form-row mt-2">
                <div className="form-group col-md-6">
                  <Field name="password" type="password" className="form-control inputPass"
                         placeholder="Your password"/>
                  <ErrorMessage name="password">{msg => <small
                    className='form-text text-left error'>{msg}</small>}</ErrorMessage>
                </div>
                <div className="form-group col-md-6">
                  <Field name="passwordConf" type="password" className="form-control inputPass"
                         placeholder="Your new password"/>
                  <ErrorMessage name="passwordConf">{msg => <small
                    className='form-text text-left error'>{msg}</small>}</ErrorMessage>
                </div>
                <div className="form-group col-md-12">
                  <button
                    type="submit"
                    className="btn-block btn mt-2 btnPass"
                    disabled={isSubmitting}
                  >
                    Save new password
                  </button>
                  <a
                    className="btn-block btn mt-2 btnPass"
                    href=''
                    onClick={this.props.goToProfile}>
                    Close
                  </a>
                </div>
              </div>
            </Form>
          )}
        </Formik>
      </div>
    );
  }

}

export default ChangePassword;

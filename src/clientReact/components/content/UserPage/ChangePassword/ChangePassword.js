import React from 'react';
import {Link} from 'react-router-dom';
import Axios from "axios";
import {Formik, Form, Field, ErrorMessage} from 'formik';
import * as Yup from "yup";

require('./ChangePassword.scss');

class ChangePassword extends React.Component {

  handleSubmit(values, actions) {
    Axios.put('/user/password', {
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

  render() {

    return (
      <div className={'ChangePassword'}>
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

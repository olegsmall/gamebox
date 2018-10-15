/**
 * Theme: Web Project 2
 * Description: Creating a gaming platform for exchange between players
 * File: EditUserRights.js, Edit user rights component
 * Authors: Oleg Smolovyk, Iana Kravchenko, Svitlana Melnyk
 * Date: October 2018
 */

import React from 'react';
import axios from "axios";
import {Formik, Form, Field, ErrorMessage} from 'formik';
import * as Yup from "yup";

require('./EditUserRights.scss');

/**
 * Class EditUserRights, Edit user rights component
 */
export default class EditUserRights extends React.Component {
  //Class constructor using for a state props and for initializing state properties
  constructor(props) {
    super(props);

    this.state = {};

  }

  /**
   * Bannir member
   * @param values
   * @param actions
   */
  handleSubmitBan(values, actions){

    const req = {status: 'banned'};
    if (values.banType === 'temporary'){
      req.expires = values.daysOfBan;
    }

    axios.put(`/user/${this.props.userForEdit._id}/status`, req)
      .then((res) => {
        // this.getDeactivatedUsersList();
        this.props.showSystemMessage(res.data.message);

      })
      .catch((error) => {
        console.error(error.response);
        this.props.showSystemMessage(error.response.data.message, 'error');
      });
  }

  /**
   * Change member role
   * @param values
   * @param actions
   */
  handleSubmitRole(values, actions){
    axios.put('/user/role', {
      id: this.props.userForEdit._id,
      role: values.role
    })
      .then((res) => {
        // this.getDeactivatedUsersList();
        this.props.showSystemMessage(res.data.message);
        actions.setSubmitting(false);

      })
      .catch((error) => {
        console.error(error.response);
        this.props.showSystemMessage(error.response.data.message, 'error');
        actions.setSubmitting(false);
      });
  }

  //Add to DOM
  render() {
    const {userForEdit} = this.props;
    if (!userForEdit) return null;

    return (
      <div className="col-md-8 text-center mt-5">
        <h5 className="text-center">Users Access Rights</h5>
        <div className="text-left">
          <div className="mt-3">
            <span>User: </span><span>{`${userForEdit.firstName} ${userForEdit.lastName}`}</span>
          </div>
          <div>
            <span>Email: </span><span>{userForEdit.email}</span>
          </div>
          <div>
            <span>Telephone: </span><span>{userForEdit.phone}</span>
          </div>
          <div>
            <span>Address: </span><span>{userForEdit.address}</span>
          </div>
        </div>
        <Formik
          initialValues={{
            banType: 'permanent',
            daysOfBan: 10,

          }}
          validationSchema={Yup.object().shape({
            banType: Yup.string()
              .required('* Select peyment type'),
            daysOfBan: Yup.number()
              .when('banType', {
                is: val => val==='temporary',
                then: Yup.number()
                  .integer('* Days must be an integer')
                  .positive('* Days must be positive')
                  .min(1, '* You cat ban minimum for 1 day')
                  .required('* Days is required'),
                otherwise: Yup.number().notRequired(),
              })
          })}
          onSubmit={(values, actions) => this.handleSubmitBan(values, actions)}
        >
          {({values, isSubmitting}) => (
            <Form className="form-group text-left mt-5">
              <div className="form-check">
                <label className="form-check-label" >
                  <Field className="form-check-input"
                         type="radio"
                         name="banType"
                         value="temporary"
                         checked={values.banType === 'temporary'}/>
                  Temporary ban
                </label>
                <label>
                  <Field type="number" name="daysOfBan" className="ml-2 mr-2"/>
                  days
                </label>
              </div>
              <div className="form-check">
                <label className="form-check-label" >
                  <Field className="form-check-input"
                         type="radio"
                         name="banType"
                         value="permanent"
                         checked={values.banType === 'permanent'}/>
                  Permanent ban
                </label>
                <ErrorMessage name="banType">{msg => <small className='form-text text-left error'>{msg}</small>}</ErrorMessage>
                <ErrorMessage name="daysOfBan">{msg => <small className='form-text text-left error'>{msg}</small>}</ErrorMessage>
              </div>
              <button type="submit" disabled={isSubmitting} className="ml-2 mt-2 btn-sm">Confirm</button>
            </Form>
          )}
        </Formik>

        <Formik
          initialValues={{
            role: userForEdit.role,
          }}
          validationSchema={Yup.object().shape({
            role: Yup.string()
              .required('* Role is required'),
          })}
          onSubmit={(values, actions) => this.handleSubmitRole(values, actions)}
        >
          {({values, isSubmitting}) => (
            <Form className="form-group text-left mt-5">
              <h5 className="text-center">Users Role</h5>
              <div className="form-check mt-2">
                <Field name="role" className="form-control" component="select">
                  <option value="User" selected={userForEdit.role === 'User'}>User</option>
                  <option value="Administrator" selected={userForEdit.role === 'Administrator'}>Administrator</option>
                </Field>
                <ErrorMessage name="role">{msg => <small className='form-text text-left error'>{msg}</small>}</ErrorMessage>
              </div>
              <button type="submit" disabled={isSubmitting} className="ml-2 mt-3 btn-sm">Add Role</button>
            </Form>
          )}
        </Formik>
      </div>
    );
  }
}



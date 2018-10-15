/**
 * Theme: Web Project 2
 * Description: Creating a gaming platform for exchange between players
 * File: EditProfile.js, Edit user profile component
 * Authors: Oleg Smolovyk, Iana Kravchenko, Svitlana Melnyk
 * Date: October 2018
 */

import React from 'react';
import Axios from "axios";
import {Formik} from 'formik';
import * as Yup from 'yup';
import Thumb from "../../../common/Thumb/Thumb";

require('./EditProfile.scss');

/**
 * Class EditProfile, Edit user profile component
 */
class EditProfile extends React.Component {

  /**
   * Edit user profile
   * @param values
   * @param actions
   */
  handleSubmit(values, actions) {
    let formData = new FormData();
    if (values.avatar) {
      formData.append('avatar', values.avatar, values.avatar.name);
    }
    formData.append('firstName', values.firstName);
    formData.append('lastName', values.lastName);
    formData.append('phone', values.phone);
    formData.append('address', values.address);

    const self = this;
    Axios.put('/user', formData)
      .then((res) => {
        self.props.showSystemMessage(res.data.message);
        actions.setSubmitting(false);
        self.props.updateUser({user: res.data.user});
        self.props.changeInner('Profile');
      })
      .catch((error) => {
        console.error(error.response);
        self.props.showSystemMessage(error.message, 'error');
        actions.setSubmitting(false);
      });
  }

  //Add to DOM
  render() {

    return (
      <div className={'EditProfile col-md-8 text-center'}>
        <Formik
          initialValues={{
            avatar: null,
            firstName: this.props.user.firstName,
            lastName: this.props.user.lastName,
            phone: this.props.user.phone,
            address: this.props.user.address,
          }}
          validationSchema={Yup.object().shape({
            firstName: Yup.string()
              .min(3)
              .max(30)
              .required('* Required'),
            lastName: Yup.string()
              .max(30),
            phone: Yup.string(),
            address: Yup.string()
              .max(50),
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
              setFieldValue,
            }) => (
            <form className="text-center" onSubmit={handleSubmit}>
                  <Thumb className="mt-2" file={values.avatar} object={this.props.user}/>
                  <input
                    name="file"
                    type="file"
                    className="mt-3 w-30"
                    placeholder="Avatar"
                    onChange={event => setFieldValue('avatar', event.currentTarget.files[0])}
                  />
              <div className="form-row mt-2">
                <div className="form-group col-md-6">
                  <input
                    name="firstName"
                    type="text"
                    className="form-control inputEdit"
                    placeholder="First Name"
                    onChange={handleChange}
                    onBlur={handleBlur}
                    value={values.firstName}
                  />
                  <small className="form-text text-left error">{errors.firstName && touched.firstName && errors.firstName}</small>
                </div>
                <div className="form-group col-md-6">
                  <input
                    name="lastName"
                    type="text"
                    className="form-control inputEdit"
                    placeholder="Last Name"
                    onChange={handleChange}
                    onBlur={handleBlur}
                    value={values.lastName}
                  />
                  <small className="form-text text-left error">{errors.lastName && touched.lastName && errors.lastName}</small>
                </div>
                <div className="form-group col-md-12">
                  <input
                    name="address"
                    type="text"
                    className="form-control inputEdit"
                    placeholder="Address"
                    onChange={handleChange}
                    onBlur={handleBlur}
                    value={values.address}
                  />
                  <small className="form-text text-left error">{errors.address && touched.address && errors.address}</small>
                </div>
                <div className="form-group col-md-12">
                  <input
                    name="phone"
                    type="text"
                    className="form-control inputEdit"
                    placeholder="Phone number"
                    onChange={handleChange}
                    onBlur={handleBlur}
                    value={values.phone}
                  />
                  <small className="form-text text-left error">{errors.phone && touched.phone && errors.phone}</small>
                </div>
              </div>
              <button
                type="submit"
                className="btn btn-block my-2 btnEdit">
                Save profile
              </button>
            </form>
          )}
        </Formik>
      </div>
    );
  }

}

export default EditProfile;

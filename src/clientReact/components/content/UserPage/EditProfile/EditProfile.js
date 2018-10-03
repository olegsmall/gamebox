import React from 'react';
import {Link} from 'react-router-dom';
import Axios from "axios";
import {Formik} from 'formik';
import * as Yup from 'yup';
import Thumb from "../../../common/Thumb/Thumb";

require('./EditProfile.scss');

class EditProfile extends React.Component {

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
        self.props.showMessage(res.data.message);
        actions.setSubmitting(false);
        self.props.updateUser({user: res.data.user});
        self.props.changeInner('Profile');
      })
      .catch((error) => {
        console.log(error);
        self.props.showMessage(error.message);
        actions.setSubmitting(false);
      });
  }

  render() {

    return (
      <div className={'EditProfile'}>
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
              .required('Required'),
            lastName: Yup.string()
              .min(3)
              .max(30),
            phone: Yup.string(),
            address: Yup.string()
              .min(5)
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
            <form className="mt-3" onSubmit={handleSubmit}>
              <div className="form-row">
                <div className="form-group col-md-6">
                  <Thumb file={values.avatar} user={this.props.user}/>
                  <input
                    name="file"
                    type="file"
                    className="form-control form-control-sm"
                    placeholder="Avatar"
                    onChange={event => setFieldValue('avatar', event.currentTarget.files[0])}
                  />
                </div>
                <div className="form-group col-md-6">
                  <input
                    name="firstName"
                    type="text"
                    className="form-control form-control-sm"
                    placeholder="First Name"
                    onChange={handleChange}
                    onBlur={handleBlur}
                    value={values.firstName}
                  />
                  {errors.firstName && touched.firstName && errors.firstName}
                </div>
                <div className="form-group col-md-6">
                  <input
                    name="lastName"
                    type="text"
                    className="form-control form-control-sm"
                    placeholder="Last Name"
                    onChange={handleChange}
                    onBlur={handleBlur}
                    value={values.lastName}
                  />
                  {errors.lastName && touched.lastName && errors.lastName}
                </div>
                <div className="form-group col-md-6">
                  <input
                    name="phone"
                    type="text"
                    className="form-control form-control-sm"
                    placeholder="Phone number"
                    onChange={handleChange}
                    onBlur={handleBlur}
                    value={values.phone}
                  />
                  {errors.phone && touched.phone && errors.phone}
                </div>
                <div className="form-group col-md-6">
                  <input
                    name="address"
                    type="text"
                    className="form-control form-control-sm"
                    placeholder="Address"
                    onChange={handleChange}
                    onBlur={handleBlur}
                    value={values.address}
                  />
                  {errors.address && touched.address && errors.address}
                </div>
              </div>
              <button
                type="submit"
                className="btn btn-sm btn-block mb-3 buttonEditProfile">
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

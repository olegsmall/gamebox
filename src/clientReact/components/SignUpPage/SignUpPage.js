import React from 'react';
import Axios from 'axios';
import {Formik} from 'formik';
import * as Yup from 'yup';
import Thumb from '../common/Thumb/Thumb';

require('./SignUpPage.scss');

class SignUpPage extends React.Component {

  handleSubmit(values, actions) {
    let formData = new FormData();
    formData.append('avatar', values.avatar, (values.avatar !== null) ? values.avatar.name : null);
    formData.append('firstName', values.firstName);
    formData.append('lastName', values.lastName);
    formData.append('email', values.email);
    formData.append('phone', values.phone);
    formData.append('address', values.address);
    formData.append('password', values.password);

    Axios.post('/user', formData)
      .then((res) => {
        actions.setSubmitting(false);
      })
      .catch((error) => {
        console.log(error);
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
                    .min(3)
                    .max(30),
                  email: Yup.string()
                    .email()
                    .required('* Email is required'),
                  phone: Yup.string(),
                  address: Yup.string()
                    .min(5)
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
                  handleChange,
                  handleBlur,
                  handleSubmit,
                  isSubmitting,
                  setFieldValue,
                }) => (
                  <form className="row" onSubmit={handleSubmit}>
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
                        <input
                          name="file"
                          type="file"
                          className="custom-file-input"
                          id="customFile"
                          placeholder="Avatar"
                          onChange={event => setFieldValue('avatar', event.currentTarget.files[0])}
                        />
                        <label className="custom-file-label inputLog" htmlFor="customFile">Avatar</label>
                      </div>
                    </div>
                    <div className="col-md-8 text-center">
                      <div className="mt-4 mt-md-2">
                        <div className="form-row">
                          <div className="form-group col-md-6">
                            <input
                              name="firstName"
                              type="text"
                              className="form-control inputLog"
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
                              className="form-control inputLog"
                              placeholder="Last Name"
                              onChange={handleChange}
                              onBlur={handleBlur}
                              value={values.lastName}
                            />
                            <small className="form-text text-left error">{errors.lastName && touched.lastName && errors.lastName}</small>
                          </div>
                        </div>
                        <div className="form-row">
                          <div className="form-group col-md-6">
                            <input
                              name="email"
                              type="email"
                              className="form-control inputLog"
                              placeholder="E-mail"
                              onChange={handleChange}
                              onBlur={handleBlur}
                              value={values.email}
                            />
                              <small className="form-text text-left error">{errors.email && touched.email && errors.email}</small>
                          </div>
                          <div className="form-group col-md-6">
                            <input
                              name="phone"
                              type="text"
                              className="form-control inputLog"
                              placeholder="Phone number"
                              onChange={handleChange}
                              onBlur={handleBlur}
                              value={values.phone}
                            />
                            <small className="form-text text-left error">{errors.phone && touched.phone && errors.phone}</small>
                          </div>
                        </div>
                        <div className="form-group">
                          <input
                            name="address"
                            type="text"
                            className="form-control inputLog"
                            placeholder="Address"
                            onChange={handleChange}
                            onBlur={handleBlur}
                            value={values.address}
                          />
                          <small className="form-text text-left error">{errors.address && touched.address && errors.address}</small>
                        </div>
                        <div className="form-row">
                          <div className="form-group col-md-6">
                            <input
                              name="password"
                              type="password"
                              className="form-control inputLog"
                              placeholder="Password"
                              onChange={handleChange}
                              onBlur={handleBlur}
                              value={values.password}
                            />
                              <small className="form-text text-left error">{errors.password && touched.password && errors.password}</small>
                          </div>
                          <div className="form-group col-md-6">
                            <input
                              name="passwordConf"
                              type="password"
                              className="form-control inputLog"
                              placeholder="Confirm your password"
                              onChange={handleChange}
                              onBlur={handleBlur}
                              value={values.passwordConf}
                            />
                              <small className="form-text text-left error">{errors.passwordConf && touched.passwordConf && errors.passwordConf}</small>
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
                  </form>
                )}
                </Formik>

                {/*//   <form className="mt-3" onSubmit={handleSubmit}>*/}
                {/*//   <div className="form-row">*/}
                {/*//   <div className="form-group col-md-6">*/}
                {/*//   <Thumb file={values.avatar}/>*/}
                {/*//   <input*/}
                {/*//   name="file"*/}
                {/*//   type="file"*/}
                {/*//   className="form-control form-control-sm"*/}
                {/*//   placeholder="Avatar"*/}
                {/*//   onChange={event => setFieldValue('avatar', event.currentTarget.files[0])}*/}
                {/*//   />*/}
                {/*//   </div>*/}
                {/*//   <div className="form-group col-md-6">*/}
                {/*//   <input*/}
                {/*//   name="firstName"*/}
                {/*//   type="text"*/}
                {/*//   className="form-control form-control-sm"*/}
                {/*//   placeholder="First Name"*/}
                {/*//   onChange={handleChange}*/}
                {/*//   onBlur={handleBlur}*/}
                {/*//   value={values.firstName}*/}
                {/*//   />*/}
                {/*//   {errors.firstName && touched.firstName && errors.firstName}*/}
                {/*//   </div>*/}
                {/*//   <div className="form-group col-md-6">*/}
                {/*//   <input*/}
                {/*//   name="lastName"*/}
                {/*//   type="text"*/}
                {/*//   className="form-control form-control-sm"*/}
                {/*//   placeholder="Last Name"*/}
                {/*//   onChange={handleChange}*/}
                {/*//   onBlur={handleBlur}*/}
                {/*//   value={values.lastName}*/}
                {/*//   />*/}
                {/*// {errors.lastName && touched.lastName && errors.lastName}*/}
                {/*//   </div>*/}
                {/*//   </div>*/}
                {/*//   <div className="form-row">*/}
                {/*//   <div className="form-group col-md-6">*/}
                {/*//   <input*/}
                {/*//   name="email"*/}
                {/*//   type="email"*/}
                {/*//   className="form-control form-control-sm"*/}
                {/*//   placeholder="E-mail"*/}
                {/*//   onChange={handleChange}*/}
                {/*//   onBlur={handleBlur}*/}
                {/*//   value={values.email}*/}
                {/*//   />*/}
                {/*//   {errors.email && touched.email && errors.email}*/}
                {/*//   </div>*/}
                {/*//   <div className="form-group col-md-6">*/}
                {/*//   <input*/}
                {/*//   name="phone"*/}
                {/*//   type="text"*/}
                {/*//   className="form-control form-control-sm"*/}
                {/*//   placeholder="Phone number"*/}
                {/*//   onChange={handleChange}*/}
                {/*//   onBlur={handleBlur}*/}
                {/*//   value={values.phone}*/}
                {/*//   />*/}
                {/*//   {errors.phone && touched.phone && errors.phone}*/}
                {/*//   </div>*/}
                {/*//   </div>*/}
                {/*//   <div className="form-group">*/}
                {/*//   <input*/}
                {/*//   name="address"*/}
                {/*//   type="text"*/}
                {/*//   className="form-control form-control-sm"*/}
                {/*//   placeholder="Address"*/}
                {/*//   onChange={handleChange}*/}
                {/*//   onBlur={handleBlur}*/}
                {/*//   value={values.address}*/}
                {/*//   />*/}
                {/*// {errors.address && touched.address && errors.address}*/}
                {/*//   </div>*/}
                {/*//   <div className="form-row">*/}
                {/*//   <div className="form-group col-md-6">*/}
                {/*//   <input*/}
                {/*//   name="password"*/}
                {/*//   type="password"*/}
                {/*//   className="form-control form-control-sm"*/}
                {/*//   placeholder="Password"*/}
                {/*//   onChange={handleChange}*/}
                {/*//   onBlur={handleBlur}*/}
                {/*//   value={values.password}*/}
                {/*//   />*/}
                {/*//   </div>*/}
                {/*// {errors.password && touched.password && errors.password}*/}
                {/*//   <div className="form-group col-md-6">*/}
                {/*//   <input*/}
                {/*//   name="passwordConf"*/}
                {/*//   type="password"*/}
                {/*//   className="form-control form-control-sm"*/}
                {/*//   placeholder="Confirm your password"*/}
                {/*//   onChange={handleChange}*/}
                {/*//   onBlur={handleBlur}*/}
                {/*//   value={values.passwordConf}*/}
                {/*//   />*/}
                {/*//   {errors.passwordConf && touched.passwordConf && errors.passwordConf}*/}
                {/*//   </div>*/}
                {/*//   </div>*/}
                {/*//   <button*/}
                {/*//   type="submit"*/}
                {/*//   className="btn btn-sm btn-block mt-3"*/}
                {/*//   disabled={isSubmitting}*/}
                {/*//   >*/}
                {/*//   Create your account*/}
                {/*//   </button>*/}
                {/*//   </form>*/}

        </div>
      </div>
    );
  }
}

export default SignUpPage;

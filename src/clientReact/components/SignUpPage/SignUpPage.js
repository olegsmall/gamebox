import React from 'react';
import Axios from 'axios';
import {Formik} from 'formik';
import * as Yup from 'yup';

require('./SignUpPage.scss');

class Thumb extends React.Component {
  constructor(props){
    super(props);
    this.state = {
      loading: false,
      thumb: undefined,
    };
  }


  componentWillReceiveProps(nextProps) {
    if (!nextProps.file) {
      return;
    }

    this.setState({loading: true}, () => {
      let reader = new FileReader();

      reader.onloadend = () => {
        this.setState({loading: false, thumb: reader.result});
      };

      reader.readAsDataURL(nextProps.file);
    });
  }

  render() {
    const {file} = this.props;
    const {loading, thumb} = this.state;

    if (!file) {
      return null;
    }

    if (loading) {
      return <p>loading...</p>;
    }

    return (<img
      src={thumb}
      alt={file.name}
      className="img-thumbnail mt-2"
      height={200}
      width={200}
    />);
  }
}


class SignUpPage extends React.Component {

  constructor(props) {
    super(props);
    // this.state = {
    //   userAvatar: '',
    //   userFirstName: '',
    //   userLastName: '',
    //   userEmail: '',
    //   userPhone: '',
    //   userAddress: '',
    //   userPassword: '',
    //   userPasswordConf: '',
    // };
    //
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
    let formData = new FormData();
    formData.append('avatar', values.avatar, values.avatar.name);
    formData.append('firstName', values.firstName);
    formData.append('lastName', values.lastName);
    formData.append('email', values.email);
    formData.append('phone', values.phone);
    formData.append('address', values.address);
    formData.append('password', values.password);



    Axios.post('/user', formData
    //   {
    //   avatar: values.avatar,
    //   firstName: values.firstName,
    //   lastName: values.lastName,
    //   email: values.email,
    //   phone: values.phone,
    //   address: values.address,
    //   password: values.password,
    // }
    )
      .then((res) => {
        console.log(res);
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
        <div id="signUp" className="container">
          <div className="row justify-content-center">
            <div className="col-md-6">
              <h3 className="text-center text-light mb-4">Create an account</h3>
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
                  // avatar: ''
                  firstName: Yup.string()
                    .min(3)
                    .max(30)
                    .required('Required'),
                  lastName: Yup.string()
                    .min(3)
                    .max(30),
                  email: Yup.string()
                    .email()
                    .required('Required'),
                  phone: Yup.string(),
                  address: Yup.string()
                    .min(5)
                    .max(50),
                  password: Yup.string()
                    .required('Password is required'),
                  passwordConf: Yup.string()
                    .oneOf([Yup.ref('password'), null], "Passwords don't match")
                    .required('Password confirm is required'),

                    // Yup.mixed()
                    // .test('match', 'Password do not match', password => {
                    //   debugger;
                    //   return password === this.parent.passwordConf;
                    // })

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
                        <input
                          name="file"
                          type="file"
                          className="form-control form-control-sm"
                          placeholder="Avatar"
                          onChange={event => setFieldValue('avatar', event.currentTarget.files[0])}
                          // value={this.state.userAvatar}
                          // onChange={this.handleInputChange}
                        />
                        <Thumb file={values.avatar}/>
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
                    </div>
                    <div className="form-row">
                      <div className="form-group col-md-6">
                        <input
                          name="email"
                          type="email"
                          className="form-control form-control-sm"
                          placeholder="E-mail"
                          onChange={handleChange}
                          onBlur={handleBlur}
                          value={values.email}
                        />
                        {errors.email && touched.email && errors.email}
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
                    </div>
                    <div className="form-group">
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
                    <div className="form-row">
                      <div className="form-group col-md-6">
                        <input
                          name="password"
                          type="password"
                          className="form-control form-control-sm"
                          placeholder="Password"
                          onChange={handleChange}
                          onBlur={handleBlur}
                          value={values.password}
                        />
                      </div>
                      {errors.password && touched.password && errors.password}
                      <div className="form-group col-md-6">
                        <input
                          name="passwordConf"
                          type="password"
                          className="form-control form-control-sm"
                          placeholder="Confirm your password"
                          onChange={handleChange}
                          onBlur={handleBlur}
                          value={values.passwordConf}
                        />
                        {errors.passwordConf && touched.passwordConf && errors.passwordConf}
                      </div>
                    </div>
                    <button
                      type="submit"
                      className="btn btn-sm btn-block mt-3"
                      disabled={isSubmitting}
                    >
                      Create your account
                    </button>
                  </form>
                )}
              </Formik>
            </div>
          </div>
        </div>
      </div>
    );
  }
}

export default SignUpPage;

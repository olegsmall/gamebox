/**
 * Theme: Web Project 2
 * Description: Creating a gaming platform for exchange between players
 * File: AddProduct.js, Add and edit user product component
 * Authors: Oleg Smolovyk, Iana Kravchenko, Svitlana Melnyk
 * Date: October 2018
 */

import React from 'react';
import axios from 'axios';
import {Formik, Field, Form, ErrorMessage} from 'formik';
import * as Yup from 'yup';
import Thumb from '../../../common/Thumb/Thumb';

require('./AddProduct.scss');

/**
 * Class AddProduct, Add and edit user product component
 */
class AddProduct extends React.Component {
  //Class constructor using for a state props and for initializing state properties
  constructor(props) {
    super(props);

    this.state = {
      fetchedDataIsReady: false,
      genres: [],
    };
  }

  //Component mount method, guaranteed that component was mounted
  componentDidMount() {

    axios.get('/genre')
      .then((res) => {
        this.setState({
          genres: res.data.genres,
          fetchedDataIsReady: true,
        });
      })
      .catch((error) => {
        console.error(error.response);
      });
  }

  /**
   * Add game
   * @param values
   * @param actions
   */
  handleSubmit(values, actions) {
    let formData = new FormData();
    if (values.image) {
      formData.append('image', values.image, values.image.name);
    }
    formData.append('title', values.title);
    formData.append('description', values.content);
    // formData.append('genres', values.genres);
    for (let i = 0; i < values.genres.length; i++) {
      formData.append('genres[]', values.genres[i]);
    }
    if (values.forSell){formData.append('status[]', 'for sale');}
    if (values.forRent){formData.append('status[]', 'for rent');}

    if (values.sellPrice!== '') {formData.append('sellPrice', values.sellPrice);}
    if (values.rentPrice!== '') {formData.append('rentPrice', values.rentPrice);}

    const self = this;
    if (this.props.pageType === 'EditProduct') {
      axios.put('/product/' + this.props.product._id, formData)
        .then((res) => {
          self.props.showSystemMessage(res.data.message);
          actions.setSubmitting(false);
          self.props.changeInner('Products');
        })
        .catch((error) => {
          console.error(error.response);
          self.props.showSystemMessage(error.message, 'error');
          actions.setSubmitting(false);
        });
    } else {
      axios.post('/product', formData)
        .then((res) => {
          self.props.showSystemMessage(res.data.message);
          actions.setSubmitting(false);
          self.props.changeInner('Products');
        })
        .catch((error) => {
          console.error(error.response);
          self.props.showSystemMessage(error.message, 'error');
          actions.setSubmitting(false);
        });
    }
  }

  //Add to DOM
  render() {

    if (!this.state.fetchedDataIsReady) {
      return null;
    }

    const {pageType, product} = this.props;
    const genres = this.state.genres;

    let initialValues = {};

    if (pageType === 'EditProduct' && product) {
      initialValues = {
        image: undefined,
        title: product.title,
        content: product.content,
        forSell: product.sell,


      };
    } else {
      initialValues = {
        image: undefined,
        title: '',
        content: '',
        genres: [(genres.length > 0) ? genres[0]._id : undefined ],
        forSell: false,
        forRent: false,
        sellPrice: '',
        rentPrice: '',
      };
    }

    return (
      <div className={'AddProduct col-md-8 text-center'}>
        <h2 className="text-center mt-4">Add game</h2>
        <Formik
          initialValues={initialValues}
          validationSchema={Yup.object().shape({
            title: Yup.string()
              .min(4)
              .max(40)
              .required('* Required'),
            content: Yup.string()
              .min(10)
              .max(1500),
            genres: Yup.array()
              .of(Yup.string()
                .required('* You have to choose at least one genre')),
            forSell: Yup.boolean(),
            sellPrice: Yup.number()
              .when('forSell', {
                is: true,
                then: Yup.number()
                  .required('* Sell price is required')
                  .positive('* Sell price must be positive')
                  .min(1, '* Minimum sell price is 1 CAD'),
                otherwise: Yup.number().notRequired(),
              }),
            forRent: Yup.boolean(),
            rentPrice: Yup.number()
              .when('forRent', {
                is: true,
                then: Yup.number()
                  .required('* Rent price is required')
                  .positive('* Rent price must be positive')
                  .min(1, '* Minimum retn price is 1 CAD'),
                otherwise: Yup.number().notRequired(),
              })
          })}
          onSubmit={(values, actions) => this.handleSubmit(values, actions)}
        >
          {({values, setFieldValue, isSubmitting}) => (
            <Form className="mb-5 text-left">
              <div className="form-row mb-3">
                <div className="col-9">
                  <Thumb className="mb-3"
                    file={values.image}
                    object={this.props.product}

                  />
                  <input
                    name="image"
                    type="file"
                    className="form-control inputAddProduct"
                    placeholder="Load image"
                    onChange={event => setFieldValue('image', event.currentTarget.files[0])}
                  />
                </div>
              </div>

              <div className="form-group">
                <Field name="title" type="text" className="form-control inputAddProduct" placeholder="Games's title"/>
                <ErrorMessage name="title">{msg => <small className='form-text text-left error'>{msg}</small>}</ErrorMessage>
              </div>

              <div className="form-group">
                <Field
                  name="genres"
                  className="form-control inputAddProduct"
                  component="select"
                  multiple="true"
                  size="5"
                  onChange={evt =>
                    setFieldValue(
                      'genres',
                      [].slice
                        .call(evt.target.selectedOptions)
                        .map(option => option.value)
                    )
                  }
                >
                  {genres.map((genre)=>(
                    <option key={genre._id} value={genre._id}>{genre.name}</option>
                  ))}
                </Field>
                <ErrorMessage name="genres">{msg => <small className='form-text text-left error'>{msg}</small>}</ErrorMessage>
              </div>

              <div className="form-check form-check-inline mb-3">
                <Field name="forSell" type="checkbox" class="form-check-input" checked={values.forSell}/>Sell
                <Field name="forRent" type="checkbox" class="form-check-input ml-3" checked={values.forRent}/>Rent
                {values.forSell && <Field name="sellPrice" type="number" class="ml-3"/>}
                {values.forRent && <Field name="rentPrice" type="number" class="ml-3"/>}
              </div>
              <ErrorMessage name="sellPrice">{msg => <small className='form-text text-left error'>{msg}</small>}</ErrorMessage>
              <ErrorMessage name="rentPrice">{msg => <small className='form-text text-left error'>{msg}</small>}</ErrorMessage>

              <div className="form-group">
                <Field name="content" component="textarea" className="form-control inputAddProduct" placeholder="Content"/>
                <ErrorMessage name="content">{msg => <small className='form-text text-left error'>{msg}</small>}</ErrorMessage>
              </div>
              <button type="submit" className="btn btn-block btnAddProduct" disabled={isSubmitting}>Save</button>
            </Form>

          )}
        </Formik>
      </div>
    );
  }

}

export default AddProduct;

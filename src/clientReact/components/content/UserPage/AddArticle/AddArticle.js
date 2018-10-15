/**
 * Theme: Web Project 2
 * Description: Creating a gaming platform for exchange between players
 * File: AddArticle.js, Add and edit user article component
 * Authors: Oleg Smolovyk, Iana Kravchenko, Svitlana Melnyk
 * Date: October 2018
 */

import React from 'react';
import axios from "axios";
import {Formik, Field, Form, ErrorMessage} from 'formik';
import * as Yup from 'yup';
import Thumb from "../../../common/Thumb/Thumb";

require('./EditArticle.scss');

/**
 * Class AddArticle, Add and edit user article component.
 */
class AddArticle extends React.Component {

  /**
   * Add article
   * @param values
   * @param actions
   */
  handleSubmit(values, actions) {
    let formData = new FormData();
    if (values.image) {
      formData.append('image', values.image, values.image.name);
    }
    formData.append('title', values.title);
    formData.append('content', values.content);
    formData.append('tags', values.tags);

    const self = this;
    if (this.props.pageType === 'EditArticle') {
      axios.put('/article/' + this.props.article._id, formData)
        .then((res) => {
          self.props.showSystemMessage(res.data.message);
          actions.setSubmitting(false);
          self.props.changeInner('Articles');
        })
        .catch((error) => {
          console.error(error.response);
          self.props.showSystemMessage(error.response.message, 'error');
          actions.setSubmitting(false);
        });
    } else {
      axios.post('/article', formData)
        .then((res) => {
          self.props.showSystemMessage(res.data.message);
          actions.setSubmitting(false);
          self.props.changeInner('Articles');
        })
        .catch((error) => {
          console.error(error.response);
          self.props.showSystemMessage(error.response.message, 'error');
          actions.setSubmitting(false);
        });
    }
  }

  //Add to DOM
  render() {
    const {pageType, article} = this.props;
    let initialValues = {};

    if (pageType === 'EditArticle' && article) {
      initialValues = {
        image: undefined,
        title: article.title,
        content: article.content,
        tags: article.tags,
      };
    } else {
      initialValues = {
        image: undefined,
        title: '',
        content: '',
        tags: '',
      };
    }

    return (
      <div className={'EditArticle col-md-8 text-center'}>
        <h2 className="text-center mt-4">{article ? 'Edit Article' : 'Add Article'}</h2>
        <Formik
          initialValues={initialValues}
          validationSchema={Yup.object().shape({
            title: Yup.string()
              .min(4, '* Minimum length is 4 symbols')
              .max(40, '* Maximum length is 40 symbols')
              .required('* Title is required'),
            content: Yup.string()
              .min(10, '* Minimum length is 10 symbols'),
          })}
          onSubmit={(values, actions) => this.handleSubmit(values, actions)}
        >
          {({values, setFieldValue, isSubmitting}) => (
            <Form className="mb-5 text-left">
              <div id="imageAdd"></div>
              <div className="form-row mb-3">
                <div className="col-9">
                  <Thumb className="mb-3" file={values.image} object={this.props.article}/>
                  <input
                    name="image"
                    type="file"
                    className="form-control inputEditArticle"
                    placeholder="Load image"
                    onChange={event => setFieldValue('image', event.currentTarget.files[0])}
                  />
                </div>
              </div>

              <div className="form-group">
                <Field name="title" type="text" className="form-control inputEditArticle" placeholder="Article's title"/>
                <ErrorMessage name="title">{msg => <small className='form-text text-left error'>{msg}</small>}</ErrorMessage>
              </div>

              <div className="form-group">
                <Field name="content" component="textarea" className="form-control inputEditArticle" rows="5" placeholder="Content"/>
                <ErrorMessage name="content">{msg => <small className='form-text text-left error'>{msg}</small>}</ErrorMessage>
              </div>

              <div className="form-group">
                <Field name="tags" type="text" className="form-control inputEditArticle" placeholder="Tags"/>
              </div>

              <button type="submit" className="btn btn-block btnEditArticle" disabled={isSubmitting}>Save</button>

            </Form>
          )}
        </Formik>
      </div>
    );
  }
}

export default AddArticle;

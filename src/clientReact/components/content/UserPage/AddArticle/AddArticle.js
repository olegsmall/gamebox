import React from 'react';
import axios from "axios";
import {Formik, Field, Form, ErrorMessage} from 'formik';
import * as Yup from 'yup';
import Thumb from "../../../common/Thumb/Thumb";

require('./EditArticle.scss');

class AddArticle extends React.Component {

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
          console.log(res.data);
          self.props.showMessage(res.data.message);
          actions.setSubmitting(false);
          self.props.changeInner('Articles');
        })
        .catch((error) => {
          console.log(error);
          self.props.showMessage(error.message);
          actions.setSubmitting(false);
        });
    } else {
      axios.post('/article', formData)
        .then((res) => {
          console.log(res.data);
          self.props.showMessage(res.data.message);
          actions.setSubmitting(false);
          self.props.changeInner('Articles');
        })
        .catch((error) => {
          console.log(error);
          self.props.showMessage(error.message);
          actions.setSubmitting(false);
        });
    }
  }


  render() {
    // debugger;
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
      <div className={'EditArticle'}>
        <h1>Add Article:</h1>
        <Formik
          initialValues={initialValues}
          validationSchema={Yup.object().shape({
            title: Yup.string()
              .min(4)
              .max(40)
              .required('Required'),
            content: Yup.string()
              .min(10)
              .max(1500),
          })}
          onSubmit={(values, actions) => this.handleSubmit(values, actions)}
        >
          {({values, setFieldValue, isSubmitting}) => (
            <Form className="mb-5">

              <div id="imageAdd" className="text-light"></div>
              <div className="form-row mb-3">
                <div className="col-9">
                  <Thumb file={values.image} object={this.props.article}/>
                  <input
                    name="image"
                    type="file"
                    className="form-control form-control-sm"
                    placeholder="Load image"
                    onChange={event => setFieldValue('image', event.currentTarget.files[0])}
                  />
                </div>
              </div>

              <div className="form-group">
                <Field name="title" type="text" className="form-control form-control-sm" placeholder="Article's title"/>
                <ErrorMessage name="title">{msg => <div className='field-error'>{msg}</div>}</ErrorMessage>
              </div>

              <div className="form-group">
                <Field name="content" component="textarea" className="form-control" rows="5" placeholder="Content"/>
                <ErrorMessage name="title">{msg => <div className='field-error'>{msg}</div>}</ErrorMessage>
              </div>

              <div className="form-group">
                <Field name="tags" type="text" className="form-control form-control-sm" placeholder="Tags"/>
              </div>

              <button type="submit" className="btn btn-success btn-block" disabled={isSubmitting}>Save</button>

            </Form>
          )}
        </Formik>
      </div>
    );
  }
}

export default AddArticle;

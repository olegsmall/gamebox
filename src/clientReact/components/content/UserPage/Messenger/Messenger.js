/**
 * Theme: Web Project 2
 * Description: Creating a gaming platform for exchange between players
 * File: Messanger.js, Messanger component
 * Authors: Oleg Smolovyk, Iana Kravchenko, Svitlana Melnyk
 * Date: October 2018
 */

import React from 'react';
import axios from "axios";
import {Formik, Form, Field, ErrorMessage} from 'formik';
import * as Yup from "yup";

require('./Messenger.scss');

/**
 * Class Messenger, Messenger component
 */
export default class Messenger extends React.Component {
  //Class constructor using for a state props and for initializing state properties
  constructor(props) {
    super(props);

    this.state = {
      inboxMessages: [],
      outboxMessages: [],
      allMessages: [],
      inboxMessagesReady: false,
      outboxMessagesReady: false,
      currentMessage: '',
      currentMessageContent: '',
    };

    this.getInboxMessages();
    this.getOutboxMessages();
  }

  /**
   * Show all messages
   */
  getMessages() {
    const {inboxMessages, outboxMessages} = this.state;

    inboxMessages.map(message => message.type = 'inbox');
    outboxMessages.map(message => message.type = 'outbox');

    const allMessages = [...inboxMessages, ...outboxMessages];

    allMessages.sort((a, b) => (new Date(a.created) < new Date(b.created)) ? 1 : 0);

    this.setState({
        inboxMessagesReady: false,
        outboxMessagesReady: false,
      },
      () => this.setState({allMessages: allMessages})
    );
  }

  /**
   * Show Inbox messages
   */
  getInboxMessages() {
    axios.get('/user/inbox')
      .then((res) => {
        this.setState({inboxMessages: res.data.inbox.docs}, () => {
          this.setState({inboxMessagesReady: true});
        });
      })
      .catch((error) => {
        console.error(error.response);
        this.setState({
          inboxMessages: [],
          inboxMessagesReady: false
        });
        this.props.showSystemMessage(error.response.data.message, 'error');
      });
  }

  /**
   * Show Outbox messages
   */
  getOutboxMessages() {
    axios.get('/user/outbox')
      .then((res) => {
        this.setState({outboxMessages: res.data.outbox.docs}, () => {
          this.setState({outboxMessagesReady: true});
        });
      })
      .catch((error) => {
        console.error(error.response);
        this.setState({
          outboxMessages: [],
          outboxMessagesReady: false
        });
        this.props.showSystemMessage(error.response.data.message, 'error');
      });
  }

  /**
   * Show one message
   * @param message
   */
  getMessage(message) {
    this.setState({
      currentMessage: message._id + message.type,
      currentMessageContent: message.content,
    });

    if (message.read) return;

    axios.get(`/message/${message._id}`)
      .then((res) => {
        this.getInboxMessages();
        this.getOutboxMessages();
      })
      .catch((error) => {
        console.error(error.response);
      });

  }

  /**
   * Send message
   * @param values
   * @param actions
   */
  handleSubmit(values, actions) {
    axios.post('/message', {
      subject: values.title,
      content: values.content,
      // receiver: values.email,
      email: values.email,
    })
      .then((res) => {
        this.props.showSystemMessage(res.data.message);
        this.getInboxMessages();
        this.getOutboxMessages();
        actions.resetForm();
      })
      .catch((error) => {
        console.error(error.response);
        this.props.showSystemMessage(error.response.data.message, 'error');
      });

  }

  //Add to DOM
  render() {

    const {currentMessage, outboxMessagesReady, inboxMessagesReady, allMessages, currentMessageContent} = this.state;

    if (outboxMessagesReady && inboxMessagesReady) {
      this.getMessages();
    }

    return (
      <div className="Messenger col-md-8 text-center">
        <div className="h5 ml-5 mb-2 text-center text-sm-left">My messenger</div>
        <Formik
          initialValues={{
            email: '',
            title: '',
            content: '',
          }}
          validationSchema={Yup.object().shape({
            title: Yup.string()
              .min(1, '* Minimum length is 1 symbols')
              .required('* Message title is required'),
            content: Yup.string()
              .min(1, '* Minimum length is 1 symbols'),
            email: Yup.string()
              .email('* Email is not correct')
              .required('* Email is required'),
          })}
          onSubmit={(values, actions) => this.handleSubmit(values, actions)}
        >
          {({values, setFieldValue, isSubmitting}) => (
            <Form className="row">
              <div className="col-md-9 mt-3">
                <label className="sr-only" htmlFor="emailFormInput"></label>
                <div className="input-group">
                  <div className="input-group-prepend">
                    <div className="input-group-text">@</div>
                  </div>
                  <Field type="text" name="email" className="form-control" id="emailFormInput" placeholder="email"/>
                  <ErrorMessage name="email">{msg => <small
                    className='form-text text-left error'>{msg}</small>}</ErrorMessage>
                </div>
              </div>
              <div className="col-md-3 mt-3">
                <button type="submit" className="btn btn-block">send</button>
              </div>
              <div className="col-md-12">
                <div className="form-group">
                  <label htmlFor="inputMessageTitle"></label>
                  <Field type="text" name="title" className="form-control" id="inputMessageTitle"
                         placeholder="message title"/>
                  <ErrorMessage name="title">{msg => <small
                    className='form-text text-left error'>{msg}</small>}</ErrorMessage>
                </div>
              </div>
              <div className="col-md-12">
                <div className="input-group">
                  <Field name="content" component="textarea" className="form-control" rows="5"
                         placeholder="message text"/>
                </div>
                <ErrorMessage name="content">{msg => <small
                  className='form-text text-left error'>{msg}</small>}</ErrorMessage>
              </div>
            </Form>
          )}
        </Formik>
        <div className="h5 ml-5 mb-2 mt-3 text-center text-sm-left">All my letters</div>
        <table className="table table-sm mt-3">
          <tbody>
            {allMessages.map((message, index) => {

              const messageDirectionImage = message.type === 'inbox' ? '/image/write-3722611_640_in.png' : '/image/write-3722611_640_out.png';
              const user = message.type === 'inbox' ? message.sender : message.receiver;
              const messageDate = new Date(message.created).toLocaleDateString();
              let rowClasses = ' cursor-pointer ';
              rowClasses += !message.read && message.type === 'inbox' ? ' font-weight-bold ' : '';
              rowClasses += currentMessage === message._id + message.type ? ' table-active ' : '';

              return (
                <tr key={index} className={rowClasses} onClick={() => this.getMessage(message)}>
                  <th scope="row"><img src={messageDirectionImage} width="40"/></th>
                  <td>{messageDate}</td>
                  <td>{`${user.firstName} ${user.lastName}`}</td>
                  <td>{user.email}</td>
                  <td>{message.subject}</td>
                </tr>
              );
            })}
          </tbody>
        </table>
        <div className="text_message_history">{currentMessageContent}</div>
      </div>
    );
  }
}


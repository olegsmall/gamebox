/**
 * Messanger component
 *
 * file: Messanger.js
 * Created by: Oleg Smolovyk.
 * Date: 10/11/2018
 * Time: 15:56
 */

import React from 'react';
import axios from "axios";
import {Formik, Form, Field, ErrorMessage} from 'formik';
import * as Yup from "yup";

require('./Messenger.scss');

export default class Messenger extends React.Component {
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

  getMessages() {
    const {inboxMessages, outboxMessages} = this.state;

    inboxMessages.map(message => message.type = 'inbox');
    outboxMessages.map(message => message.type = 'outbox');

    const allMessages = [...inboxMessages, ...outboxMessages];

    allMessages.sort((a, b)=> (new Date(a.created) < new Date(b.created)) ? 1 : 0);

    console.log(allMessages)
    this.setState({
        inboxMessagesReady: false,
        outboxMessagesReady: false,
      },
      () => this.setState({allMessages})
    );
  }


  getInboxMessages() {
    axios.get('/user/inbox')
      .then((res) => {
        // console.log(res)
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

  getOutboxMessages() {
    axios.get('/user/outbox')
      .then((res) => {
        // console.log(res)
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

  sendMessage() {

  }

  render() {

    const {currentMessage, outboxMessagesReady, inboxMessagesReady, allMessages, currentMessageContent} = this.state;

    if (outboxMessagesReady && inboxMessagesReady) {
      this.getMessages();
    }

    return (
      <div className="Messenger col-md-8 text-center">
        <div className="h5 ml-5 mb-2 text-center text-sm-left">My messenger</div>
        <form className="row">
          <div className="col-md-9 mt-3">
            <label className="sr-only" htmlFor="emailFormInput"></label>
            <div className="input-group">
              <div className="input-group-prepend">
                <div className="input-group-text">@</div>
              </div>
              <input type="email" className="form-control" id="emailFormInput" placeholder="email"/>
            </div>
          </div>
          <div className="col-md-3 mt-3">
            <button type="submit" className="btn btn-block">send</button>
          </div>
          <div className="col-md-12">
            <div className="form-group">
              <label htmlFor="inputMessageTitle"></label>
              <input type="text" className="form-control" id="inputMessageTitle" placeholder="message title"/>
            </div>
          </div>
          <div className="col-md-12">
            <div className="input-group">
                        <textarea className="form-control" rows="5" aria-label="messagearea"
                                  placeholder="message text"></textarea>
            </div>
          </div>
        </form>
        <form>
          <div className="h5 ml-5 mb-2 mt-3 text-center text-sm-left">All my letters</div>
          <table className="table table-sm mt-3">
            {allMessages.map((message, index ) => {

              const messageDirectionImage = message.type === 'inbox' ? '/image/write-3722611_640_in.png' : '/image/write-3722611_640_out.png';
              const user = message.type === 'inbox' ? message.sender : message.receiver;
              const messageDate = new Date(message.created).toLocaleDateString()
              let rowClasses = ' cursor-pointer ';
              rowClasses += !message.read ? ' font-weight-bold ' : '';
              rowClasses += currentMessage === message._id + message.type ? ' table-active ' : '';

              return (
                <tr key={index} className={rowClasses} onClick={()=>this.getMessage(message)}>
                  <th scope="row"><img src={messageDirectionImage} width="40"/></th>
                  <td>{messageDate}</td>
                  <td>{`${user.firstName} ${user.lastName}`}</td>
                  <td>{user.email}</td>
                  <td>{message.subject}</td>
                </tr>
              );
            })}
          </table>
          <div className="text_message_history">{currentMessageContent}</div>
        </form>
      </div>
    );
  }
}


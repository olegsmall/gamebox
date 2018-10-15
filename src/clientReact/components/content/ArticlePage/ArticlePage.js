/**
 * Theme: Web Project 2
 * Description: Creating a gaming platform for exchange between players
 * File: ArticlePage.js, Blog article page component
 * Authors: Oleg Smolovyk, Iana Kravchenko, Svitlana Melnyk
 * Date: October 2018
 */

import React from 'react';
import axios from 'axios';
import {Link} from 'react-router-dom';

require('./ArticlePage.scss');

/**
 * Class ArticlePage, blog article page component.
 */
export default class ArticlePage extends  React.Component {
  //Class constructor using for a state props and for initializing state properties
  constructor(props) {
    super(props);

    this.state = {
      article: null
    };
  }

  //Component mount method, guaranteed that component was mounted
  componentDidMount(){
    axios.get('/article/' + this.props.match.params.articleId)
      .then((res) => {
        this.setState({article: res.data.article});
      })
      .catch((error) => {
        console.error(error.response);
      });
  }

  //Add to DOM
  render(){

    if (this.state.article === null) {
      return null;
    }

    const {_id, title, image, content, author, created, tags} = this.state.article;
    const date = new Date(created).toLocaleDateString();

    return (

      <div className={"ArticlePage"}>
        <div>
          <img className="d-block w-100 imgMain css-adaptive" src="/image/38562f8a6333f76.jpg" alt="Article image"/>
        </div>
        <div className="container articlePage">
          <div className="row">
            <div className="col">
              <h2>{title}</h2>
              <p className="text-muted">Written by : {`${author.firstName} ${author.lastName}`} | {date}</p>
              <img className="img-fluid mt-3" src={image} alt="image"/>
              <HtmlContent content={content}/>
              <p className="my-5"><span>{tags.join(' ')}</span></p>
            </div>
          </div>
        </div>
      </div>
    );
  }
}

/**
 * Class HtmlContent, HtmlContent component
 */
class HtmlContent extends React.Component{
  //Class constructor using for a state props and for initializing properties
  constructor(props){
    super(props);
    this.contentArea = React.createRef();
  }

  //Component mount method, guaranteed that component was mounted
  componentDidMount(){
    this.contentArea.current.innerHTML = this.props.content;
  }

  //Add to DOM
  render(){
    return (
      <div className="mt-5" ref={this.contentArea}> </div>
    );
  }

}

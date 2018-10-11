/**
 * Theme: Web Project 2
 * Description: Creating a gaming platform for exchange between players
 * File: ArticlePage.js, Blog article page component
 * Authors: Oleg Smolovyk, Piotr Iablocichin, Iana Kravchenko, Svitlana Melnyk
 * Date: October 2018
 */

import React from 'react';
import axios from 'axios';
import {Link} from 'react-router-dom';

require('./ArticlePage.scss');

export default class ArticlePage extends  React.Component {
  constructor(props) {
    super(props);

    this.state = {
      article: null
    };
  }
  componentDidMount(){
    axios.get('/article/' + this.props.match.params.articleId)
      .then((res) => {
        console.log(res.data);
        this.setState({article: res.data.article});
      })
      .catch((error) => {
        console.log(error);
      });
  }

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
              {/*<div className="mt-5" dangerouslySetInnerHTML={{ __html: content }}> </div>*/}
              <p className="my-5"><span>{tags.join(' ')}</span></p>
            </div>
          </div>
        </div>
      </div>
    );
  }
}

class HtmlContent extends React.Component{
  constructor(props){
    super(props);
    this.contentArea = React.createRef();
  }

  componentDidMount(){
    this.contentArea.current.innerHTML = this.props.content;
  }

  render(){
    return (
      <div className="mt-5" ref={this.contentArea}> </div>
    );
  }

}

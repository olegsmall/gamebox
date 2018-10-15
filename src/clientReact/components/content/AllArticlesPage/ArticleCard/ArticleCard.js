/**
 * Theme: Web Project 2
 * Description: Creating a gaming platform for exchange between players
 * File: ArticleCard.js, Article's card- the part of all articles page component
 * Authors: Oleg Smolovyk, Iana Kravchenko, Svitlana Melnyk
 * Date: October 2018
 */

import React from 'react';
import {Link} from 'react-router-dom';

require('./ArticleCard.scss');

/**
 * Class ArticleCard, Article's card component- the part of all articles page component.
 */
class ArticleCard extends React.Component {
  //Class constructor using for a state props and for initializing state properties
  constructor(props){
    super(props);
    this.contentArea = React.createRef();
  }

  //Component mount method, guaranteed that component was mounted
  componentDidMount(){
    let content = this.props.article.content.replace(/<[^>]*>/g, '');
    this.contentArea.current.innerHTML = content.substring(0, 380) + '...';
  }

  //Add to DOM
  render() {
    const {_id, title, image, content, author, created} = this.props.article;
    const date = new Date(created).toLocaleDateString();

    return (
      <div className={'ArticleCard'}>
        <Link className="linkArticle" to={`/article/${_id}`}>
          <div className="card border-0">
            <div className="card-body cardBodyArticle">
              <img className="img-fluid float-md-left mr-5 imageArticle" src={image} alt="Card image"/>
              <h5 className="card-title">{title}</h5>
              <div className="card-text" ref={this.contentArea}> </div>
              <p className="card-text text-muted">Written by : {`${author.firstName} ${author.lastName}`} | {date}</p>
            </div>
          </div>
        </Link>
        <hr/>
      </div>
    );
  }
}

export default ArticleCard;

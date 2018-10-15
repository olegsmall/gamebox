/**
 * Theme: Web Project 2
 * Description: Creating a gaming platform for exchange between players
 * File: ArticleRow.js, Article's row, the part of Articles component
 * Authors: Oleg Smolovyk, Iana Kravchenko, Svitlana Melnyk
 * Date: October 2018
 */

import React from 'react';
import axios from "axios";
import {Link} from 'react-router-dom';

require('./ArticleRow.scss');

/**
 * Class ArticleRow, Article's row component, the part of Articles component
 */
class ArticleRow extends React.Component {
  //Class constructor using for a state props and for initializing state properties
  constructor(props) {
    super(props);
    this.contentArea = React.createRef();
  }

  //Component mount method, guaranteed that component was mounted
  componentDidMount() {
    let content = this.props.article.content.replace(/<[^>]*>/g, '');
    this.contentArea.current.innerHTML = content.substring(0, 200) + '...';
  }

  /**
   * Edit article
   * @param e
   */
  handleArticleEdit = (e) => {
    e.preventDefault();
    this.props.setArticleState({
      articleForEdit: this.props.article,
    });
    this.props.changeInner('EditArticle');
  };

  /**
   * Delete article
   * @param e
   */
  handleArticleDelete = (e) => {
    e.preventDefault();
    const self = this;
    axios.delete('/article/' + this.props.article._id)
      .then((res) => {
        self.props.getArticles();
        self.props.showSystemMessage(res.data.message);
      })
      .catch((error) => {
        console.error(error.response);
        self.props.showSystemMessage(error.message);
      });
  };

  //Add to DOM
  render() {
    const {_id, title, image, created} = this.props.article;
    let date = new Date(created).toLocaleDateString();

    return (
      <div>
        <Link className="linkArticle" to={`/article/${_id}`}>
          <div className="card border-0">
            <div className={'ArticleRow'}>
              <div className="card-body">
                <img className="img-fluid float-md-left mr-5 imageYourArticle" src={image} alt={title}/>
                <h5 className={'card-title text-left mt-3 mt-md-0'}>{title}</h5>
                <div className="card-text text-left" ref={this.contentArea}> </div>
                <div className="card-title text-left">Created: {date}</div>
                <button type="button" className="btn w-25 mt-2 btnAddArticle mr-3 linkArticle"
                   onClick={this.handleArticleEdit}>Edit</button>
                <button type="button" className="linkArticle btn w-25 mt-2 btnAddArticle"
                   onClick={this.handleArticleDelete}>Delete</button>
              </div>
            </div>
          </div>
        </Link>
        <hr/>
      </div>
    );
  }
}

export default ArticleRow;

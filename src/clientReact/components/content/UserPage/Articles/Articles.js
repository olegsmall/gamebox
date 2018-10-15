/**
 * Theme: Web Project 2
 * Description: Creating a gaming platform for exchange between players
 * File: Articles.js, All user articles component
 * Authors: Oleg Smolovyk, Iana Kravchenko, Svitlana Melnyk
 * Date: October 2018
 */

import React from 'react';
import axios from "axios";
import ArticleRow from "./ArticleRow/ArticleRow";

require('./Articles.scss');

/**
 * Class Articles, All user articles component
 */
class Articles extends React.Component {
  //Class constructor using for a state props and for initializing state properties
  constructor(props) {
    super(props);
    this.state = {
      articles: [],
    };
  }

  //Component mount method, guaranteed that component was mounted
  componentDidMount() {
    this.getArticles();
  }

  /**
   * Show all articles
   */
  getArticles() {
    axios.get('/user/' + this.props.user._id + '/articles')
      .then((res) => {
        // handle success
        this.setState({articles: res.data.articles.docs});
      })
      .catch((error) => {
        console.error(error.response);
      });
  }

  /**
   * Add article
   * @param e
   */
  handleAddArticle = (e)=> {
    e.preventDefault();
    this.props.changeInner('AddArticle');
  };

  //Add to DOM
  render() {

    return (
      <div className={"Articles col-md-8 text-center"}>
        <h2 className="text-center mt-4">My articles</h2>
        <button className={'btn btn-block mt-2 btnAddArticle'} onClick={this.handleAddArticle}>Add article
        </button>
        <div id="yourArticle" className="container">
          {this.state.articles.map((article) => (
            <ArticleRow
              key={article._id}
              article={article}
              getArticles={this.getArticles.bind(this)}
              showSystemMessage={this.props.showSystemMessage}
              setArticleState={this.props.setArticleState}
              changeInner={this.props.changeInner}
            />
          ))}
        </div>
      </div>
    );
  }

}

export default Articles;

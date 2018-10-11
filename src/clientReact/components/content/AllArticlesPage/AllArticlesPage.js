/**
 * Theme: Web Project 2
 * Description: Creating a gaming platform for exchange between players
 * File: AllArticlesPage.js, all articles page component
 * Authors: Oleg Smolovyk, Piotr Iablocichin, Iana Kravchenko, Svitlana Melnyk
 * Date: October 2018
 */

import React from 'react';
import axios from 'axios';
import ArticleCard from './ArticleCard/ArticleCard';

require('./AllArticlesPage.scss');

class AllArticlesPage extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      articles: []
    };
  }

  componentDidMount() {
    axios.get('/article')
      .then((res) => {
        this.setState({articles: res.data.articles.docs});
      })
      .catch((error) => {
        console.log(error);
      });
  }

  render() {
    return (
      <div className={"AllBlogPage"}>
        <div>
          <img className="img-fluid d-block w-100 imgMain" src="/image/back3.jpg" alt="Article image"/>
        </div>
        <div id="article" className="container">
          <h2 className="ml-5 mb-5 text-center text-sm-left">All articles</h2>
          <hr/>
          {this.state.articles.map((article) => (
            <ArticleCard key={article._id} article={article}/>
          ))}
        </div>
      </div>
    );
  }
}

export default AllArticlesPage;

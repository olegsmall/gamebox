import React from 'react';
import axios from "axios";
import ArticleRow from "./ArticleRow/ArticleRow";

require('./Articles.scss');

class Articles extends React.Component {

  constructor(props) {
    super(props);
    this.state = {
      articles: [],
    };
  }

  componentDidMount() {
    this.getArticles();
  }

  getArticles() {
    axios.get('/user/' + this.props.user.id + '/articles')
      .then((res) => {
        // handle success
        // console.log(res.data.data.docs);
        this.setState({articles: res.data.articles.docs});
      })
      .catch((error) => {
        console.log(error);
      });
  }

  handleAddArticle(e) {
    e.preventDefault();
    this.props.changeInner('AddArticle');
  }

  render() {

    return (
      <div className={"Articles"}>
        <h2 className="text-center mt-4">My articles</h2>
        <button className={'btn btn-block mt-2 btnAddArticle'} onClick={this.handleAddArticle.bind(this)}>Add article
        </button>
        <div id="yourArticle" className="container">
          {this.state.articles.map((article) => (
            <ArticleRow
              key={article._id}
              article={article}
              getArticles={this.getArticles.bind(this)}
              showMessage={this.props.showMessage}
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

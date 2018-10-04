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

  getArticles(){
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
      <div>
        <div className={'d-flex flex-row flex-nowrap justify-content-between mb-5'}>
          <h3 className="text-center text-light">Your atricles:</h3>
          <button className={'btn btn-success'} onClick={this.handleAddArticle.bind(this)}>Add article</button>
        </div>

        <table className="table table-bordered">
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
        </table>
      </div>
    );
  }

}

export default Articles;

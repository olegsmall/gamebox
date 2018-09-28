import React from 'react';
import axios from "axios";

require('./ArticleRow.scss');

class ArticleRow extends React.Component {

  constructor(props) {
    super(props);
  }

  componentDidMount() {

  }

  render() {
    const article = this.props.article;
    return (
      <div className={'ArticleRow'}>
        <a href="#">
          <div className="card ml-5 cardArticle">
            <div className="card-body">
              <img className="img-fluid float-md-left mr-4 imageArticle" src={'/image' + article.image[0]} alt={article.title}/>
              <h5 className="card-title text-light">{article.title}</h5>
            </div>
            <button className="btn btn-sm btn-success"><a href="">Edit article</a></button>
            <button className="btn btn-sm btn-success"><a href="">Delete article</a></button>
          </div>
        </a>
      </div>
    );
  }
}

export default ArticleRow;

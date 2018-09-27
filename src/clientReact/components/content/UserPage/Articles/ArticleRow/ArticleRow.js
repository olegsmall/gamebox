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
      <div className={'card d-flex flex-row flex-nowrap'}>
        <div><img src={'/image' + article.image[0]} alt={article.title}/></div>
        <div>{article.title}</div>
        <div><a href="">Edit article</a></div>
      </div>
    );
  }

}

export default ArticleRow;

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
    const image = (article.images[0]) ? '/image/' + article.images[0] : '';
    return (
      <tbody className={'ArticleRow'}>
      <tr>
        <td><img className="img-fluid imageArticle text-light" src={image} alt={article.title}/></td>
        <td className={'text-light'}>{article.title}</td>
        <td><a className="btn btn-link text-light" href={''}>Edit article</a></td>
        {/*<td><a className="btn btn-link" href={''}>Delete article</a></td>*/}
      </tr>
      </tbody>
    );
  }
}

export default ArticleRow;

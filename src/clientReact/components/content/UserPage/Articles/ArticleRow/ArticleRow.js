import React from 'react';
import axios from "axios";

require('./ArticleRow.scss');

class ArticleRow extends React.Component {

  constructor(props) {
    super(props);
  }

  componentDidMount() {

  }
  handleArticleEdit(e){
    e.preventDefault();
    this.props.setArticleState({
      articleForEdit: this.props.article,
    });
    this.props.changeInner('EditArticle');
  }

  handleArticleDelete(e){
    e.preventDefault();
    const self = this;
    axios.delete('/article/' + this.props.article._id)
      .then((res) => {
        self.props.getArticles();
        self.props.showMessage(res.data.message);
      })
      .catch((error) => {
        console.log(error);
        self.props.showMessage(error.message);
      });
  }

  render() {
    const article = this.props.article;
    const image = article.image;
    return (
      <tbody className={'ArticleRow'}>
      <tr>
        <td><img className="img-fluid imageArticle text-light" src={image} alt={article.title}/></td>
        <td className={'text-light'}>{article.title}</td>
        <td><a className="btn btn-link text-light" href={''} onClick={this.handleArticleEdit.bind(this)}>Edit</a></td>
        <td><a className="btn btn-link text-light" href={''} onClick={this.handleArticleDelete.bind(this)}>Delete</a></td>
        {/*<td><a className="btn btn-link" href={''}>Delete article</a></td>*/}
      </tr>
      </tbody>
    );
  }
}

export default ArticleRow;

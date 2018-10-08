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
      <div className={'ArticleRow'}>
        <div className="card-body">
          <img className="img-fluid float-md-left mr-5 imageYourArticle" src={image} alt={article.title}/>
          <h5 className={'card-title text-left mt-3 mt-md-0'}>{article.title}</h5>
          <p className="card-text text-left">{article.content}</p>
          <p className="card-text text-left mt-3 mt-md-5">tags : </p>
          <button className="btn w-25 mt-2 btnAddArticle mr-3"><a className="linkArticle" href={''} onClick={this.handleArticleEdit.bind(this)}>Edit</a></button>
          <button className="btn w-25 mt-2 btnAddArticle"><a className="linkArticle" href={''} onClick={this.handleArticleDelete.bind(this)}>Delete</a></button>
        {/*<td><a className="btn btn-link" href={''}>Delete article</a></td>*/}
        </div>
      </div>
    );
  }
}

export default ArticleRow;

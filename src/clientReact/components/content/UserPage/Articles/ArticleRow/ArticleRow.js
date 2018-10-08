import React from 'react';
import axios from "axios";
import {Link} from 'react-router-dom';

require('./ArticleRow.scss');

class ArticleRow extends React.Component {

  constructor(props) {
    super(props);
    this.contentArea = React.createRef();
  }

  componentDidMount() {
    let content = this.props.article.content.replace(/<[^>]*>/g, '');
    this.contentArea.current.innerHTML = content.substring(0, 200) + '...';
  }

  handleArticleEdit(e) {
    e.preventDefault();
    this.props.setArticleState({
      articleForEdit: this.props.article,
    });
    this.props.changeInner('EditArticle');
  }

  handleArticleDelete(e) {
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
                <a className="btn w-25 mt-2 btnAddArticle mr-3 linkArticle" href={''}
                   onClick={this.handleArticleEdit.bind(this)}>Edit</a>
                <a className="linkArticle btn w-25 mt-2 btnAddArticle" href={''}
                   onClick={this.handleArticleDelete.bind(this)}>Delete</a>
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

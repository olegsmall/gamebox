import React from 'react';
import {Link} from 'react-router-dom';

require('./ArticleCard.scss');

class ArticleCard extends React.Component {
  render() {
    const article = this.props.article;

    let author = (article.author) ? article.author.firstName + ' ' + article.author.lastName : 'Anonymous';

    return (
      <div className={"ArticleCard"}>
        <Link to={'/article/' + article._id} href={''}>
          <div className="card">
            <div className="card-body">
              <img className="img-fluid float-md-left mr-5 imageArticle" src="image/minecraft.jpg" width="250" height="150" alt="Card image"/>
              <h5 className="card-title text-light">{article.title}</h5>
              <p className="card-text text-light">{article.content.substring(0, 250) + '...'}</p>
              <p className="card-text text-muted text-light">Written by : {author}</p>
            </div>
          </div>
        </Link>
      </div>
    );
  }
}

export default ArticleCard;

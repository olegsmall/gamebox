import React from 'react';
import {Link} from 'react-router-dom';

require('./ArticleCard.scss');

class ArticleCard extends React.Component {
  render() {
    const article = this.props.article;

    let author = (article.author) ? article.author.firstName + ' ' + article.author.lastName : 'Anonymous';
    let date = (article.created) ? article.created : '2018-10-07';

    return (
      <div className={"ArticleCard"}>
        <Link className="linkArticle" to={'/article/' + article._id} href={''}>
          <div className="card border-0">
            <div className="card-body cardBodyArticle">
              <img className="img-fluid float-md-left mr-5 imageArticle" src="image/outdoors-3106126_1280.jpg" alt="Card image"/>
              <h5 className="card-title">{article.title}</h5>
              <p className="card-text">{article.content.substring(0, 250) + '...'}</p>
              <p className="card-text text-muted">Written by : {author} | {date}</p>
            </div>
          </div>
        </Link>
        <hr/>
      </div>
    );
  }
}

export default ArticleCard;

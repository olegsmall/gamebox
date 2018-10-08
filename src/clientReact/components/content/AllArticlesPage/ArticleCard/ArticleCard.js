import React from 'react';
import {Link} from 'react-router-dom';

require('./ArticleCard.scss');

class ArticleCard extends React.Component {
  render() {
    const {_id, title, image, content, author, created} = this.props.article;

    return (
      <div className={"ArticleCard"}>
        <Link className="linkArticle" to={'/article/' + _id} href={''}>
          <div className="card border-0">
            <div className="card-body cardBodyArticle">
              <img className="img-fluid float-md-left mr-5 imageArticle" src={image} alt="Card image"/>
              <h5 className="card-title">{title}</h5>
              <p className="card-text">{content.substring(0, 250) + '...'}</p>
              <p className="card-text text-muted">Written by : {`${author.firstName} ${author.lastName}`} | {created.toString()}</p>
            </div>
          </div>
        </Link>
        <hr/>
      </div>
    );
  }
}

export default ArticleCard;

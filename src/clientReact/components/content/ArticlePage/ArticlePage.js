import React from 'react';
import axios from 'axios';
import {Link} from 'react-router-dom';

require('./ArticlePage.scss');

class ArticlePage extends  React.Component {
  constructor(props) {
    super(props);

    this.state = {
      article: null
    };
  }
  componentDidMount(){
    axios.get('/article/' + this.props.match.params.articleId)
      .then((res) => {
        console.log(res.data);
        this.setState({article: res.data.article});
      })
      .catch((error) => {
        console.log(error);
      });
  }

  render(){

    if (this.state.article === null) {
      return null;
    }

    const {_id, title, image, content, author, created, tags} = this.state.article;
    // const {title, content, image, author, date, tags} = this.state.article;

    return (

      <div className={"ArticlePage"}>
        <div>
          <img className="d-block w-100 imgMain" src="/image/38562f8a6333f76.jpg" alt="Article image"/>
        </div>
        <div className="container articlePage">
          <div className="row">
            <div className="col">
              <h2>{title}</h2>
              <p className="text-muted">Written by : {`${author.firstName} ${author.lastName}`} | {created.toString()}</p>
              <img className="img-fluid mt-3" src={image} alt="image"/>
              <p className="mt-5">{content}</p>
              <p className="my-5"><span>{tags.join(' ')}</span></p>
            </div>
          </div>
        </div>
      </div>
    );
  }
}

export default ArticlePage;

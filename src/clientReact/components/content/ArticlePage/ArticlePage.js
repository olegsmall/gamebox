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
    const title = (this.state.article !== null) ? this.state.article.title : '';
    const content = (this.state.article !== null) ? this.state.article.content : '';
    const image = (this.state.article !== null) ? this.state.article.images[0] : '';
    const author = (this.state.article !== null) ? this.state.article.author : 'Anonymous';
    const date = (this.state.article !== null) ? this.state.article.created : '';
    const tags = (this.state.article !== null) ? this.state.article.tags : '';

    return (

      <div className={"ArticlePage"}>
        <div>
          <img className="d-block w-100 imgMain" src="image/38562f8a6333f76.jpg" alt="Article image"/>
        </div>
        <div className="container articlePage">
          <div className="row">
            <div className="col">
              <h2>{title}</h2>
              <p className="text-muted">Written by : {author} | {date}</p>
              <img className="img-fluid mt-3" src={"/image/" + image} alt="image"/>
              <p className="mt-5">{content}</p>
              <p className="my-5"><Link to={''}>{tags}</Link></p>
            </div>
          </div>
        </div>
      </div>
    );
  }
}

export default ArticlePage;

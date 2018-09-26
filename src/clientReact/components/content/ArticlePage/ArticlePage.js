import React from 'react';
import axios from 'axios';

require('./ArticlePage.scss');

class ArticlePage extends  React.Component {
  constructor(props) {
    super(props);

    axios.get('/article/' + this.props.match.params.articleId)
      .then((res) => {
        console.log(res.data);
        this.setState({article: res.data.article});
      })
      .catch((error) => {
        console.log(error);
      });

    this.state = {
      article: {}
    };
  }

  render(){
    const title = (this.state.article) ? this.state.article.title : '';
    return (

      <div className={"ArticlePage"}>
        <h2>{title}</h2>
      </div>
    );
  }
}

export default ArticlePage;

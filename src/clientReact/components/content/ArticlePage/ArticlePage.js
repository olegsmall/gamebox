import React from 'react';
import axios from 'axios';

require('./ArticlePage.scss');

class ArticlePage extends  React.Component {
  constructor(props) {
    super(props);

    axios.get('/blog/' + this.props.match.params.articleId)
      .then((res) => {
        console.log(res.data);
        this.setState({});
      })
      .catch((error) => {
        console.log(error);
      });

    this.state = {
      article: {}
    };
  }

  render(){
    return (
      <div className={"ArticlePage"}>
      </div>
    );
  }
}

export default ArticlePage;
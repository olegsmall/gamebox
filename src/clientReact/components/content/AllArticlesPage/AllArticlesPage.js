import React from 'react';
import axios from 'axios';
import ArticleCard from './ArticleCard/ArticleCard';

require('./AllArticlesPage.scss');

class AllArticlesPage extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      articles: []
    };
  }

  componentDidMount() {
    axios.get('/article')
      .then((res) => {
        this.setState({articles: res.data.articles.docs});
      })
      .catch((error) => {
        console.log(error);
      });
  }

  render() {
    // debugger;
    return (
      <div className={"AllBlogPage"}>
        <div id="article" className="container">
          <h2 className="ml-5 mb-5 text-light">All articles</h2>
          <hr/>
          {
            this.state.articles.map((article)=>{
              <ArticleCard key={article._id} article={article}/>;
            })
          }

          <hr/>
        </div>
      </div>
    );
  }
}

export default AllArticlesPage;

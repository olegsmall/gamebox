import React from 'react';
import axios from 'axios';
import ArticleCard from './ArticleCard/ArticleCard';

require('./AllArticlesPage.scss');

class AllArticlesPage extends React.Component {
  constructor(props){
    super(props);
    this.state = {
      articles: []
    }
  };

    componentDidMount(){
      axios.get('/blog')
        .then((res) => {
          this.setState({articles: res.data.articles.docs});
        })
        .catch((error) => {
          console.log(error);
        });
    }

    render(){
      return (
        <div className={"AllBlogPage"}>
          <div id="article" className="container">
            <h2 className="ml-5 mb-5 text-light">All articles</h2>
            <hr/>
              <ArticleCard/>
            <hr/>
          </div>
        </div>
      );
    }
}

export default AllArticlesPage;
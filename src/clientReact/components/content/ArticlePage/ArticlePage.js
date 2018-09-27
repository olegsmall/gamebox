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
    const content = (this.state.article) ? this.state.article.content : '';
    const author = (this.state.article.author) ? this.state.article.author.firstName + ' ' + this.state.article.author.lastName : 'Anonymous';

    return (

      <div className={"ArticlePage"}>
        <div className="container articlePage">
          <div className="row">
            <div className="col-sm-12 col-md-6 col-lg-7">
              <h2 className="text-light titleArticle">{title}</h2>
              <p className="text-muted text-light">Written by : {author}</p>
              <img className="img-fluid" src="image/minecraft.jpg" alt="image"/>
              <p className="text-light mt-5">{content}</p>
              <div className="embed-responsive embed-responsive-16by9">
                <iframe className="embed-responsive-item mt-5" src="video/Woman Taking A Photo.mp4"></iframe>
              </div>
              <p className="text-light mt-5">{content}</p>
              <div className="swiper-container mt-5">
                <div className="swiper-wrapper">
                  <div className="swiper-slide">
                    <img className="img-fluid" src="image/image_carusel3.jpg" alt="First slide"/>
                  </div>
                  <div className="swiper-slide">
                    <img className="img-fluid" src="image/image_carusel1.jpg" alt="Second slide"/>
                  </div>
                  <div className="swiper-slide">
                    <img className="img-fluid" src="image/image_carusel2.jpg" alt="Third slide"/>
                  </div>
                </div>
                <div className="swiper-button-prev"></div>
                <div className="swiper-button-next"></div>
              </div>
              <p className="text-light mt-5">{content}</p>
            </div>

            <div className="col-sm-12 col-md-6 col-lg-5 d-none d-md-block">
              <h5 className="text-light ml-5">All Articles</h5>
              <a href="#">
                <div className="card ml-5 cardArticle">
                  <div className="card-body">
                    <img className="img-fluid float-md-left mr-4 imageArticle" src="image/minecraft.jpg" alt="Card image"/>
                    <h5 className="card-title text-light">Article's Name</h5>
                  </div>
                </div>
              </a>
              <a href="#">
                <div className="card ml-5 cardArticle">
                  <div className="card-body">
                    <img className="img-fluid float-md-left mr-4 imageArticle" src="image/minecraft.jpg" alt="Card image"/>
                    <h5 className="card-title text-light">Article's Name</h5>
                  </div>
                </div>
              </a>
              <a href="#">
                <div className="card ml-5 cardArticle">
                  <div className="card-body">
                    <img className="img-fluid float-md-left mr-4 imageArticle" src="image/minecraft.jpg" alt="Card image"/>
                    <h5 className="card-title text-light">Article's Name</h5>
                  </div>
                </div>
              </a>
              <a href="#">
                <div className="card ml-5 cardArticle">
                  <div className="card-body">
                    <img className="img-fluid float-md-left mr-4 imageArticle" src="image/minecraft.jpg" alt="Card image"/>
                    <h5 className="card-title text-light">Article's Name</h5>
                  </div>
                </div>
              </a>
            </div>
          </div>
        </div>
      </div>
    );
  }
}

export default ArticlePage;

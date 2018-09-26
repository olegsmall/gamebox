import React from 'react';

require('./ArticleCard.scss');

class ArticleCard extends React.Component {
  render(){
    return(
      <div className={"ArticleCard"}>
        <a href="#">
          <div className="card">
            <div className="card-body">
              <img className="img-fluid float-left mr-5" src="image/minecraft.jpg" width="250" height="100" alt="Card image"/>
                <h5 className="card-title text-light">Article's Name</h5>
                <p className="card-text text-light">
                  Lorem ipsum dolor sit amet, consectetur adipisicing elit.
                  Amet animi aperiam commodi doloremque dolores dolorum odio officia,
                  quod sunt veritatis. Deleniti, eum fugiat labore minima molestiae natus non
                  reiciendis repellendus!
                </p>
              <p className="card-text text-muted text-light">Written by : article's author</p>
            </div>
          </div>
        </a>
      </div>
    );
  }
}

export default ArticleCard;

import React from 'react';
require('./GamePage.scss');

class GamePage extends React.Component {
  constructor(props){
    super(props);
  }

  componentDidMount(){
  }

  componentWillUnmount(){
  }

  render() {
    return (
      <div>
        <div id="gamePage">
          <h3 className="text-light text-center mb-4">Game Name</h3>
          <div className="container mb-4">
            <div className="row">
              <div className="col-md-5">
                <img id="imageMainGame" className="img-thumbnail" src="image/img6.jpg" alt="First slide" />
                  <div className="swiper-container mb-5">
                    <div className="swiper-wrapper mt-3">
                      <div className="swiper-slide">
                        <img className="img-fluid" src="image/img6.jpg" alt="First slide" />
                      </div>
                      <div className="swiper-slide">
                        <img className="img-fluid" src="image/img1.jpg" alt="Second slide" />
                      </div>
                      <div className="swiper-slide">
                        <img className="img-fluid" src="image/img2.jpg" alt="Third slide" />
                      </div>
                      <div className="swiper-slide">
                        <img className="img-fluid" src="image/img6.jpg" alt="First slide" />
                      </div>
                      <div className="swiper-slide">
                        <img className="img-fluid" src="image/img1.jpg" alt="Second slide" />
                      </div>
                      <div className="swiper-slide">
                        <img className="img-fluid" src="image/img2.jpg" alt="Third slide" />
                      </div>
                    </div>
                    <div className="swiper-button-next"></div>
                    <div className="swiper-button-prev"></div>
                  </div>
              </div>
              <div className="col-md-6">
                <div className="row ml-5">
                  <div className="col-md-6">
                    <p className="text-light">Product seller : Piotr</p>
                    <p className="text-light">Type : Game</p>
                    <p className="text-light">Release Date : Sep 11, 2018</p>
                  </div>
                  <div className="col-md-6">
                    <p className="text-light">Rating : 10</p>
                    <p className="text-light">Purchase price : 300$</p>
                    <p className="text-light">Rent price : 30$</p>
                  </div>
                  <div className="col-md-12 mt-3">
                    <p className="text-light">Genre : Strategy, Adventure, etc.</p>
                  </div>
                  <div className="col-md-6">
                    <button className="btn btn-block mt-5 mb-3 btnGamePage">Add to cart</button>
                    <button className="btn btn-block btnGamePage">Rent the game</button>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
        <div className="container">
          <div className="row justify-content-center">
            <h3 className="text-light mb-4">Description</h3>
          </div>
        </div>
        <div className="container mb-5">
          <div className="row">
            <p className="text-light">Lorem ipsum dolor sit amet, consectetur adipisicing elit. Amet asperiores beatae
              dicta enim et ex facere
              id necessitatibus odit omnis, optio quae quam qui quia quis quisquam saepe unde vitae?
            </p>
            <p className="text-light">Lorem ipsum dolor sit amet, consectetur adipisicing elit. Aliquam aliquid animi
              aperiam blanditiis
              delectus facilis harum impedit ipsam laudantium magnam obcaecati officiis omnis quidem recusandae, saepe,
              similique sit tempora voluptas.</p>
            <p className="text-light">Lorem ipsum dolor sit amet, consectetur adipisicing elit. Aliquam aliquid animi
              aperiam blanditiis
              delectus facilis harum impedit ipsam laudantium magnam obcaecati officiis omnis quidem recusandae, saepe,
              similique sit tempora voluptas.</p>
          </div>
        </div>
      </div>
    );
  }
}

export default GamePage;
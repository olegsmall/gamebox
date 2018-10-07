import React from 'react';

require('./Carousel.scss');

class Carousel extends React.Component {
  render() {

    return (
      <div className={"Carousel"}>
        <div className="swiper-container mb-3">
          <div className="swiper-wrapper mt-3">
            <div className="swiper-slide">
              <img className="img-fluid imageMainGame" src="image/minecraft-1618089_1280.jpg" alt="First slide"/>
            </div>
            <div className="swiper-slide">
              <img className="img-fluid imageMainGame" src="image/minecraft-529458_1280.jpg" alt="Second slide"/>
            </div>
            <div className="swiper-slide">
              <img className="img-fluid imageMainGame" src="image/minecraft-1988580_1280.jpg" alt="Third slide"/>
            </div>
            <div className="swiper-slide">
              <img className="img-fluid imageMainGame" src="image/minecraft-655957_1280.jpg" alt="First slide"/>
            </div>
            <div className="swiper-slide">
              <img className="img-fluid imageMainGame" src="image/minecraft-1106253_1280.png" alt="Second slide"/>
            </div>
            <div className="swiper-slide">
              <img className="img-fluid imageMainGame" src="image/minecraft-1746541_1280.jpg" alt="Third slide"/>
            </div>
          </div>
          <div className="swiper-button-next"></div>
          <div className="swiper-button-prev"></div>
        </div>
      </div>
    );
  }
}

export default Carousel;
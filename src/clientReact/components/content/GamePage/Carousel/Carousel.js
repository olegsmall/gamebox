import React from 'react';

class Carousel extends React.Component {
  render() {
    return (
      <div className="swiper-container mb-5">
        <div className="swiper-wrapper mt-3">
          <div className="swiper-slide">
            <img className="img-fluid" src="image/img6.jpg" alt="First slide"/>
          </div>
          <div className="swiper-slide">
            <img className="img-fluid" src="image/img1.jpg" alt="Second slide"/>
          </div>
          <div className="swiper-slide">
            <img className="img-fluid" src="image/img2.jpg" alt="Third slide"/>
          </div>
          <div className="swiper-slide">
            <img className="img-fluid" src="image/img6.jpg" alt="First slide"/>
          </div>
          <div className="swiper-slide">
            <img className="img-fluid" src="image/img1.jpg" alt="Second slide"/>
          </div>
          <div className="swiper-slide">
            <img className="img-fluid" src="image/img2.jpg" alt="Third slide"/>
          </div>
        </div>
        <div className="swiper-button-next"></div>
        <div className="swiper-button-prev"></div>
      </div>
    );
  }
}

export default Carousel;
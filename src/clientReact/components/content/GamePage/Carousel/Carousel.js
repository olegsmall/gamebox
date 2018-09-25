import React from 'react';

class Carousel extends React.Component {
  render() {
    const product = this.props.product;

    return (
      <div className="swiper-container mb-5">
        {/*{for(let i = 0; i < imagesCarousel.length; i++){*/}
        <div className="swiper-wrapper mt-3">
            {/*<div className="swiper-slide">*/}
            {/*<img className="img-fluid" src={'/image/' + product.images} alt={product.title}/>*/}
            {/*</div>*/}

        </div>
        <div className="swiper-button-next"></div>
        <div className="swiper-button-prev"></div>
      {/*}}*/}
      </div>
    );
  }
}

export default Carousel;
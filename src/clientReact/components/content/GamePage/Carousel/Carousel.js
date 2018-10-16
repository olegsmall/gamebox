/**
 * Theme: Web Project 2
 * Description: Creating a gaming platform for exchange between players
 * File: Carousel.js, Carousel- the part of Game page component
 * Authors: Oleg Smolovyk, Iana Kravchenko, Svitlana Melnyk
 * Date: October 2018
 */

import React from 'react';
import Swiper from 'react-id-swiper';

require('./Carousel.scss');

/**
 * Class Carousel, Carousel component- the part of Game page component
 */
class Carousel extends React.Component {

  constructor(props){
    super(props);
    this.blowupImage = this.blowupImage.bind(this);
  }
  /**
   * Switch game image when clicking on a thumbnail
   */
  blowupImage(image){
    const mainImage = document.querySelector('.GamePage .imageMainGame');
    mainImage.src = image;
  }

  //Add to DOM
  render() {
    const {product} = this.props;
    const params = {
      navigation: {
        nextEl: '.swiper-button-next',
        prevEl: '.swiper-button-prev'
      },
      slidesPerView: 3,
      spaceBetween: 10,
      loop: false,
      loopFillGroupWithBlank: true
    };

    return (
      <div className={"Carousel"}>
        <Swiper {...params}>
          {product.images.map((image, item)=>(
            <div className="swiper-slide" key={item}>
              <img className="img-fluid imageMainGame" src={image} alt="First slide"
                   onClick={()=>this.blowupImage(image)}/>
            </div>
          ))}
        </Swiper>
      </div>
    );
  }
}

export default Carousel;

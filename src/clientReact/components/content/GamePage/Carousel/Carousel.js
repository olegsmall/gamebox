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

  /**
   * Switch game image when clicking on a thumbnail
   */
  blowupImage(){
    $('.swiper-slide img').click(function () {
      $('.blowup img').attr('src', $(this).attr('src'));
    });
  }

  //Add to DOM
  render() {
    const params = {
      navigation: {
        nextEl: '.swiper-button-next',
        prevEl: '.swiper-button-prev'
      },
      slidesPerView: 3,
      spaceBetween: 10,
      loop: true,
      loopFillGroupWithBlank: true
    };

    return (
      <div className={"Carousel"}>
        <Swiper {...params}>
          <div className="swiper-slide">
            <img className="img-fluid imageMainGame" src="/image/minecraft-1618089_1280.jpg" alt="First slide"
                 onClick={this.blowupImage.bind(this)}/>
          </div>
          <div className="swiper-slide">
            <img className="img-fluid imageMainGame" src="image/minecraft-529458_1280.jpg" alt="Second slide"
                 onClick={this.blowupImage.bind(this)}/>
          </div>
          <div className="swiper-slide">
            <img className="img-fluid imageMainGame" src="image/minecraft-1988580_1280.jpg" alt="Third slide"
                 onClick={this.blowupImage.bind(this)}/>
          </div>
          <div className="swiper-slide">
            <img className="img-fluid imageMainGame" src="image/minecraft-655957_1280.jpg" alt="First slide"
                 onClick={this.blowupImage.bind(this)}/>
          </div>
          <div className="swiper-slide">
            <img className="img-fluid imageMainGame" src="image/minecraft-1106253_1280.png" alt="Second slide"
                 onClick={this.blowupImage.bind(this)}/>
          </div>
          <div className="swiper-slide">
            <img className="img-fluid imageMainGame" src="image/minecraft-1746541_1280.jpg" alt="Third slide"
                 onClick={this.blowupImage.bind(this)}/>
          </div>
        </Swiper>
      </div>
    );
  }
}

export default Carousel;
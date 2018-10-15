/**
 * Theme: Web Project 2
 * Description: Creating a gaming platform for exchange between players
 * File: MainPage.js, Main page component
 * Authors: Oleg Smolovyk, Iana Kravchenko, Svitlana Melnyk
 * Date: October 2018
 */

import React from 'react';
import ReactPropTypes from 'prop-types';
import axios from "axios";
import {Link} from 'react-router-dom';
import Swiper from 'react-id-swiper';

require('./MainPage.scss');

/**
 * Class MainPage, Main page component.
 */
export default class MainPage extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      lastAddedIsReady: false,
      lastAddedProducts: [],
    };
  }

  //Component mount method, guaranteed that component was mounted
  componentDidMount() {
    this.fetchLastAdded();
  }

  /**
   * Get last added games
   */
  fetchLastAdded() {
    axios.get('/product?sort_by=date&limit=10')
      .then((res) => {
        this.setState({
          lastAddedProducts: res.data.products.docs,
          lastAddedIsReady: true,
        });
      })
      .catch((error) => {
        console.error(error.response);
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
      spaceBetween: 20,
      loop: true,
      loopFillGroupWithBlank: true
    };


    const {lastAddedIsReady, lastAddedProducts} = this.state;

    if (lastAddedProducts.length === 0) return null;

    const mostPopularProducts = [...lastAddedProducts].reverse();


    return (
      <div className={'MainPage'}>
        <img className="d-block w-100 imageMain card-img" src="/image/back54.jpg" alt="First image"/>
        <div className="card-img-overlay">
          <div className="promo">
            <h3 className="d-none d-lg-block">DISCOVER THE WORLD OF GAMES</h3>
            <h5 className="d-none d-lg-block">We offer a unique service. You can exchange games. See our novelties</h5>
            <button className="button btnPromo mt-4 text-light d-none d-lg-block"><Link to={'/product'}>Click
              here</Link></button>
          </div>
        </div>
        <h3 className="text-center pt-4 mt-2">Welcome to GameBox!</h3>
        <div className="infoCard mt-4">
          <div className="container py-4">
            <div className="row">
              <div className="col">
                <img className="img-fluid imgWork mr-4 ml-2 float-left" src="image/death.png"/>
                <p className="mt-2">GameBox is the most popular platform for exchanging, selling or buying games.
                  Becoming our member you can get free access to more than 100,000 games of different genres.
                  Our advantage : you do not need to buy the game and store it on the shelf. You can sell or rent
                  it.</p>
              </div>
            </div>
          </div>
        </div>

        {/*Section Recently released*/}
        <div className="container mb-5">
          <h3 className="mt-5 text-center">Recently released</h3>
          <div className="row justify-content-center mt-4">
            <div className="col">
              <Swiper {...params}>
                {lastAddedProducts.map((product) => {
                  const backgroundImage = {
                    backgroundImage: `url("${product.images[0]}")`,
                  };
                  return (
                    <div
                      key={product._id}
                      className="card product text-center"
                      style={backgroundImage}
                    >
                      <div className="inner">
                        {product.average_rating > 0
                          ? <div className="paragraphV text-light text-center">{product.average_rating}</div>
                          : ''}
                        <a href="#"><h4 className="paragraphV pt-5">{product.title}</h4></a>
                        <button className="button mt-5"><a href="#">View More</a></button>
                      </div>

                    </div>
                  );
                })}
              </Swiper>
            </div>
          </div>
        </div>

        {/*Section Most popular*/}
        <div className="container mb-5">
          <h3 className="mt-5 text-center">Most popular</h3>
          <div className="row justify-content-center mt-4">
            <div className="col">
              <Swiper {...params}>
                {mostPopularProducts.map((product) => {
                  const backgroundImage = {
                    backgroundImage: `url("${product.images[0]}")`,
                  };
                  return (
                    <div
                      key={product._id}
                      className="card product text-center"
                      style={backgroundImage}
                    >
                      <div className="inner">
                        {product.average_rating > 0
                          ? <div className="paragraphV text-light text-center">{product.average_rating}</div>
                          : ''}
                        <a href="#"><h4 className="paragraphV pt-5">{product.title}</h4></a>
                        <button className="button mt-5"><a href="#">View More</a></button>
                      </div>

                    </div>
                  );
                })}
                {/*<div className="card product text-center cardPopular-1">*/}
                {/*<div className="inner">*/}
                {/*<div className="paragraphV text-light">4,5</div>*/}
                {/*<a href="#"><h4 className="paragraphV pt-5">Title</h4></a>*/}
                {/*<button className="button mt-5"><a href="#">View More</a></button>*/}
                {/*</div>*/}
                {/*</div>*/}
                {/*<div className="card product text-center cardPopular-2">*/}
                {/*<div className="inner">*/}
                {/*<div className="paragraphV text-light">4,5</div>*/}
                {/*<a href="#"><h4 className="paragraphV pt-5">Title</h4></a>*/}
                {/*<button className="button mt-5"><a href="#">View More</a></button>*/}
                {/*</div>*/}
                {/*</div>*/}
                {/*<div className="card product text-center cardPopular-3">*/}
                {/*<div className="inner">*/}
                {/*<div className="paragraphV text-light">4,5</div>*/}
                {/*<a href="#"><h4 className="paragraphV pt-5">Title</h4></a>*/}
                {/*<button className="button mt-5"><a href="#">View More</a></button>*/}
                {/*</div>*/}
                {/*</div>*/}
                {/*<div className="card product text-center cardPopular-4">*/}
                {/*<div className="inner">*/}
                {/*<div className="paragraphV text-light">4,5</div>*/}
                {/*<a href="#"><h4 className="paragraphV pt-5">Title</h4></a>*/}
                {/*<button className="button mt-5"><a href="#">View More</a></button>*/}
                {/*</div>*/}
                {/*</div>*/}
                {/*<div className="card product text-center cardPopular-5">*/}
                {/*<div className="inner">*/}
                {/*<div className="paragraphV text-light">4,5</div>*/}
                {/*<a href="#"><h4 className="paragraphV pt-5">Title</h4></a>*/}
                {/*<button className="button mt-5"><a href="#">View More</a></button>*/}
                {/*</div>*/}
                {/*</div>*/}
                {/*<div className="card product text-center cardPopular-6">*/}
                {/*<div className="inner">*/}
                {/*<div className="paragraphV text-light">4,5</div>*/}
                {/*<a href="#"><h4 className="paragraphV pt-5">Title</h4></a>*/}
                {/*<button className="button mt-5"><a href="#">View More</a></button>*/}
                {/*</div>*/}
                {/*</div>*/}
              </Swiper>
            </div>
          </div>
        </div>

        {/*Section Best games*/}
        <div className="container articlePage">
          <div className="row">
            <div className="col">
              <h3>Best games of 2018: Minecraft</h3>
              <p className="text-muted">Reviews</p>
              <img className="img-fluid mt-3" src="image/minecraft-1106252_1280.jpg" alt="image"/>
              <h4 className="mt-5">MINECRAFT</h4>
              <p className="mt-3">
                There’s no one way to play Minecraft. It’s an open-ended game where players decide what they
                want to do by themselves! We do offer several modes, though: Creative Mode, where players are
                given limitless resources to build whatever they can imagine; and Survival Mode, where players must
                explore the world and mine its resources to feed, house and defend themselves.
                Or you can join your friends online and make up your own rules!
                You can play Minecraft on a variety of platforms - find the one that suits you!</p>
              <h4 className="mt-5">Episodes</h4>
              <div className="row mt-3">
                <div className="col-md-4">
                  <img className="img-fluid mb-3" src="image/minecraft-1746541_1280.jpg" alt="image"/>
                </div>
                <div className="col-md-4">
                  <img className="img-fluid mb-3" src="image/minecraft-655957_1280.jpg" alt="image"/>
                </div>
                <div className="col-md-4 mb-3">
                  <img className="img-fluid mb-3" src="image/minecraft-669310_1280.jpg" alt="image"/>
                </div>
              </div>
            </div>
          </div>
        </div>

        {/*Section How it work*/}
        <div className="infoCard">
          <h3 className="text-center pt-4">How it works</h3>
          <div className="container pb-4">
            <div className="row">
              <div className="col-md-4 text-center">
                <img className="img-fluid imgInfo my-4" src="image/information-41225_640.png"/>
                <p>General info</p>
                <p className="text">This is a platform for sharing games between players.
                  Our members can sell, buy, rent the games and comment / rate these games and other members.
                </p>
              </div>
              <div className="col-md-4 text-center">
                <img className="img-fluid imgInfo my-4" src="image/profile2-512.png"/>
                <p>Join us</p>
                <p className="text">Being a member of our great platform means to have access to the most
                  interesting
                  games of various genres and play in real time.
                </p>
              </div>
              <div className="col-md-4 text-center">
                <img className="img-fluid imgInfo my-4" src="image/img_343397.png"/>
                <p>Payment</p>
                <p className="text">Secure payment can be made in cash, by check or Paypal.
                  Choose your game and go ahead!
                </p>
              </div>
            </div>
          </div>
        </div>


      </div>
    );
  }
}

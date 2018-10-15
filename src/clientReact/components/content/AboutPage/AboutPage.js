/**
 * Theme: Web Project 2
 * Description: Creating a gaming platform for exchange between players
 * File: AboutPage.js, About page component
 * Authors: Oleg Smolovyk, Iana Kravchenko, Svitlana Melnyk
 * Date: October 2018
 */


import React from 'react';

require('./AboutPage.scss');

/**
 * Functional(AboutPage) component, which returns a react element
 * @returns {*}
 * @constructor
 */
const AboutPage = () => {
  return (
    <div className={'AboutPage'}>
      <div>
        <img className="img-fluid d-block w-100 imgMain" src="image/junYN7V.png" alt="About image"/>
      </div>
      {/*Section About us*/}
      <div id="gameContent">
        <div className="container">
          <div className="row justify-content-center">
            <div className="col-md-12">
              <h3 className="my-5 text-center">About us</h3>
              <p>Lorem ipsum dolor sit amet, consectetur adipisicing elit. Amet asperiores beatae dicta enim et ex
                facere
                id necessitatibus odit omnis, optio quae quam qui quia quis quisquam saepe unde vitae?
              </p>
              <p>Lorem ipsum dolor sit amet, consectetur adipisicing elit. Aliquam aliquid animi aperiam blanditiis
                delectus facilis harum impedit ipsam laudantium magnam obcaecati officiis omnis quidem recusandae,
                saepe,
                similique sit tempora voluptas.</p>
              <p>Lorem ipsum dolor sit amet, consectetur adipisicing elit. Aliquam aliquid animi aperiam blanditiis
                delectus facilis harum impedit ipsam laudantium magnam obcaecati officiis omnis quidem recusandae,
                saepe,
                similique sit tempora voluptas.</p>
            </div>
          </div>
        </div>
      </div>
      {/*Section Our Team*/}
      <div className="container">
        <div className="row">
          <div className="col">
            <h3 className="my-5 text-center">Our Team</h3>
          </div>
        </div>
      </div>
      <section id="team" className="py-5 text-center bg-light">
        <div className="container">
          <div className="row">
            <div className="col-md-3">
              <img src="/image/woman-157604_640.png" alt="" className="img-fluid rounded-circle mb-2"/>
                <h4>Svitlana Melnyk</h4>
                <p>Front-end Developer</p>
            </div>
            <div className="col-md-3">
              <img src="/image/actress-1295681_640.png" alt="" className="img-fluid rounded-circle mb-2"/>
                <h4>Iana Kravchenko</h4>
                <p>Front-end Developer</p>
            </div>
            <div className="col-md-3">
              <img src="/image/american-1295880_640.png" alt="" className="img-fluid rounded-circle mb-2"/>
                <h4>Oleg Smolovyk</h4>
                <p>Back-end Developer</p>
            </div>
            <div className="col-md-3">
              <img src="/image/face-2130591_640.png" alt="" className="img-fluid rounded-circle mb-2"/>
                <h4>Piotr Iablocichin</h4>
                <p>Back-end Developer</p>
            </div>
          </div>
        </div>
      </section>
      {/*Section Our Location*/}
      <div className="container">
        <div className="row">
          <div className="col">
            <h3 className="my-5 text-center">Our Location</h3>
            <div className="embed-responsive embed-responsive-21by9 mb-5 map">
              <iframe className="embed-responsive-item"
                      src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d2797.7950433447754!2d-73.60585134501659!3d45.47393248108342!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x4cc910a4eeac20d9%3A0x3071b1016ea7a0e2!2s2001+Avenue+de+Marlowe%2C+Montr%C3%A9al%2C+QC+H4A+3L4!5e0!3m2!1sen!2sca!4v1504288018264"
                      width="1110"
                      allowFullScreen>
              </iframe>
            </div>
          </div>
        </div>
      </div>

    </div>
  );
};

export default AboutPage;

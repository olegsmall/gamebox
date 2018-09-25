import React from 'react';
import ReactPropTypes from 'prop-types';

const MainPage = () => {
  return (
    <div className={"MainPage"}>
      <div className="swiper-container">
        <div className="swiper-wrapper">
          <div className="swiper-slide">
            <img className="d-block w-100" src="image/image_carusel3.jpg" alt="First slide"/>
          </div>
          <div className="swiper-slide">
            <img className="d-block w-100" src="image/image_carusel1.jpg" alt="Second slide"/>
          </div>
          <div className="swiper-slide">
            <img className="d-block w-100" src="image/image_carusel2.jpg" alt="Third slide"/>
          </div>
        </div>
        <div className="swiper-button-prev"></div>
        <div className="swiper-button-next"></div>
      </div>
      <h2 className="mt-5 ml-5 text-light">Recently released</h2>
      <h4 className="ml-5 text-light">
        Integer faucibus quam quis massa condimentum, ut vestibulum nisl gravida.
        Suspendisse potenti.
      </h4>
      <div className="card-deck m-5">
        <div className="card">
          <img className="card-img-top" src="image/img6.jpg" alt="Card image cap"/>
            <div className="card-body">
              <h5 className="card-title text-center">Game's name</h5>
              <p className="text-center">Genre : Action shooter</p>
              <p className="text-center">Rent/Buy : 25$/300$</p>
              <div className="text-center">
                <i className="fa fa-star-o"></i>
                <i className="fa fa-star-o"></i>
                <i className="fa fa-star-o"></i>
                <i className="fa fa-star-o"></i>
                <i className="fa fa-star-o"></i>
              </div>
              <div className="text-center mt-2">
                <button type="button" className="btn btn-success">rent</button>
                <button type="button" className="btn btn-success mr-2">buy</button>
              </div>
            </div>
        </div>
        <div className="card">
          <img className="card-img-top" src="image/img1.jpg" alt="Card image cap"/>
            <div className="card-body">
              <h5 className="card-title text-center">Game's name</h5>
              <p className="text-center">Genre : Action shooter</p>
              <p className="text-center">Rent/Buy : 25$/300$</p>
              <div className="text-center">
                <i className="fa fa-star-o"></i>
                <i className="fa fa-star-o"></i>
                <i className="fa fa-star-o"></i>
                <i className="fa fa-star-o"></i>
                <i className="fa fa-star-o"></i>
              </div>
              <div className="text-center mt-2">
                <button type="button" className="btn btn-success">rent</button>
                <button type="button" className="btn btn-success mr-2">buy</button>
              </div>
            </div>
        </div>
        <div className="card">
          <img className="card-img-top" src="image/img2.jpg" alt="Card image cap"/>
            <div className="card-body">
              <h5 className="card-title text-center">Game's name</h5>
              <p className="text-center">Genre : Action shooter</p>
              <p className="text-center">Rent/Buy : 25$/300$</p>
              <div className="text-center">
                <i className="fa fa-star-o"></i>
                <i className="fa fa-star-o"></i>
                <i className="fa fa-star-o"></i>
                <i className="fa fa-star-o"></i>
                <i className="fa fa-star-o"></i>
              </div>
              <div className="text-center mt-2">
                <button type="button" className="btn btn-success">rent</button>
                <button type="button" className="btn btn-success mr-2">buy</button>
              </div>
            </div>
        </div>
        <div className="card">
          <img className="card-img-top" src="image/img3.jpg" alt="Card image cap"/>
            <div className="card-body">
              <h5 className="card-title text-center">Game's name</h5>
              <p className="text-center">Genre : Action shooter</p>
              <p className="text-center">Rent/Buy : 25$/300$</p>
              <div className="text-center">
                <i className="fa fa-star-o"></i>
                <i className="fa fa-star-o"></i>
                <i className="fa fa-star-o"></i>
                <i className="fa fa-star-o"></i>
                <i className="fa fa-star-o"></i>
              </div>
              <div className="text-center mt-2">
                <button type="button" className="btn btn-success">rent</button>
                <button type="button" className="btn btn-success mr-2">buy</button>
              </div>
            </div>
        </div>
        <div className="card">
          <img className="card-img-top" src="image/img3.jpg" alt="Card image cap"/>
            <div className="card-body">
              <h5 className="card-title text-center">Game's name</h5>
              <p className="text-center">Genre : Action shooter</p>
              <p className="text-center">Rent/Buy : 25$/300$</p>
              <div className="text-center">
                <i className="fa fa-star-o"></i>
                <i className="fa fa-star-o"></i>
                <i className="fa fa-star-o"></i>
                <i className="fa fa-star-o"></i>
                <i className="fa fa-star-o"></i>
              </div>
              <div className="text-center mt-2">
                <button type="button" className="btn btn-success">rent</button>
                <button type="button" className="btn btn-success mr-2">buy</button>
              </div>
            </div>
        </div>
      </div>
      <h2 className="mt-5 ml-5 text-light">Most popular</h2>
      <h4 className="ml-5 text-light">
        Integer faucibus quam quis massa condimentum, ut vestibulum nisl gravida.
        Suspendisse potenti.
      </h4>
      <div className="card-deck m-5">
        <div className="card">
          <img className="card-img-top" src="image/img1.jpg" alt="Card image cap"/>
            <div className="card-body">
              <h5 className="card-title text-center">Game's name</h5>
              <p className="text-center">Genre : Action shooter</p>
              <p className="text-center">Rent/Buy : 25$/300$</p>
              <div className="text-center">
                <i className="fa fa-star-o"></i>
                <i className="fa fa-star-o"></i>
                <i className="fa fa-star-o"></i>
                <i className="fa fa-star-o"></i>
                <i className="fa fa-star-o"></i>
              </div>
              <div className="text-center mt-2">
                <button type="button" className="btn btn-success">rent</button>
                <button type="button" className="btn btn-success mr-2">buy</button>
              </div>
            </div>
        </div>
        <div className="card">
          <img className="card-img-top" src="image/img4.jpg" alt="Card image cap"/>
            <div className="card-body">
              <h5 className="card-title text-center">Game's name</h5>
              <p className="text-center">Genre : Action shooter</p>
              <p className="text-center">Rent/Buy : 25$/300$</p>
              <div className="text-center">
                <i className="fa fa-star-o"></i>
                <i className="fa fa-star-o"></i>
                <i className="fa fa-star-o"></i>
                <i className="fa fa-star-o"></i>
                <i className="fa fa-star-o"></i>
              </div>
              <div className="text-center mt-2">
                <button type="button" className="btn btn-success">rent</button>
                <button type="button" className="btn btn-success mr-2">buy</button>
              </div>
            </div>
        </div>
        <div className="card">
          <img className="card-img-top" src="image/img5.jpg" alt="Card image cap"/>
            <div className="card-body">
              <h5 className="card-title text-center">Game's name</h5>
              <p className="text-center">Genre : Action shooter</p>
              <p className="text-center">Rent/Buy : 25$/300$</p>
              <div className="text-center">
                <i className="fa fa-star-o"></i>
                <i className="fa fa-star-o"></i>
                <i className="fa fa-star-o"></i>
                <i className="fa fa-star-o"></i>
                <i className="fa fa-star-o"></i>
              </div>
              <div className="text-center mt-2">
                <button type="button" className="btn btn-success">rent</button>
                <button type="button" className="btn btn-success mr-2">buy</button>
              </div>
            </div>
        </div>
        <div className="card">
          <img className="card-img-top" src="image/img6.jpg" alt="Card image cap"/>
            <div className="card-body">
              <h5 className="card-title text-center">Game's name</h5>
              <p className="text-center">Genre : Action shooter</p>
              <p className="text-center">Rent/Buy : 25$/300$</p>
              <div className="text-center">
                <i className="fa fa-star-o"></i>
                <i className="fa fa-star-o"></i>
                <i className="fa fa-star-o"></i>
                <i className="fa fa-star-o"></i>
                <i className="fa fa-star-o"></i>
              </div>
              <div className="text-center mt-2">
                <button type="button" className="btn btn-success">rent</button>
                <button type="button" className="btn btn-success mr-2">buy</button>
              </div>
            </div>
        </div>
        <div className="card">
          <img className="card-img-top" src="image/img6.jpg" alt="Card image cap"/>
            <div className="card-body">
              <h5 className="card-title text-center">Game's name</h5>
              <p className="text-center">Genre : Action shooter</p>
              <p className="text-center">Rent/Buy : 25$/300$</p>
              <div className="text-center">
                <i className="fa fa-star-o"></i>
                <i className="fa fa-star-o"></i>
                <i className="fa fa-star-o"></i>
                <i className="fa fa-star-o"></i>
                <i className="fa fa-star-o"></i>
              </div>
              <div className="text-center mt-2">
                <button type="button" className="btn btn-success">rent</button>
                <button type="button" className="btn btn-success mr-2">buy</button>
              </div>
            </div>
        </div>
      </div>
    </div>
  );
};

export default MainPage;

import React from 'react';
import ReactPropTypes from 'prop-types';



const MainPageContent = () => {
  return (
    <div>
      <div id="carouselExampleIndicators" className="carousel slide" data-ride="carousel">
        <ol className="carousel-indicators">
          <li data-target="#carouselExampleIndicators" data-slide-to="0" className="active"></li>
          <li data-target="#carouselExampleIndicators" data-slide-to="1"></li>
          <li data-target="#carouselExampleIndicators" data-slide-to="2"></li>
        </ol>
        <div className="carousel-inner">
          <div className="carousel-item active">
            <img className="d-block w-100" src="/image/image_carusel3.jpg" alt="First slide"/>
            <div className="carousel-caption d-none d-md-block">
              <h1>Lorem ipsum</h1>
              <h3>Integer faucibus quam quis massa condimentum, ut vestibulum nisl gravida.</h3>
            </div>
          </div>
          <div className="carousel-item">
            <img className="d-block w-100" src="/image/image_carusel1.jpg" alt="Second slide"/>
            <div className="carousel-caption d-none d-md-block">
              <h1>Lorem ipsum</h1>
              <h3>Integer faucibus quam quis massa condimentum, ut vestibulum nisl gravida.</h3>
            </div>
          </div>
          <div className="carousel-item">
            <img className="d-block w-100" src="/image/image_carusel2.jpg" alt="Third slide"/>
            <div className="carousel-caption d-none d-md-block">
              <h1>Lorem ipsum</h1>
              <h3>Integer faucibus quam quis massa condimentum, ut vestibulum nisl gravida.</h3>
            </div>

          </div>
        </div>
        <a className="carousel-control-prev" href="#carouselExampleIndicators" role="button" data-slide="prev">
          <span className="carousel-control-prev-icon" aria-hidden="true"></span>
          <span className="sr-only">Previous</span>
        </a>
        <a className="carousel-control-next" href="#carouselExampleIndicators" role="button" data-slide="next">
          <span className="carousel-control-next-icon" aria-hidden="true"></span>
          <span className="sr-only">Next</span>
        </a>
      </div>
      <h2 className="mt-5 ml-5 text-light">Lorem ipsum</h2>
      <h4 className="ml-5 text-light">Integer faucibus quam quis massa condimentum, ut vestibulum nisl gravida.
        Suspendisse
        potenti.</h4>
      <div className="card-deck m-5">
        <div className="card">
          <img className="card-img-top" src="/image/img6.jpg" alt="Card image cap"/>
          <div className="card-body">
            <h5 className="card-title text-center">Game info</h5>
            <p className="card-text">This is a wider card with supporting text below as a natural lead-in to
              additional
              content.</p>
            <i className="fa fa-star-o"></i><i className="fa fa-star-o"></i><i className="fa fa-star-o"></i><i
            className="fa fa-star-o"></i><i className="fa fa-star-o"></i>
            <button type="button" className="btn btn-success pull-right">rent</button>
            <button type="button" className="btn btn-success pull-right mr-2">buy</button>
          </div>
        </div>
        <div className="card">
          <img className="card-img-top" src="/image/img1.jpg" alt="Card image cap"/>
          <div className="card-body">
            <h5 className="card-title text-center">Game info</h5>
            <p className="card-text">This is a wider card with supporting text below as a natural lead-in to
              additional
              content.</p>
            <i className="fa fa-star-o"></i><i className="fa fa-star-o"></i><i className="fa fa-star-o"></i><i
            className="fa fa-star-o"></i><i className="fa fa-star-o"></i>
            <button type="button" className="btn btn-success pull-right">rent</button>
            <button type="button" className="btn btn-success pull-right mr-2">buy</button>
          </div>
        </div>
        <div className="card">
          <img className="card-img-top" src="/image/img2.jpg" alt="Card image cap"/>
          <div className="card-body">
            <h5 className="card-title text-center">Game info</h5>
            <p className="card-text">This card has supporting text below as a natural lead-in to additional a natural
              content.</p>
            <i className="fa fa-star-o"></i><i className="fa fa-star-o"></i><i className="fa fa-star-o"></i><i
            className="fa fa-star-o"></i><i className="fa fa-star-o"></i>
            <button type="button" className="btn btn-success pull-right">rent</button>
            <button type="button" className="btn btn-success pull-right mr-2">buy</button>
          </div>
        </div>
        <div className="card">
          <img className="card-img-top" src="/image/img3.jpg" alt="Card image cap"/>
          <div className="card-body">
            <h5 className="card-title text-center">Game info</h5>
            <p className="card-text">This is a wider card with supporting text below as a natural lead-in to
              additional
              content.</p>
            <i className="fa fa-star-o"></i><i className="fa fa-star-o"></i><i className="fa fa-star-o"></i><i
            className="fa fa-star-o"></i><i className="fa fa-star-o"></i>
            <button type="button" className="btn btn-success pull-right">rent</button>
            <button type="button" className="btn btn-success pull-right mr-2">buy</button>
          </div>
        </div>
      </div>
      <h2 className="mt-5 ml-5 text-light">Lorem ipsum</h2>
      <h4 className="ml-5 text-light">Integer faucibus quam quis massa condimentum, ut vestibulum nisl gravida.
        Suspendisse
        potenti.</h4>
      <div className="card-deck m-5">
        <div className="card">
          <img className="card-img-top" src="/image/img1.jpg" alt="Card image cap"/>
          <div className="card-body">
            <h5 className="card-title text-center">Game info</h5>
            <p className="card-text">This is a wider card with supporting text below as a natural lead-in to
              additional
              content.</p>
            <i className="fa fa-star-o"></i><i className="fa fa-star-o"></i><i className="fa fa-star-o"></i><i
            className="fa fa-star-o"></i><i className="fa fa-star-o"></i>
            <button type="button" className="btn btn-success pull-right">rent</button>
            <button type="button" className="btn btn-success pull-right mr-2">buy</button>
          </div>
        </div>
        <div className="card">
          <img className="card-img-top" src="/image/img4.jpg" alt="Card image cap"/>
          <div className="card-body">
            <h5 className="card-title text-center">Game info</h5>
            <p className="card-text">This is a wider card with supporting text below as a natural lead-in to
              additional
              content.</p>
            <i className="fa fa-star-o"></i><i className="fa fa-star-o"></i><i className="fa fa-star-o"></i><i
            className="fa fa-star-o"></i><i className="fa fa-star-o"></i>
            <button type="button" className="btn btn-success pull-right">rent</button>
            <button type="button" className="btn btn-success pull-right mr-2">buy</button>
          </div>
        </div>
        <div className="card">
          <img className="card-img-top" src="/image/img5.jpg" alt="Card image cap"/>
          <div className="card-body">
            <h5 className="card-title text-center">Game info</h5>
            <p className="card-text">This card has supporting text below as a natural lead-in to additional a natural
              content.</p>
            <i className="fa fa-star-o"></i><i className="fa fa-star-o"></i><i className="fa fa-star-o"></i><i
            className="fa fa-star-o"></i><i className="fa fa-star-o"></i>
            <button type="button" className="btn btn-success pull-right">rent</button>
            <button type="button" className="btn btn-success pull-right mr-2">buy</button>
          </div>
        </div>
        <div className="card">
          <img className="card-img-top" src="/image/img6.jpg" alt="Card image cap"/>
          <div className="card-body">
            <h5 className="card-title text-center">Game info</h5>
            <p className="card-text">This is a wider card with supporting text below as a natural lead-in to
              additional
              content.</p>
            <i className="fa fa-star-o"></i><i className="fa fa-star-o"></i><i className="fa fa-star-o"></i><i
            className="fa fa-star-o"></i><i className="fa fa-star-o"></i>
            <button type="button" className="btn btn-success pull-right">rent</button>
            <button type="button" className="btn btn-success pull-right mr-2">buy</button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default MainPageContent;

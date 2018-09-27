import React from 'react';

require('./Footer.scss');

const Footer = () => {
  return (
    <div className={'Footer'}>
      <footer className="page-footer font-small teal pt-4">
        <div className="container-fluid text-center text-md-left">
          <div className="row">
            <div className="col-md-5 mt-md-0 mt-2 ml-5">
              <h5 className="text-uppercase font-weight-bold text-light">Footer text 1</h5>
              <p className="text-light">Lorem ipsum dolor sit, amet consectetur adipisicing elit. Expedita sapiente
                sint, nulla, nihil
                repudiandae commodi voluptatibus corrupti animi sequi aliquid magnam debitis</p>
            </div>
            <hr className="clearfix w-100 d-md-none pb-3"/>
              <div className="col-md-5 mb-md-0 mb-2 ml-5 ">
                <h5 className="text-uppercase font-weight-bold text-light">Footer text 2</h5>
                <p className="text-light">Lorem ipsum, dolor sit amet consectetur adipisicing elit. Optio deserunt fuga
                  perferendis modi
                  earum commodi aperiam temporibus quod nulla nesciunt aliquid debitis ullam</p>
              </div>
          </div>
        </div>
      </footer>
      <div className="container text-center">
        <div className="py-5">
          <div>
            <a className="fb-ic"><i className="fa fa-facebook fa-lg white-text mr-md-5 mr-3"> </i></a>
            <a className="tw-ic"> <i className="fa fa-twitter fa-lg white-text mr-md-5 mr-3"></i></a>
            <a className="gplus-ic"><i className="fa fa-google-plus fa-lg white-text mr-md-5 mr-3"></i> </a>
            <a className="li-ic"><i className="fa fa-linkedin fa-lg white-text mr-md-5 mr-3"></i></a>
            <a className="ins-ic"><i className="fa fa-instagram fa-lg white-text mr-md-5 mr-3"></i> </a>
            <a className="pin-ic"><i className="fa fa-pinterest fa-lg white-text"></i></a>
          </div>
        </div>
      </div>
      <div className="footer-copyright text-center py-3 text-light">© 2018 Copyright: Dream Team #1 with love</div>
    </div>
  );
};

export default Footer;

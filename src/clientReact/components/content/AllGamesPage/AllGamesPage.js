import React from 'react';
import Axios from "axios";

class AllGamesPage extends React.Component {

  componentDidMount(){

    // Fetching data for product list
    Axios.get('/product')
      .then((res) => {
        // handle success
        console.log(res);
      })
      .catch((error) => {
        console.log(error);
      });
  }

  render() {
    return (
      <div className="container mt-5 mb-5">
        <h2 className="mt-5 ml-5 mb-5 text-light">Games</h2>
        <div className="card-deck m-5">
          <div className="card">
            <img className="card-img-top" src="image/img1.jpg" alt="Card image cap"/>
            <div className="card-body">
              <h5 className="card-title text-center">Game's name</h5>
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
        <div className="card-deck m-5">
          <div className="card">
            <img className="card-img-top" src="image/img1.jpg" alt="Card image cap"/>
            <div className="card-body">
              <h5 className="card-title text-center">Game's name</h5>
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
        <div className="card-deck m-5">
          <div className="card">
            <img className="card-img-top" src="image/img1.jpg" alt="Card image cap"/>
            <div className="card-body">
              <h5 className="card-title text-center">Game's name</h5>
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
              <div className="text-center">
                <i className="fa fa-star-o"></i>
                <i className="fa fa-star-o"></i>
                <i className="fa fa-star-o"></i>
                <i className="fa fa-star-o"></i>
                <i className="fa fa-star-o"></i>
              </div>
              <div className="text-center">
                <div className="text-center mt-2">
                  <button type="button" className="btn btn-success">rent</button>
                  <button type="button" className="btn btn-success mr-2">buy</button>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    );
  }
}
export default AllGamesPage;

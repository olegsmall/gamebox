import React from 'react';

require('./AddProduct.scss');

class AddProduct extends React.Component {


  render() {

    return (
      <div>
        <h3 className="text-light text-center">Add game</h3>

        <form className="input-group">
          <label htmlFor="gameTitle"></label>
          <div className="input-group mb-1">
            <div className="input-group-prepend">
              <span className="input-group-text" id="gameTitle">game title</span>
            </div>
            <input type="text" className="form-control" id="gameTitle" aria-describedby="gameTitle"/>
          </div>

          <label htmlFor="gameDescription"></label>
          <div className="input-group mb-1">
            <div className="input-group-prepend">
              <span className="input-group-text">game description</span>
            </div>
            <textarea className="form-control" id="gameDescription" aria-label="With textarea"></textarea>
          </div>

          <div className="input-group mb-1">
            <div className="input-group-prepend">
              <label className="input-group-text" htmlFor="genreSelect">genre</label>
            </div>
            <select className="form-control" id="genreSelect">
              <option value="Action">Action</option>
              <option value="Role-Playing Game">Role-Playing Game</option>
              <option value="Horror">Horror</option>
              <option value="Real-Time Strategy">Real-Time Strategy</option>
              <option value="Survival">Survival</option>
              <option value="Fighting">Fighting</option>
              <option value="Shooter">Shooter</option>
              <option value="Simulator">Simulator</option>
            </select>
          </div>

          <label htmlFor="gameStatus"></label>
          <div className="input-group mb-1">
            <div className="input-group-prepend">
              <span className="input-group-text" id="gameStatus">status</span>
            </div>
            <input type="text" className="form-control" id="gameOwner" aria-describedby="gameStatus"/>
          </div>
        </form>

        <form className="form-inline">
          <label className="sr-only" htmlFor="priceSell"></label>
          <div className="input-group mb-2 mr-sm-3">
            <div className="input-group-prepend">
              <div className="input-group-text">
                <input className="form-input" type="radio" name="gridRadios" id="gridRadios1"
                       value="option1"/>
                <label className="form-label" htmlFor="gridRadios1">
                </label>
              </div>
            </div>
            <input type="text" className="form-control" id="priceSell" placeholder="sell price"/>
          </div>

          <label className="sr-only" htmlFor="priceRent"></label>
          <div className="input-group mb-2 mr-sm-3">
            <div className="input-group-prepend">
              <div className="input-group-text">
                <input className="form-input" type="radio" name="gridRadios" id="gridRadios2"
                       value="option1"/>
                <label className="form-label" htmlFor="gridRadios2">
                </label>
              </div>
            </div>
            <input type="text" className="form-control" id="priceRent" placeholder="rent price"/>
          </div>
        </form>

        <form className="form-inline">
          <label className="sr-only" htmlFor="GroupDate"></label>
          <div className="input-group mb-2 mr-sm-3">
            <div className="input-group-prepend">
              <div className="input-group-text"><i className="fa fa-calendar-o" aria-hidden="true"></i></div>
            </div>
            <input type="text" className="form-control" id="GroupDate" placeholder="date added"/>
          </div>

          <label className="sr-only" htmlFor="GroupUsername"></label>
          <div className="input-group mb-2 mr-sm-3">
            <div className="input-group-prepend">
              <div className="input-group-text"><i className="fa fa-user-o" aria-hidden="true"></i></div>
            </div>
            <input type="text" className="form-control" id="GroupUsername" placeholder="Username"/>
          </div>
        </form>
        <form>
          <div className="text-light mb-2 mt-4">
            <a href=""><img src="/image/upload_img.png" alt="avatar" width="100" height="100" className="mr-2"/></a>
            <a href=""><img src="/image/upload_img.png" alt="avatar" width="100" height="100" className="mr-2"/></a>
            <a href=""><img src="/image/upload_img.png" alt="avatar" width="100" height="100" className="mr-2"/></a>
            <a href=""><img src="/image/upload_img.png" alt="avatar" width="100" height="100" className="mr-2"/></a>
            <a href=""><img src="/image/upload_img.png" alt="avatar" width="100" height="100" className="mr-2"/></a>
            <a href=""><img src="/image/upload_img.png" alt="avatar" width="100" height="100" className=""/></a>
          </div>


          <label htmlFor="gameVideo"></label>
          <div className="input-group mb-1">
            <div className="input-group-prepend">
              <span className="input-group-text" id="gameVideo">video</span>
            </div>
            <input type="text" className="form-control" id="gameTitle" aria-describedby="gameVideo"
                   placeholder="upload your video to your ad"/>
          </div>

        </form>
        <button type="submit" className="btn btn-secondary mb-5 text-center">Add</button>
      </div>
    )
      ;
  }

}

export default AddProduct;

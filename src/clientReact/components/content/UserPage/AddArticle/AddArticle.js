import React from 'react';

require('./AddArticle.scss');

class AddArticle extends React.Component {

  render() {
    function addImage(e) {
      e.preventDefault();
      let img = document.getElementById('imageAdd');
      let inputImg = document.getElementById('image');

      img.innerHTML = inputImg.value;
      inputImg.value = '';
    }

    function addVideo(e) {
      e.preventDefault();
      let video = document.getElementById('videoAdd');
      let inputVideo = document.getElementById('video');

      video.innerHTML = inputVideo.value;
      inputVideo.value = '';
    }

    function addTags(e) {
      e.preventDefault();
      let tags = document.getElementById('tagsAdd');
      let inutTags = document.getElementById('tags');

      tags.innerHTML = inutTags.value;
      inutTags.value = '';
    }

    return (
      <div>
        <form className="mb-5">
          <div className="form-group">
            <input type="text" className="form-control form-control-sm" id="name" placeholder="Article's name"/>
          </div>
          <div className="form-group">
            <textarea className="form-control" id="content" rows="5" placeholder="Content"></textarea>
          </div>
          <div id="imageAdd" className="text-light"></div>
          <div className="form-row mb-3">
            <div className="col-9">
              <input type="text" className="form-control form-control-sm" id="image" placeholder="Load image"/>
            </div>
            <div className="col-3">
              <button className="btn btn-sm btn-success btn-block" onClick={addImage}>Add</button>
            </div>
          </div>
          <div id="videoAdd" className="text-light"></div>
          <div className="form-row mb-3">
            <div className="col-9">
              <textarea className="form-control" id="video" placeholder="Load video"></textarea>
            </div>
            <div className="col-3">
              <button className="btn btn-success btn-block" onClick={addVideo}>Add</button>
            </div>
          </div>
          <div id="tagsAdd" className="text-light"></div>
          <div className="form-row mb-3">
            <div className="col-9">
              <textarea className="form-control" id="tags" rows="2" placeholder="Tags"></textarea>
            </div>
            <div className="col-3">
              <button type="submit" className="btn btn-success btn-block" onClick={addTags}>Add</button>
            </div>
          </div>
          <button type="submit" className="btn btn-success btn-block">Save</button>
        </form>
      </div>
    );
  }
}

export default AddArticle;

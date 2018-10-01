import React from 'react';

require('./AddArticle.scss');

class AddArticle extends React.Component {

  constructor(props){
    super(props);
    if (this.props.pageType === 'AddArticle'){
      this.state = {
        title: '',
        content: '',
        images: '',
        videos: '',
      };
    }
    else if (this.props.pageType === 'EditArticle'){
      this.state = {
        title: this.props.atricle.title,
        content: this.props.article.content,
        images: this.props.article.images,
        videos: this.props.article.videos,
      };
    }
  }


  handleSubmit(e){
    e.preventDefault();

  }


  render() {
    // function addImage(e) {
    //   e.preventDefault();
    //   let img = document.getElementById('imageAdd');
    //   let inputImg = document.getElementById('image');
    //
    //   img.innerHTML = inputImg.value;
    //   inputImg.value = '';
    // }
    //
    // function addVideo(e) {
    //   e.preventDefault();
    //   let video = document.getElementById('videoAdd');
    //   let inputVideo = document.getElementById('video');
    //
    //   video.innerHTML = inputVideo.value;
    //   inputVideo.value = '';
    // }
    //
    // function addTags(e) {
    //   e.preventDefault();
    //   let tags = document.getElementById('tagsAdd');
    //   let inutTags = document.getElementById('tags');
    //
    //   tags.innerHTML = inutTags.value;
    //   inutTags.value = '';
    // }

    return (
      <div>
        <h1>Add Article:</h1>
        <form className="mb-5" onSubmit={this.handleSubmit.bind(this)}>
          <div className="form-group">
            <input
              name="title"
              type="text"
              className="form-control form-control-sm"
              placeholder="Article's title"/>
          </div>
          <div className="form-group">
            <textarea
              name="content"
              className="form-control"
              rows="5"
              placeholder="Content">
            </textarea>
          </div>
          {/*<div id="imageAdd" className="text-light"></div>*/}
          <div className="form-row mb-3">
            <div className="col-9">
              <input
                name="images"
                type="text"
                className="form-control form-control-sm"
                placeholder="Load image"/>
            </div>
            {/*<div className="col-3">*/}
              {/*<button className="btn btn-sm btn-success btn-block" onClick={addImage}>Add</button>*/}
            {/*</div>*/}
          </div>
          <div id="videoAdd" className="text-light"></div>
          <div className="form-row mb-3">
            <div className="col-9">
              <textarea
                name="videos"
                className="form-control"
                placeholder="Load video">
              </textarea>
            </div>
            {/*<div className="col-3">*/}
              {/*<button className="btn btn-success btn-block" onClick={addVideo}>Add</button>*/}
            {/*</div>*/}
          </div>
          {/*<div id="tagsAdd" className="text-light"></div>*/}
          {/*<div className="form-row mb-3">*/}
            {/*<div className="col-9">*/}
              {/*<textarea className="form-control" id="tags" rows="2" placeholder="Tags"></textarea>*/}
            {/*</div>*/}
            {/*<div className="col-3">*/}
              {/*<button type="submit" className="btn btn-success btn-block" onClick={addTags}>Add</button>*/}
            {/*</div>*/}
          {/*</div>*/}
          <button type="submit" className="btn btn-success btn-block">Save</button>
        </form>
      </div>
    );
  }
}

export default AddArticle;

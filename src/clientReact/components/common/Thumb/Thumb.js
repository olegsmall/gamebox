/**
 * Theme: Web Project 2
 * Description: Creating a gaming platform for exchange between players
 * File: Thumb.js, image component
 * Authors: Oleg Smolovyk, Iana Kravchenko, Svitlana Melnyk
 * Date: October 2018
 */

import React from 'react';

/**
 * Class Thumb, image component.
 */
class Thumb extends React.Component {
  //Class constructor using for a state props and for initializing state properties
  constructor(props){
    super(props);
    this.state = {
      loading: false,
      thumb: undefined,
    };
  }

  //Using for updating state synchronously
  componentWillReceiveProps(nextProps) {
    if (!nextProps.file) {
      return;
    }
    this.setState({loading: true}, () => {
      let reader = new FileReader();

      reader.onloadend = () => {
        this.setState({loading: false, thumb: reader.result});
      };

      reader.readAsDataURL(nextProps.file);
    });
  }

  //Add to DOM
  render() {
    const {file, object, defaultImage, className, size: {width=200, height=200} = {}} = this.props;

    if (!file && !object) {
      return (<img
        src={defaultImage}
        alt={'image'}
        className={className}
        width={width}
        height={height}
      />);
    }

    let thumb = '';
    if (!file) {
      thumb = (object.avatar)? object.avatar : object.image;
    }else {
      thumb = this.state.thumb;
    }

    return (<img
      src={thumb}
      alt={'image'}
      className={className}
      width={width}
      height={height}
    />);
  }
}

export default Thumb;

import React from 'react';

class Thumb extends React.Component {
  constructor(props){
    super(props);
    this.state = {
      loading: false,
      thumb: undefined,
    };
  }

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

  render() {
    const {file} = this.props;
    let thumb = '';
    if (!file) {
      thumb = this.props.user.avatar;
    }else {
      thumb = this.state.thumb;
    }

    if (!file && !this.props.user) {
      return null;
    }

    return (<img
      src={thumb}
      alt={'avatar ' + this.props.user.firstName + ' ' + this.props.user.lastName}
      className="img-thumbnail mt-2"
      height={200}
      width={200}
    />);
  }
}

export default Thumb;
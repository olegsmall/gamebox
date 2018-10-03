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
    const {file, user} = this.props;

    if (!file && !user) {
      return null;
    }

    let thumb = '';
    if (!file) {
      thumb = user.avatar;
    }else {
      thumb = this.state.thumb;
    }

    return (<img
      src={thumb}
      alt={'avatar'}
      className="img-thumbnail mt-2"
      height={200}
      width={200}
    />);
  }
}

export default Thumb;

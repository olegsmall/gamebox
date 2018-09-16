import React from 'react';
import ReactPropTypes from 'prop-types';

const Header = ({message}) => {
  return (
    <h2 className={'Header text-center'}>
      {message}
    </h2>
  );
};

// React properties validation. Validates the type of properties
Header.propTypes = {
  message: ReactPropTypes.string.isRequired
};
// Default values for react properties
Header.defaultProps = {
  message: 'Hello Default Props!'
};

export default Header;

import React from 'react';
import PropTypes from 'prop-types';

const Header = ({ visibility }) => <div style={{ visibility }}>header</div>;

Header.propTypes = {
  visibility: PropTypes.string.isRequired,
};

export default Header;

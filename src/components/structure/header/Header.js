import React from 'react';
import PropTypes from 'prop-types';
import { Link } from 'react-router-dom';

// Styled
import Styled from './Header.styled';

const Menu = () => (
  <Styled.MenuWrapper>
    <Link to="/survey">Survey</Link>
    <Link to="/sign-out">Sign Out</Link>
  </Styled.MenuWrapper>
);

const Header = ({ visibility }) => (
  <Styled.HeaderWrapper style={{ visibility }}>
    <h1>Littera Admin</h1>
    <Menu />
  </Styled.HeaderWrapper>
);

Header.propTypes = {
  visibility: PropTypes.string.isRequired,
};

export default Header;

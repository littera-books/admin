import React from 'react';
import PropTypes from 'prop-types';
import { Link } from 'react-router-dom';
import dataConfig from '../../../dataConfig';

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
    <Link to="/dashboard">
      <h1>{dataConfig.siteTitle}</h1>
    </Link>
    <Menu />
  </Styled.HeaderWrapper>
);

Header.propTypes = {
  visibility: PropTypes.string.isRequired,
};

export default Header;
import React, { Fragment } from 'react';
import { Link } from 'react-router-dom';

// Components
import Helmet from '../helmet/Helmet';

// Styled
import StyledBase from '../../styled/Base';
import Styled from './Dashboard.styled';

export const Menu = () => (
  <Fragment>
    <Link to="/survey">
      <Styled.DashboardTitle id="survey">Survey</Styled.DashboardTitle>
    </Link>
    <Link to="/sign-out">
      <Styled.DashboardTitle>Sign Out</Styled.DashboardTitle>
    </Link>
  </Fragment>
);

const Dashboard = () => (
  <StyledBase.FlexWrapper>
    <Helmet pageTitle="Dashboard" />
    <Menu />
  </StyledBase.FlexWrapper>
);

export default Dashboard;

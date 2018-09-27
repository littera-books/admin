import React from 'react';
import dataConfig from '../../dataConfig';

// Components
import Helmet from '../helmet/Helmet';

// Styled
import StyledBase from '../../styled/Base';

const Dashboard = () => (
  <StyledBase.FlexWrapper>
    <Helmet pageTitle="Dashboard" />
    <h1>{dataConfig.dashboardText}</h1>
  </StyledBase.FlexWrapper>
);

export default Dashboard;

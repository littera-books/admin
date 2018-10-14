import React from 'react';
import dataConfig from '../../../dataConfig';

// Components
import Helmet from '../../helmet/Helmet';

// Styled
import StyledBase from '../../../styled/Wrapper';

const Dashboard = () => (
  <StyledBase.FlexWrapper>
    <Helmet pageTitle="Dashboard" />
    <h4>{dataConfig.dashboardText}</h4>
  </StyledBase.FlexWrapper>
);

export default Dashboard;

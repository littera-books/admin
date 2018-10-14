import React from 'react';
import dataConfig from '../../../dataConfig';

// Components
import Helmet from '../../helmet/Helmet';

// Styled
import Wrapper from '../../../styled_base/Wrapper';

const Dashboard = () => (
  <Wrapper.FlexWrapper>
    <Helmet pageTitle="Dashboard" />
    <h4>{dataConfig.dashboardText}</h4>
  </Wrapper.FlexWrapper>
);

export default Dashboard;

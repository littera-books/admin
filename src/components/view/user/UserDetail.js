import React from 'react';
import dataConfig from '../../../dataConfig';

// Styled
import Wrapper from '../../../styled_base/Wrapper';

export const DefaultUserDetail = () => (
  <Wrapper.DefaultDetailWrapper>
    <p>{dataConfig.defaultDetailText}</p>
  </Wrapper.DefaultDetailWrapper>
);

const ActiveUserDetail = () => (
  <Wrapper.ActiveDetailWrapper>
    <p>detail</p>
  </Wrapper.ActiveDetailWrapper>
);

export default ActiveUserDetail;

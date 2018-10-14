import React from 'react';
import dataConfig from '../../../dataConfig';

// Styled
import Wrapper from '../../../styled_base/Wrapper';

export const DefaultProductDetail = () => (
  <Wrapper.DefaultDetailWrapper>
    <p>{dataConfig.defaultDetailText}</p>
  </Wrapper.DefaultDetailWrapper>
);

const ActiveProductDetail = () => (
  <Wrapper.ActiveDetailWrapper>
    <p>active product</p>
  </Wrapper.ActiveDetailWrapper>
);

export default ActiveProductDetail;

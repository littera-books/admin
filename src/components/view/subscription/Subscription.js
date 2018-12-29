import React from 'react';

// Styled
import Wrapper from '../../../styled_base/Wrapper';

class Subscription extends React.Component {
  shouldComponentUpdate() {
    return false;
  }

  render() {
    return <Wrapper.ActiveDetailWrapper>hi</Wrapper.ActiveDetailWrapper>;
  }
}

export default Subscription;

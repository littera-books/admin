import React from 'react';
import PropTypes from 'prop-types';
import { PrivateRoute } from '../../../App';
import dataConfig from '../../../dataConfig';

// Components
import Helmet from '../../helmet/Helmet';
import Loadable from '../../../loadable';
import { DefaultUserDetail } from './UserDetail';

// Styled
import Wrapper from '../../../styled_base/Wrapper';

const User = ({ match }) => (
  <Wrapper.SectionWrapper>
    <Helmet pageTitle="User" />
    <h5>
      <strong>{dataConfig.userTitle}</strong>
    </h5>
    <Wrapper.SectionInnerWrapper>
      <Loadable.UserList matchUrl={match.url} />
      <PrivateRoute exact path={`${match.url}`} component={DefaultUserDetail} />
      <PrivateRoute
        path={`${match.url}/:userId`}
        component={Loadable.UserDetail}
      />
    </Wrapper.SectionInnerWrapper>
  </Wrapper.SectionWrapper>
);

User.propTypes = {
  match: PropTypes.shape({
    url: PropTypes.string.isRequired,
  }).isRequired,
};

export default User;

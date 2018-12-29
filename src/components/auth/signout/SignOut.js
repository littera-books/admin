import React from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { Link } from 'react-router-dom';
import { signOut } from '../../../reducers/reducer.auth';

// Components
import Helmet from '../../helmet/Helmet';

// Styled
import Wrapper from '../../../styled_base/Wrapper';

export class SignOut extends React.Component {
  componentDidMount() {
    const { logOut } = this.props;
    logOut();
  }

  render() {
    return (
      <Wrapper.FlexWrapper>
        <Helmet pageTitle="Sign Out" />
        <h4>
          로그아웃되었습니다.&nbsp;
          <Link to="/sign-in">
            <strong>로그인</strong>
          </Link>
        </h4>
      </Wrapper.FlexWrapper>
    );
  }
}

SignOut.propTypes = {
  history: PropTypes.shape({
    replace: PropTypes.func.isRequired,
  }).isRequired,
  logOut: PropTypes.func.isRequired,
};

const mapDispatchToProps = dispatch => ({
  logOut: () => dispatch(signOut()),
});

export default connect(
  null,
  mapDispatchToProps,
)(SignOut);

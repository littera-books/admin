import React from 'react';
import PropTypes from 'prop-types';
import { Link } from 'react-router-dom';
import { connect } from 'react-redux';
import { signOut } from '../../../reducers/reducer.auth';

// Styled
import StyledBase from '../../../styled/Base';

export class SignOut extends React.Component {
  componentDidMount() {
    const { logOut } = this.props;
    logOut();
  }

  render() {
    return (
      <StyledBase.FlexWrapper>
        <StyledBase.ColumnWrapper>
          <h4>로그아웃되었습니다.</h4>
          <br />
          <Link to="/sign-in">다시 로그인하기</Link>
        </StyledBase.ColumnWrapper>
      </StyledBase.FlexWrapper>
    );
  }
}

SignOut.propTypes = {
  logOut: PropTypes.func.isRequired,
};

export const mapDispatchToProps = dispatch => ({
  logOut: () => dispatch(signOut()),
});

export default connect(
  null,
  mapDispatchToProps,
)(SignOut);

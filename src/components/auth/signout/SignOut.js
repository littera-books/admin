import React from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { signOut } from '../../../reducers/reducer.auth';
import { setPopupHeaderMessage } from '../../../reducers/reducer.popup';
import dataConfig from '../../../dataConfig';

// Components
import Loadable from '../../../loadable';
import Helmet from '../../helmet/Helmet';

// Styled
import Wrapper from '../../../styled_base/Wrapper';

export class SignOut extends React.Component {
  state = {
    popupFilter: false,
  };

  componentDidMount() {
    const { logOut, setPopup } = this.props;
    setPopup(dataConfig.popupMessage.signOut);
    this.setState({ popupFilter: true });
    logOut();
  }

  render() {
    const { popupFilter } = this.state;
    const { history } = this.props;
    return (
      <Wrapper.FlexWrapper>
        <Helmet pageTitle="Sign Out" />
        <h1>Sign Out</h1>
        <h4>로그아웃되었습니다.</h4>
        {popupFilter ? (
          <Loadable.SimplePopup
            replace={history.replace}
            destination="/sign-in"
          />
        ) : null}
      </Wrapper.FlexWrapper>
    );
  }
}

SignOut.propTypes = {
  history: PropTypes.shape({
    replace: PropTypes.func.isRequired,
  }).isRequired,
  logOut: PropTypes.func.isRequired,
  setPopup: PropTypes.func.isRequired,
};

const mapDispatchToProps = dispatch => ({
  logOut: () => dispatch(signOut()),
  setPopup: payload => dispatch(setPopupHeaderMessage(payload)),
});

export default connect(
  null,
  mapDispatchToProps,
)(SignOut);

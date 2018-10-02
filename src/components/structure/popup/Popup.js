import React from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { initializePopup } from '../../../reducers/reducer.popup';

// Styled
import Styled from './Popup.styled';

class Popup extends React.Component {
  constructor(props) {
    super(props);

    this.cancelPopup = this.cancelPopup.bind(this);
    this.confirmPopup = this.confirmPopup.bind(this);
  }

  cancelPopup() {
    const { initialize } = this.props;
    initialize();
  }

  async confirmPopup() {
    const {
      initialize, method, argument, replace, destination,
    } = this.props;

    await method(argument);
    initialize();
    replace(destination);
    window.location.reload();
  }

  render() {
    const { visibility, header, message } = this.props;

    return (
      <Styled.PopupBackground style={{ visibility }}>
        <Styled.PopupWrapper>
          <Styled.PopupHeader>
            <h3>
              <strong>{header}</strong>
            </h3>
            <button type="button" onClick={this.cancelPopup}>
              <strong>&times;</strong>
              &nbsp;
            </button>
          </Styled.PopupHeader>
          <Styled.PopupBody>
            <p>{message}</p>
          </Styled.PopupBody>
          <Styled.PopupFooter>
            <button type="button" onClick={this.cancelPopup}>
              Cancel
            </button>
            <button type="button" onClick={this.confirmPopup}>
              Confirm
            </button>
          </Styled.PopupFooter>
        </Styled.PopupWrapper>
      </Styled.PopupBackground>
    );
  }
}

Popup.propTypes = {
  visibility: PropTypes.string.isRequired,
  header: PropTypes.string.isRequired,
  message: PropTypes.string.isRequired,
  initialize: PropTypes.func.isRequired,
  method: PropTypes.func.isRequired,
  argument: PropTypes.string.isRequired,
  replace: PropTypes.func.isRequired,
  destination: PropTypes.string.isRequired,
};

const mapStateToProps = state => ({
  header: state.popup.header,
  message: state.popup.message,
});

const mapDispatchToProps = dispatch => ({
  initialize: () => dispatch(initializePopup()),
});

export default connect(
  mapStateToProps,
  mapDispatchToProps,
)(Popup);

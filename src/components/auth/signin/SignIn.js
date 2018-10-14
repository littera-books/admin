import React from 'react';
import PropTypes from 'prop-types';
import { Field, reduxForm } from 'redux-form';
import { connect } from 'react-redux';
import {
  VisibilityFilters,
  setVisibilityFilter,
} from '../../../reducers/reducer.controlHeader';
import { initialize, signIn } from '../../../reducers/reducer.auth';
import { setPopupHeaderMessage } from '../../../reducers/reducer.popup';
import dataConfig from '../../../dataConfig';

// Components
import Loadable from '../../../loadable';
import BasicFormField from '../../../form/FormField';
import Validation from '../../../form/Validation';
import Helmet from '../../helmet/Helmet';

// Styled
import Wrapper from '../../../styled_base/Wrapper';
import Element from '../../../styled_base/Element';
import Styled from './SignIn.styled';

export class SignIn extends React.Component {
  state = {
    popupFilter: false,
  };

  componentDidMount() {
    const { init, filter } = this.props;
    init();
    filter(VisibilityFilters.HIDE_HEADER);
  }

  componentWillUnmount() {
    const { filter } = this.props;
    filter(VisibilityFilters.SHOW_HEADER);
  }

  async onSubmit(payload) {
    const { logIn } = this.props;
    await logIn(payload);

    const { error, setPopup } = this.props;
    if (!error) {
      setPopup(dataConfig.popupMessage.signIn);
      await this.setState({
        popupFilter: true,
      });
    }
  }

  render() {
    const { popupFilter } = this.state;
    const { handleSubmit, error, history } = this.props;

    return (
      <Wrapper.FlexWrapper>
        <Helmet pageTitle="SignIn" />
        <Wrapper.ColumnWrapper>
          <h3>Sign In</h3>
          <form action="post" onSubmit={handleSubmit(this.onSubmit.bind(this))}>
            <Field
              type="text"
              name="username"
              placeholder="Identification"
              component={BasicFormField.PlaceholderFormField}
              validate={Validation.required}
            />
            <Field
              type="password"
              name="password"
              placeholder="Password"
              component={BasicFormField.PlaceholderFormField}
              validate={Validation.required}
            />
            <div>
              <Element.BasicSmall>{error}</Element.BasicSmall>
            </div>
            <Styled.SignInButton type="submit">Sign In</Styled.SignInButton>
          </form>
          <p>Forgot your password?</p>
        </Wrapper.ColumnWrapper>
        {popupFilter ? (
          <Loadable.SimplePopup
            replace={history.replace}
            destination="/dashboard"
          />
        ) : null}
      </Wrapper.FlexWrapper>
    );
  }
}

SignIn.propTypes = {
  handleSubmit: PropTypes.func.isRequired,
  init: PropTypes.func.isRequired,
  logIn: PropTypes.func.isRequired,
  error: PropTypes.string.isRequired,
  filter: PropTypes.func.isRequired,
  history: PropTypes.shape({
    replace: PropTypes.func.isRequired,
  }).isRequired,
  setPopup: PropTypes.func.isRequired,
};

export const mapStateToProps = state => ({
  error: state.auth.error,
});

export const mapDispatchToProps = dispatch => ({
  init: () => dispatch(initialize()),
  logIn: payload => dispatch(signIn(payload)),
  filter: filter => dispatch(setVisibilityFilter(filter)),
  setPopup: payload => dispatch(setPopupHeaderMessage(payload)),
});

export default reduxForm({
  form: 'SignInForm',
})(
  connect(
    mapStateToProps,
    mapDispatchToProps,
  )(SignIn),
);

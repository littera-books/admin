import React from 'react';
import PropTypes from 'prop-types';
import { Redirect } from 'react-router-dom';
import { Field, reduxForm } from 'redux-form';
import { connect } from 'react-redux';
import {
  VisibilityFilters,
  setVisibilityFilter,
} from '../../../reducers/reducer.controlHeader';
import { initialize, signIn } from '../../../reducers/reducer.auth';

// Components
import Helmet from '../../helmet/Helmet';
import FormField from '../FormField';

// Styled
import Wrapper from '../../../styled/Wrapper';
import Styled from './SignIn.styled';

export class SignIn extends React.Component {
  state = {
    redirect: false,
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

    const { error } = this.props;
    if (!error) {
      await this.setState({
        redirect: true,
      });
    }
  }

  render() {
    const { redirect } = this.state;
    const { handleSubmit, error } = this.props;

    if (redirect) {
      return <Redirect to="/dashboard" />;
    }

    return (
      <Wrapper.FlexWrapper>
        <Helmet pageTitle="SignIn" />
        <Wrapper.ColumnWrapper>
          <h3>Sign In</h3>
          <Styled.FormWrapper
            action="post"
            onSubmit={handleSubmit(this.onSubmit.bind(this))}
          >
            <Field
              type="text"
              name="username"
              label="IDENTIFICATION _"
              component={FormField}
            />
            <Field
              type="password"
              name="password"
              label="PASSWORD _"
              component={FormField}
            />
            <div>
              <small>{error}</small>
            </div>
            <Styled.SignInButton type="submit">Sign In</Styled.SignInButton>
          </Styled.FormWrapper>
          <p>Not a member yet?</p>
          <p>Forgot your password?</p>
        </Wrapper.ColumnWrapper>
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
};

export const mapStateToProps = state => ({
  error: state.auth.error,
});

export const mapDispatchToProps = dispatch => ({
  init: () => dispatch(initialize()),
  logIn: payload => dispatch(signIn(payload)),
  filter: filter => dispatch(setVisibilityFilter(filter)),
});

export default reduxForm({
  form: 'SignInForm',
})(
  connect(
    mapStateToProps,
    mapDispatchToProps,
  )(SignIn),
);

import React from 'react';
import PropTypes from 'prop-types';
import { Field, reduxForm } from 'redux-form';
import { connect } from 'react-redux';
import {
  VisibilityFilters,
  setVisibilityFilter,
} from '../../../reducers/reducer.controlHeader';
import { initialize, signIn } from '../../../reducers/reducer.auth';

// Components
import BasicFormField from '../../../form/FormField';
import Validation from '../../../form/Validation';
import Helmet from '../../helmet/Helmet';

// Styled
import Wrapper from '../../../styled_base/Wrapper';
import Element from '../../../styled_base/Element';
import Styled from './SignIn.styled';

export class SignIn extends React.Component {
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

    const { error, history } = this.props;
    if (!error) {
      history.replace('/dashboard');
    }
  }

  render() {
    const { handleSubmit, error } = this.props;
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
  history: PropTypes.shape({
    replace: PropTypes.func.isRequired,
  }).isRequired,
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

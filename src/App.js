import React from 'react';
import PropTypes from 'prop-types';
import {
  BrowserRouter, Route, Switch, Redirect,
} from 'react-router-dom';
import { connect } from 'react-redux';
import moment from 'moment';
import dataConfig from './dataConfig';
import './utils/webfontloader';

// Components
import Loadable from './loadable';

// Styled
import Wrapper from './styled_base/Wrapper';

// Minireset.css
import '../node_modules/minireset.css/minireset.min.css';

export const PrivateRoute = ({ component: Component, ...rest }) => {
  const token = sessionStorage.getItem('adminToken');

  if (!token) {
    return (
      <Route
        {...rest}
        render={props => (
          <Redirect
            to={{
              pathname: '/sign-in',
              state: { from: props.location },
            }}
          />
        )}
      />
    );
  }

  const base64Url = token.split('.')[1];
  const decodedData = JSON.parse(window.atob(base64Url));
  const now = moment.now();
  const result = moment(moment(now).format()).isSameOrBefore(
    moment.unix(decodedData.exp).format(),
  );

  if (!result) {
    alert(dataConfig.tokenExpiredText);
    return (
      <Route
        {...rest}
        render={props => (
          <Redirect
            to={{
              pathname: '/sign-in',
              state: { from: props.location },
            }}
          />
        )}
      />
    );
  }

  return <Route {...rest} render={props => <Component {...props} />} />;
};

export class App extends React.PureComponent {
  render() {
    const { isVisible } = this.props;

    return (
      <BrowserRouter>
        <Wrapper.App className="App">
          <Loadable.Header visibility={isVisible} />
          <Switch>
            <PrivateRoute path="/user" component={Loadable.User} />
            <PrivateRoute path="/product" component={Loadable.Product} />
            <PrivateRoute path="/survey" component={Loadable.Survey} />
            <PrivateRoute
              path="/resign/:surveyId"
              component={Loadable.ResignSurveyDetail}
            />
            <PrivateRoute path="/resign" component={Loadable.ResignSurvey} />
            <PrivateRoute path="/dashboard" component={Loadable.Dashboard} />
            <Route path="/sign-out" component={Loadable.SignOut} />
            <Route path="/sign-in" component={Loadable.SignIn} />
            <Redirect exact from="/" to="/sign-in" />
          </Switch>
        </Wrapper.App>
      </BrowserRouter>
    );
  }
}

App.propTypes = {
  isVisible: PropTypes.string.isRequired,
};

const mapStateToProps = state => ({
  isVisible: state.controlHeader,
});

export default connect(mapStateToProps)(App);

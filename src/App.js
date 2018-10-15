import React from 'react';
import PropTypes from 'prop-types';
import {
  BrowserRouter, Route, Switch, Redirect,
} from 'react-router-dom';
import { connect } from 'react-redux';
import './utils/webfontloader';

// Components
import Loadable from './loadable';

// Styled
import Wrapper from './styled_base/Wrapper';

// Minireset.css
import '../node_modules/minireset.css/minireset.min.css';

export const PrivateRoute = ({ component: Component, ...rest }) => (
  <Route
    {...rest}
    render={props => (sessionStorage.getItem('adminToken') ? (
        <Component {...props} />
    ) : (
        <Redirect
          to={{
            pathname: '/sign-in',
            state: { from: props.location },
          }}
        />
    ))
    }
  />
);

export class App extends React.PureComponent {
  render() {
    const { isVisible } = this.props;

    return (
      <BrowserRouter>
        <Wrapper.App className="App">
          <Loadable.Header visibility={isVisible} />
          <Switch>
            <PrivateRoute
              path="/user/:userId/letter-box"
              component={Loadable.LetterBox}
            />
            <PrivateRoute path="/user" component={Loadable.User} />
            <PrivateRoute path="/product" component={Loadable.Product} />
            <PrivateRoute path="/survey" component={Loadable.Survey} />
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

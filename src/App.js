import React from 'react';
import PropTypes from 'prop-types';
import {
  BrowserRouter, Route, Switch, Redirect,
} from 'react-router-dom';
import { connect } from 'react-redux';

// Components
import Loadable from './loadable';

// Styled
import StyledBase from './styled/Base';

// Minireset.css
import '../node_modules/minireset.css/minireset.min.css';

const PrivateRoute = ({ component: Component, ...rest }) => (
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
        <StyledBase.App className="App">
          <Loadable.Header visibility={isVisible} />
          <Switch>
            <PrivateRoute path="/survey" component={Loadable.Survey} />
            <PrivateRoute path="/dashboard" component={Loadable.Dashboard} />
            <Route path="/sign-out" component={Loadable.SignOut} />
            <Route path="/sign-in" component={Loadable.SignIn} />
            <Redirect exact from="/" to="/sign-in" />
          </Switch>
        </StyledBase.App>
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

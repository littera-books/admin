import React from 'react';
import {
  BrowserRouter, Route, Switch, Redirect,
} from 'react-router-dom';

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

const App = () => (
  <BrowserRouter>
    <StyledBase.App className="App">
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

export default App;

import React from 'react';
import { BrowserRouter, Route, Switch } from 'react-router-dom';

// Components
import Loadable from './loadable';

// Styled
import StyledBase from './styled/Base';

// Minireset.css
import '../node_modules/minireset.css/minireset.min.css';

const App = () => (
  <BrowserRouter>
    <StyledBase.App className="App">
      <Switch>
        <Route path="/dashboard" component={Loadable.Dashboard} />
        <Route path="/sign-out" component={Loadable.SignOut} />
        <Route path="/sign-in" component={Loadable.SignIn} />
      </Switch>
    </StyledBase.App>
  </BrowserRouter>
);

export default App;

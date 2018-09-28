import React from 'react';
import Loadable from 'react-loadable';

const Loading = () => (
  <div>
    <h1>Loading...</h1>
  </div>
);

const Header = Loadable({
  loader: () => import('./components/structure/header/Header'),
  loading: Loading,
});

const SignIn = Loadable({
  loader: () => import('./components/auth/signin/SignIn'),
  loading: Loading,
});

const SignOut = Loadable({
  loader: () => import('./components/auth/signout/SignOut'),
  loading: Loading,
});

const Dashboard = Loadable({
  loader: () => import('./components/view/dashboard/Dashboard'),
  loading: Loading,
});

const Survey = Loadable({
  loader: () => import('./components/view/survey/Survey'),
  loading: Loading,
});

export default {
  Header,
  SignIn,
  SignOut,
  Dashboard,
  Survey,
};

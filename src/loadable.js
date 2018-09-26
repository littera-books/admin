import React from 'react';
import Loadable from 'react-loadable';

const Loading = () => (
  <div>
    <h1>Loading...</h1>
  </div>
);

const SignIn = Loadable({
  loader: () => import('./components/auth/signin/SignIn'),
  loading: Loading,
});

const Dashboard = Loadable({
  loader: () => import('./components/dashboard/Dashboard'),
  loading: Loading,
});

export default {
  SignIn,
  Dashboard,
};

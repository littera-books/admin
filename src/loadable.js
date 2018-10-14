import React from 'react';
import Loadable from 'react-loadable';

const Loading = () => (
  <div>
    <p>Loading...</p>
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

const QuestionList = Loadable({
  loader: () => import('./components/question/QuestionList'),
  loading: Loading,
});

const QuestionDetail = Loadable({
  loader: () => import('./components/question/QuestionDetail'),
  loading: Loading,
});

const SelectionList = Loadable({
  loader: () => import('./components/selection/SelectionList'),
  loading: Loading,
});

const SimplePopup = Loadable({
  loader: () => import('./components/structure/popup/SimplePopup'),
  loading: Loading,
});

const ConfirmPopup = Loadable({
  loader: () => import('./components/structure/popup/ConfirmPopup'),
  loading: Loading,
});

export default {
  Header,
  SignIn,
  SignOut,
  Dashboard,
  Survey,
  QuestionList,
  QuestionDetail,
  SelectionList,
  SimplePopup,
  ConfirmPopup,
};

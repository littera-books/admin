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

const Product = Loadable({
  loader: () => import('./components/view/product/Product'),
  loading: Loading,
});

const ProductList = Loadable({
  loader: () => import('./components/view/product/ProductList'),
  loading: Loading,
});

const ProductDetail = Loadable({
  loader: () => import('./components/view/product/ProductDetail'),
  loading: Loading,
});

const Promotion = Loadable({
  loader: () => import('./components/promotion/Promotion'),
  loading: Loading,
});

const User = Loadable({
  loader: () => import('./components/view/user/User'),
  loading: Loading,
});

const UserList = Loadable({
  loader: () => import('./components/view/user/UserList'),
  loading: Loading,
});

const UserDetail = Loadable({
  loader: () => import('./components/view/user/UserDetail'),
  loading: Loading,
});

const ResignSurvey = Loadable({
  loader: () => import('./components/view/resign/ResignSurvey'),
  loading: Loading,
});

const ResignSurveyDetail = Loadable({
  loader: () => import('./components/view/resign/ResignSurveyDetail'),
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

const Subscription = Loadable({
  loader: () => import('./components/view/subscription/Subscription'),
  loading: Loading,
});

const Book = Loadable({
  loader: () => import('./components/book/Book'),
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
  Product,
  ProductList,
  ProductDetail,
  Promotion,
  User,
  UserList,
  UserDetail,
  ResignSurvey,
  ResignSurveyDetail,
  SimplePopup,
  ConfirmPopup,
  Subscription,
  Book,
};

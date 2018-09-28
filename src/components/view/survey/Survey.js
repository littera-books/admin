import React from 'react';
import PropTypes from 'prop-types';
import { Route } from 'react-router-dom';

// Component
import Helmet from '../../helmet/Helmet';
import QuestionList from '../../question/QuestionList';
import QuestionDetail from '../../question/QuestionDetail';

// Styled
import StyledBase from '../../../styled/Base';

const Survey = ({ match }) => (
  <StyledBase.FlexWrapper>
    <StyledBase.ColumnWrapper>
      <Helmet pageTitle="Survey" />
      <h1>설문조사 컴포넌트</h1>
      <QuestionList matchUrl={match.url} />
      <Route path="/survey/:subject" component={QuestionDetail} />
    </StyledBase.ColumnWrapper>
  </StyledBase.FlexWrapper>
);

Survey.propTypes = {
  match: PropTypes.shape({
    url: PropTypes.string.isRequired,
  }).isRequired,
};

export default Survey;

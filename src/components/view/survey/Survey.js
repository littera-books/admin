import React from 'react';
import PropTypes from 'prop-types';
import { Route } from 'react-router-dom';
import dataConfig from '../../../dataConfig';

// Component
import Helmet from '../../helmet/Helmet';
import Loadable from '../../../loadable';
import { DefaultQuestionDetail } from '../../question/QuestionDetail';

// Styled
import StyledBase from '../../../styled/Wrapper';
import Styled from './Survey.styled';

const Survey = ({ match }) => (
  <Styled.SurveyWrapper>
    <StyledBase.ColumnWrapper>
      <Helmet pageTitle="Survey" />
      <h5>
        <strong>{dataConfig.surveyTitle}</strong>
      </h5>
      <Styled.QuestionWrapper>
        <Loadable.QuestionList matchUrl={match.url} />
        <Route exact path={`${match.url}`} component={DefaultQuestionDetail} />
        <Route
          path={`${match.url}/:subject`}
          component={Loadable.QuestionDetail}
        />
      </Styled.QuestionWrapper>
    </StyledBase.ColumnWrapper>
  </Styled.SurveyWrapper>
);

Survey.propTypes = {
  match: PropTypes.shape({
    url: PropTypes.string.isRequired,
  }).isRequired,
};

export default Survey;

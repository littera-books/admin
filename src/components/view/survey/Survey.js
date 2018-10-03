import React from 'react';
import PropTypes from 'prop-types';
import { Route } from 'react-router-dom';
import dataConfig from '../../../dataConfig';

// Component
import Helmet from '../../helmet/Helmet';
import Loadable from '../../../loadable';
import ActiveQuestionDetail, {
  DefaultQuestionDetail,
} from '../../question/QuestionDetail';

// Styled
import StyledBase from '../../../styled/Base';
import Styled from './Survey.styled';

const Survey = ({ match }) => (
  <Styled.SurveyWrapper>
    <StyledBase.ColumnWrapper>
      <Helmet pageTitle="Survey" />
      <h4>
        <strong>{dataConfig.surveyTitle}</strong>
      </h4>
      <Styled.QuestionWrapper>
        <Loadable.QuestionList matchUrl={match.url} />
        <Route exact path={`${match.url}`} component={DefaultQuestionDetail} />
        <Route
          path={`${match.url}/:subject`}
          component={ActiveQuestionDetail}
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

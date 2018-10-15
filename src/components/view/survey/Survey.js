import React from 'react';
import PropTypes from 'prop-types';
import { PrivateRoute } from '../../../App';
import dataConfig from '../../../dataConfig';

// Component
import Helmet from '../../helmet/Helmet';
import Loadable from '../../../loadable';
import { DefaultQuestionDetail } from '../../question/QuestionDetail';

// Styled
import Wrapper from '../../../styled_base/Wrapper';
import Styled from './Survey.styled';

const Survey = ({ match }) => (
  <Styled.SurveyWrapper>
    <Wrapper.ColumnWrapper>
      <Helmet pageTitle="Survey" />
      <h5>
        <strong>{dataConfig.surveyTitle}</strong>
      </h5>
      <Styled.QuestionWrapper>
        <Loadable.QuestionList matchUrl={match.url} />
        <PrivateRoute
          exact
          path={`${match.url}`}
          component={DefaultQuestionDetail}
        />
        <PrivateRoute
          path={`${match.url}/:questionId`}
          component={Loadable.QuestionDetail}
        />
      </Styled.QuestionWrapper>
    </Wrapper.ColumnWrapper>
  </Styled.SurveyWrapper>
);

Survey.propTypes = {
  match: PropTypes.shape({
    url: PropTypes.string.isRequired,
  }).isRequired,
};

export default Survey;

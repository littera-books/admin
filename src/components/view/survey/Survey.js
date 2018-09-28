import React from 'react';

// Component
import Helmet from '../../helmet/Helmet';
import QuestionList from '../../question/QuestionList';

// Styled
import StyledBase from '../../../styled/Base';

const Survey = () => (
  <StyledBase.FlexWrapper>
    <StyledBase.ColumnWrapper>
      <Helmet pageTitle="Survey" />
      <h1>설문조사 컴포넌트</h1>
      <QuestionList />
    </StyledBase.ColumnWrapper>
  </StyledBase.FlexWrapper>
);

export default Survey;

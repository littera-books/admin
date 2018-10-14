import styled from 'styled-components';
import Wrapper from '../../../styled_base/Wrapper';

const SurveyWrapper = styled(Wrapper.ColumnWrapper)`
  height: calc(100vh - 4rem);
`;

const QuestionWrapper = styled(Wrapper.BasicFlexWrapper)`
  min-height: calc(100vh - 4rem - 2rem);
`;

export default {
  SurveyWrapper,
  QuestionWrapper,
};

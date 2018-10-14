import styled from 'styled-components';
import Wrapper from '../../../styled_base/Wrapper';

const SurveyWrapper = styled(Wrapper.ColumnWrapper)`
  height: calc(100vh - 4rem);
  border: 1px solid tomato;
`;

const QuestionWrapper = styled(Wrapper.BasicFlexWrapper)`
  min-height: calc(100vh - 4rem - 2rem);
  border: 1px solid black;
`;

export default {
  SurveyWrapper,
  QuestionWrapper,
};

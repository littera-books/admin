import styled from 'styled-components';
import Wrapper from '../../styled_base/Wrapper';
import Element from '../../styled_base/Element';

const ListWrapper = styled(Wrapper.BasicBlockWrapper)`
  border: 1px solid pink;
  width: 25vw;
  height: calc(100vh - 4rem - 2rem);
  overflow-y: scroll;
`;

const QuestionSubmitButton = styled(Element.BasicButton)`
  display: block;
  margin-top: 1rem;
  margin-left: auto;
`;

const QuestionItem = styled(Wrapper.ColumnWrapper)`
  padding: 1rem;
  border: 1px solid purple;
`;

const DefaultQuestionDetailWrapper = styled(Wrapper.BasicFlexWrapper)`
  justify-content: center;
  align-items: center;
  border: 1px solid blue;
  width: 75vw;
`;

const ActiveQuestionDetailWrapper = styled(Wrapper.ColumnWrapper)`
  border: 1px solid blue;
  width: 75vw;
  padding: 1rem;
`;

const QuestionButtonGroup = styled(Wrapper.BetweenWrapper)`
  width: 10rem;
`;

export default {
  ListWrapper,
  QuestionSubmitButton,
  QuestionItem,
  DefaultQuestionDetailWrapper,
  ActiveQuestionDetailWrapper,
  QuestionButtonGroup,
};

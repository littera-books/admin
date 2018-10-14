import styled from 'styled-components';
import Wrapper from '../../styled/Wrapper';
import Element from '../../styled/Element';

const ListWrapper = styled.div`
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

const QuestionItem = styled.div`
  padding: 1rem;
  border: 1px solid purple;
`;

const DefaultQuestionDetailWrapper = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
  border: 1px solid blue;
  width: 75vw;
`;

const ActiveQuestionDetailWrapper = styled.div`
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

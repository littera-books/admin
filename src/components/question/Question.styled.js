import styled from 'styled-components';

const ListWrapper = styled.div`
  border: 1px solid pink;
  width: 25vw;
`;

const QuestionItem = styled.div`
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
`;

export default {
  ListWrapper,
  QuestionItem,
  DefaultQuestionDetailWrapper,
  ActiveQuestionDetailWrapper,
};

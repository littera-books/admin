import styled from 'styled-components';

const ListWrapper = styled.div`
  border: 1px solid pink;
  width: 25vw;
  height: calc(100vh - 4rem - 2rem);
  overflow-y: scroll;
`;

const QuestionState = styled.div`
  display: flex;
  justify-content: space-between;
`;

const QuestionCreateButton = styled.button`
  border: 1px solid black;
  cursor: pointer;

  :focus {
    outline: none;
  }
`;

const QuestionSubmitButton = styled.button`
  display: block;
  margin-top: 1rem;
  margin-left: auto;
  border: 1px solid black;
  cursor: pointer;

  :focus {
    outline: none;
  }
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
`;

export default {
  ListWrapper,
  QuestionState,
  QuestionCreateButton,
  QuestionSubmitButton,
  QuestionItem,
  DefaultQuestionDetailWrapper,
  ActiveQuestionDetailWrapper,
};

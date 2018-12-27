import styled from 'styled-components';

const App = styled.div`
  font-family: 'Nanum Myeongjo';
  font-size: 0.75rem;
  line-height: 2;
  text-align: justify;

  a {
    color: black;
    text-decoration: none;
    cursor: pointer;

    :visited {
      color: black;
    }
  }
`;

const BasicBlockWrapper = styled.div`
  position: relative;
  display: block;
`;

const BasicFlexWrapper = styled.div`
  position: relative;
  display: flex;
`;

const FlexWrapper = styled(BasicFlexWrapper)`
  justify-content: center;
  align-items: center;
  max-width: 60rem;
  min-height: calc(100vh - 4rem);
  margin: auto;
`;

const ColumnWrapper = styled(BasicFlexWrapper)`
  flex-direction: column;
`;

const BetweenWrapper = styled(BasicFlexWrapper)`
  justify-content: space-between;
`;

const SectionWrapper = styled(ColumnWrapper)`
  height: calc(100vh - 4rem);
`;

const SectionInnerWrapper = styled(BasicFlexWrapper)`
  min-height: calc(100vh - 4rem - 2rem);
`;

const ListWrapper = styled(BasicBlockWrapper)`
  border: 1px solid lightgray;
  width: 25vw;
  height: calc(100vh - 4rem - 2rem);
  overflow-y: scroll;
`;

const DefaultDetailWrapper = styled(BasicFlexWrapper)`
  border: 1px solid lightgray;
  justify-content: center;
  align-items: center;
  width: 75vw;
`;

const ActiveDetailWrapper = styled(ColumnWrapper)`
  border: 1px solid lightgray;
  width: 75vw;
  padding: 1rem;
  overflow-y: scroll;
`;

const QuillEditor = styled(BasicBlockWrapper)`
  .ql-editor {
    font-family: 'Nanum Myeongjo';
    font-size: 1rem;
    line-height: 2;
    margin-bottom: 1rem;
  }
`;

export default {
  App,
  BasicBlockWrapper,
  BasicFlexWrapper,
  FlexWrapper,
  ColumnWrapper,
  BetweenWrapper,
  SectionWrapper,
  SectionInnerWrapper,
  ListWrapper,
  DefaultDetailWrapper,
  ActiveDetailWrapper,
  QuillEditor,
};

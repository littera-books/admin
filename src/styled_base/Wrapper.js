import styled, { injectGlobal } from 'styled-components';
import RemingtonBoldWoff from '../assets/fonts/SilkRemington-Bold.woff';
import RemingtonBoldWoff2 from '../assets/fonts/SilkRemington-Bold.woff2';
import RemingtonRegularWoff from '../assets/fonts/SilkRemington-Regular.woff';
import RemingtonRegularWoff2 from '../assets/fonts/SilkRemington-Regular.woff2';

// eslint-disable-next-line no-unused-expressions
injectGlobal`
  @font-face {
    font-family: 'Silk Remington';
    font-weight: bold;
    src: url(${RemingtonBoldWoff}) format('woff');
    src: url(${RemingtonBoldWoff2}) format('woff2');
  }
  
  @font-face {
    font-family: 'Silk Remington';
    font-weight: regular;
    src: url(${RemingtonRegularWoff}) format('woff');
    src: url(${RemingtonRegularWoff2}) format('woff2');
  }
`;

const App = styled.div`
  font-family: 'Silk Remington', 'Nanum Myeongjo';
  font-size: 1rem;
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
    font-family: 'Silk Remington', 'Nanum Myeongjo';
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

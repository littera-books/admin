import styled from 'styled-components';

const App = styled.div`
  font-size: 1rem;
  line-height: 2;

  a {
    color: black;
    text-decoration: none;
    cursor: pointer;

    :visited {
      color: black;
    }
  }
`;

const FlexWrapper = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
  max-width: 60rem;
  min-height: calc(100vh - 4rem);
  margin: auto;
`;

const ColumnWrapper = styled.div`
  display: flex;
  flex-direction: column;
`;

export default {
  App,
  FlexWrapper,
  ColumnWrapper,
};

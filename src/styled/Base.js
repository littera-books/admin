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

  small {
    font-size: 0.5rem;
    color: red;
  }

  h1 {
    font-size: 2.5rem;
  }

  h2 {
    font-size: 2rem;
  }

  h3 {
    font-size: 1.5rem;
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

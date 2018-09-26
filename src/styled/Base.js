import styled from 'styled-components';

const App = styled.div`
  font-size: 1rem;
  line-height: 2;

  a {
    color: black;
    test-decoration: none;
    cursor: pointer;

    :visited {
      color: black;
    }
  }
`;

export default {
  App,
};

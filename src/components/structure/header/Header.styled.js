import styled from 'styled-components';

const HeaderWrapper = styled.div`
  display: flex;
  justify-content: space-between;
  padding: 1rem 2rem;
  border: 1px solid black;
`;

const MenuWrapper = styled.div`
  a {
    margin-left: 2rem;
  }
`;

export default {
  HeaderWrapper,
  MenuWrapper,
};

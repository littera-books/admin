import styled from 'styled-components';

const HeaderWrapper = styled.div`
  display: flex;
  justify-content: space-between;
  padding: 1rem 2rem;
  border-bottom: 1px solid lightgray;
  height: 4rem;
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

import styled from 'styled-components';

const BasicButton = styled.button`
  color: black;
  cursor: pointer;
  font-size: 0.8rem;
  border: 1px solid black;

  :focus {
    outline: none;
  }
`;

const BasicHr = styled.hr`
  margin: 1rem 0;
`;

export default {
  BasicButton,
  BasicHr,
};

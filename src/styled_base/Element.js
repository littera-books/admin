import styled from 'styled-components';

const BasicSmall = styled.small`
  display: block;
  font-size: 0.5rem;
  color: red;
`;

const BasicButton = styled.button`
  font-family: 'Silk Remington', 'Nanum Myeongjo';
  display: block;
  color: black;
  cursor: pointer;
  font-size: 1rem;
  border: none;
  padding: 0;
  background-color: white;

  :focus {
    outline: none;
  }
`;

const BasicInput = styled.input`
  font-family: 'Silk Remington', 'Nanum Myeongjo';
  font-size: 0.75rem;
  line-height: 3;
  border: none;

  :focus {
    outline: none;
  }

  ::placeholder {
    font-family: 'Silk Remington', 'Nanum Myeongjo';
    color: black;
  }
`;

const BasicHr = styled.hr`
  margin: 1rem 0;
`;

export default {
  BasicSmall,
  BasicButton,
  BasicInput,
  BasicHr,
};
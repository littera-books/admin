import styled from 'styled-components';

const ResponsiveImg = styled.img`
  width: ${props => (props.width ? props.width : '100%')};
  height: auto;
`;

const BasicSmall = styled.small`
  display: block;
  font-size: 0.5rem;
  color: red;
`;

const BasicButton = styled.button`
  font-family: 'Nanum Myeongjo';
  display: block;
  color: black;
  cursor: pointer;
  font-size: 0.75rem;
  border: none;
  padding: 0;
  background-color: white;

  :focus {
    outline: none;
  }
`;

const AlignLeftButton = styled(BasicButton)`
  margin-right: auto;
  margin-top: 1rem;
`;

const AlignRightButton = styled(BasicButton)`
  margin-left: auto;
  margin-top: 1rem;
`;

const BasicInput = styled.input`
  font-family: 'Nanum Myeongjo';
  font-size: 0.75rem;
  line-height: 2;
  width: 22rem;
  border: none;

  :focus {
    outline: none;
  }

  ::placeholder {
    font-family: 'Nanum Myeongjo';
    color: black;
  }
`;

const BasicHr = styled.hr`
  margin: 1rem 0;
`;

export default {
  ResponsiveImg,
  BasicSmall,
  BasicButton,
  AlignLeftButton,
  AlignRightButton,
  BasicInput,
  BasicHr,
};

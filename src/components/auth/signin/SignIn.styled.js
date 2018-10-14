import styled from 'styled-components';
import Element from '../../../styled_base/Element';

const FormWrapper = styled.form`
  input {
    border: none;

    :focus {
      outline: none;
    }
    ::placeholder {
      color: black;
    }
  }
`;

const SignInButton = styled(Element.BasicButton)`
  border: none;
  padding: 0;
  margin: 2rem 0;
`;

export default {
  FormWrapper,
  SignInButton,
};

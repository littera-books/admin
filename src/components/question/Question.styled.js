import styled from 'styled-components';
import Wrapper from '../../styled_base/Wrapper';
import Element from '../../styled_base/Element';

const QuestionSubmitButton = styled(Element.BasicButton)`
  display: block;
  margin-top: 1rem;
  margin-left: auto;
`;

const QuestionItem = styled(Wrapper.ColumnWrapper)`
  padding: 1rem;
  border: 1px solid lightgray;
`;

const QuestionButtonGroup = styled(Wrapper.BetweenWrapper)`
  width: 10rem;
`;

export default {
  QuestionSubmitButton,
  QuestionItem,
  QuestionButtonGroup,
};

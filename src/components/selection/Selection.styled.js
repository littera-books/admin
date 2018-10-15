import styled from 'styled-components';
import Wrapper from '../../styled_base/Wrapper';
import Element from '../../styled_base/Element';

const SelectionWrapper = styled(Wrapper.ColumnWrapper)`
  padding: 1rem;
  border: 1px solid lightgray;
`;

const SelectionButton = styled(Element.BasicButton)`
  width: 1rem;
  height: 2rem;
  margin-right: 0.5rem;
`;

const SelectionButtonGroup = styled(Wrapper.BetweenWrapper)`
  margin-top: 1rem;
  width: 10rem;
`;

export default {
  SelectionWrapper,
  SelectionButton,
  SelectionButtonGroup,
};

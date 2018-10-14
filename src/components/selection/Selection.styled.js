import styled from 'styled-components';
import Wrapper from '../../styled_base/Wrapper';
import Element from '../../styled_base/Element';

const CreateSelectionGroup = styled(Wrapper.BetweenWrapper)`
  justify-content: flex-start;
  align-items: center;
  width: 100%;
`;

const UpdateSelectionButton = styled(Element.BasicButton)`
  display: inline;
  width: 1rem;
  height: 1rem;
  border: none;
  padding: 0;
`;

const SelectionButtonGroup = styled(Wrapper.BetweenWrapper)`
  margin-top: 0.5rem;
  width: 8rem;
`;

export default {
  CreateSelectionGroup,
  UpdateSelectionButton,
  SelectionButtonGroup,
};

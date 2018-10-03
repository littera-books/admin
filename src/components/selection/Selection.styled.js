import styled from 'styled-components';
import SytledBase from '../../styled/Base';

const UpdateSelectionButton = styled(SytledBase.BasicButton)`
  width: 1rem;
  height: 1rem;
  border: none;
  padding: 0;
`;

const SelectionButtonGroup = styled(SytledBase.BetweenWrapper)`
  margin-top: 0.5rem;
  width: 8rem;
`;

export default {
  UpdateSelectionButton,
  SelectionButtonGroup,
};

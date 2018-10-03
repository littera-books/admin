import styled from 'styled-components';
import SytledBase from '../../styled/Base';

const CreateSelectionGroup = styled(SytledBase.BetweenWrapper)`
  justify-content: flex-start;
  align-items: center;
  width: 100%;
`;

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
  CreateSelectionGroup,
  UpdateSelectionButton,
  SelectionButtonGroup,
};

import styled from 'styled-components';
import Wrapper from '../../../styled_base/Wrapper';

const ProductItem = styled(Wrapper.ColumnWrapper)`
  padding: 1rem;
  border: 1px solid lightgray;
`;

const ButtonGroup = styled(Wrapper.BetweenWrapper)`
  width: 10rem;
`;

export default {
  ProductItem,
  ButtonGroup,
};

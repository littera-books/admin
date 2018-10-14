import styled from 'styled-components';
import Wrapper from '../../../styled_base/Wrapper';

const ProductWrapper = styled(Wrapper.ColumnWrapper)`
  height: calc(100vh - 4rem);
`;

const ProductInnerWrapper = styled(Wrapper.BasicFlexWrapper)`
  min-height: calc(100vh - 4rem - 2rem);
`;

const ProductItem = styled(Wrapper.ColumnWrapper)`
  padding: 1rem;
  border: 1px solid lightgray;
`;

const ButtonGroup = styled(Wrapper.BetweenWrapper)`
  width: 10rem;
`;

export default {
  ProductWrapper,
  ProductInnerWrapper,
  ProductItem,
  ButtonGroup,
};

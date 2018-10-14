import styled from 'styled-components';
import Wrapper from '../../../styled_base/Wrapper';

const ProductWrapper = styled(Wrapper.ColumnWrapper)`
  height: calc(100vh - 4rem);
  border: 1px solid tomato;
`;

const ProductInnerWrapper = styled(Wrapper.BasicFlexWrapper)`
  min-height: calc(100vh - 4rem - 2rem);
  border: 1px solid black;
`;

const ProductItem = styled(Wrapper.ColumnWrapper)`
  padding: 1rem;
  border: 1px solid brown;
`;

export default {
  ProductWrapper,
  ProductInnerWrapper,
  ProductItem,
};

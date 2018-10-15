import styled from 'styled-components';
import Wrapper from '../../styled_base/Wrapper';
import Element from '../../styled_base/Element';

const PromotionWrapper = styled(Wrapper.ColumnWrapper)`
  padding: 1rem;
  border: 1px solid lightgray;
`;

const PromotionButtonGroup = styled(Wrapper.BetweenWrapper)`
  margin-top: 1rem;
  width: 10rem;
`;

const PromotionButton = styled(Element.BasicButton)`
  width: 1rem;
  height: 2rem;
  margin-right: 0.5rem;
`;

export default {
  PromotionWrapper,
  PromotionButtonGroup,
  PromotionButton,
};

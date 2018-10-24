import styled from 'styled-components';
import Wrapper from '../../../styled_base/Wrapper';
import Element from '../../../styled_base/Element';

const LetterBoxWrapper = styled(Wrapper.ColumnWrapper)`
  width: 35rem;
  min-height: 20rem;
`;

const LetterItemWrapper = styled(Wrapper.ColumnWrapper)`
  margin-left: auto;
  margin-right: auto;
`;

const LetterDetailWrapper = styled(Wrapper.ColumnWrapper)`
  margin: 10rem 0;
`;

const NavigationWrapper = styled(Wrapper.BetweenWrapper)`
  margin-top: auto;
`;

const Content = styled(Wrapper.BasicBlockWrapper)`
  margin: 3rem 0;
  width: 45rem;
  min-height: 20rem;
`;

const TitleSpan = styled.span`
  margin-left: 3rem;
`;

const PaginationWrapper = styled(Wrapper.BasicFlexWrapper)`
  margin-top: 1.5rem;
  justify-content: center;
`;

const PaginationItem = styled(Element.BasicButton)`
  margin: 0 0.5rem;
`;

export default {
  LetterBoxWrapper,
  LetterItemWrapper,
  LetterDetailWrapper,
  NavigationWrapper,
  Content,
  TitleSpan,
  PaginationWrapper,
  PaginationItem,
};

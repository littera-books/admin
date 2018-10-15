import styled from 'styled-components';
import Wrapper from '../../styled_base/Wrapper';

const LetterBoxWrapper = styled(Wrapper.ColumnWrapper)`
  width: 35rem;
  min-height: 20rem;
`;

const LetterItemWrapper = styled(Wrapper.ColumnWrapper)`
  margin-left: auto;
  margin-right: auto;
`;

const NavigationWrapper = styled(Wrapper.BetweenWrapper)`
  margin-top: auto;
`;

const TitleSpan = styled.span`
  margin-left: 3rem;
`;

export default {
  LetterBoxWrapper,
  LetterItemWrapper,
  NavigationWrapper,
  TitleSpan,
};

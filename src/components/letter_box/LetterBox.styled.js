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

const MarginForm = styled.form`
  width: 45rem;
  margin: 3rem 0;
  height: 30rem;
`;

const TitleSpan = styled.span`
  margin-left: 3rem;
`;

export default {
  LetterBoxWrapper,
  LetterItemWrapper,
  LetterDetailWrapper,
  NavigationWrapper,
  Content,
  MarginForm,
  TitleSpan,
};

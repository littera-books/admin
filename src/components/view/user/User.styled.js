import styled from 'styled-components';
import Wrapper from '../../../styled_base/Wrapper';
import Element from '../../../styled_base/Element';

const UserItem = styled(Wrapper.ColumnWrapper)`
  padding: 1rem;
  border: 1px solid lightgray;
`;

const UserDashboardWrapper = styled(Wrapper.BasicFlexWrapper)`
  flex-wrap: wrap;
`;

const UserSectionWrapper = styled(Wrapper.ColumnWrapper)`
  padding: 1rem;
  margin: 1rem;
  width: 22.5rem;
  min-height: 20rem;
  border-radius: 0.5rem;
  border: 1px solid lightgray;
  box-shadow: 0 0.25rem 0.5rem 0 rgba(0, 0, 0, 0.2);
`;

const NameWrapper = styled(Wrapper.BetweenWrapper)`
  width: 10rem;
`;

const ReadMoreButton = styled(Element.AlignRightButton)`
  margin-top: auto;
`;

const TitleSpan = styled.span`
  margin-left: 3rem;
`;

const SurveyResultUL = styled.ul`
  margin-left: 1.5rem;
  list-style: decimal;
`;

export default {
  UserItem,
  UserDashboardWrapper,
  UserSectionWrapper,
  NameWrapper,
  ReadMoreButton,
  TitleSpan,
  SurveyResultUL,
};

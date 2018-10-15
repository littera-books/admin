import styled from 'styled-components';
import Wrapper from '../../../styled_base/Wrapper';

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
  width: 23rem;
  min-height: 20rem;
  border-radius: 0.5rem;
  border: 1px solid lightgray;
`;

const NameWrapper = styled(Wrapper.BetweenWrapper)`
  width: 10rem;
`;

export default {
  UserItem,
  UserDashboardWrapper,
  UserSectionWrapper,
  NameWrapper,
};

import styled from 'styled-components';
import Wrapper from '../../styled_base/Wrapper';

const BookWrapper = styled(Wrapper.BasicFlexWrapper)`
  width: 100%;
`;

const BookLi = styled.li`
  width: 30rem;
  display: flex;
  justify-content: space-between;
`;

const PaginationWrapper = styled(Wrapper.BasicFlexWrapper)`
  margin-top: 1.5rem;
  justify-content: center;
`;

export default {
  BookWrapper,
  PaginationWrapper,
  BookLi,
};

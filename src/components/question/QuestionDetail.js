import React from 'react';
import PropTypes from 'prop-types';

// Styled
import Styled from './Question.styled';

export const DefaultQuestionDetail = () => (
  <Styled.DetailWrapper>
    <h1>hello</h1>
  </Styled.DetailWrapper>
);

const ActiveQuestionDetail = ({ match }) => (
  <Styled.DetailWrapper>
    <h1>{match.params.subject}</h1>
  </Styled.DetailWrapper>
);

ActiveQuestionDetail.propTypes = {
  match: PropTypes.shape({
    params: PropTypes.shape({
      subject: PropTypes.string.isRequired,
    }).isRequired,
  }).isRequired,
};

export default ActiveQuestionDetail;

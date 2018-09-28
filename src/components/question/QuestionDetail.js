import React from 'react';
import PropTypes from 'prop-types';

const QuestionDetail = ({ match }) => <div>{match.params.subject}</div>;

QuestionDetail.propTypes = {
  match: PropTypes.shape({
    params: PropTypes.shape({
      subject: PropTypes.string.isRequired,
    }).isRequired,
  }).isRequired,
};

export default QuestionDetail;

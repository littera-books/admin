import React from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { detailQuestion } from '../../reducers/reducer.question';

// Styled
import Styled from './Question.styled';

export const DefaultQuestionDetail = () => (
  <Styled.DetailWrapper>
    <h1>hello</h1>
  </Styled.DetailWrapper>
);

class ActiveQuestionDetail extends React.Component {
  state = {
    subject: '',
  };

  static getDerivedStateFromProps(nextProps, prevState) {
    if (prevState.subject !== nextProps.match.params.subject) {
      nextProps.getDetail(nextProps.match.params.subject);
      return { subject: nextProps.match.params.subject };
    }
    return null;
  }

  render() {
    const { item } = this.props;

    return (
      <Styled.DetailWrapper>
        <h1>{item.subject}</h1>
        <p>{item.title}</p>
      </Styled.DetailWrapper>
    );
  }
}

ActiveQuestionDetail.propTypes = {
  match: PropTypes.shape({
    params: PropTypes.shape({
      subject: PropTypes.string.isRequired,
    }).isRequired,
  }).isRequired,
  item: PropTypes.shape({
    subject: PropTypes.string.isRequired,
    title: PropTypes.string.isRequired,
  }).isRequired,
};

const mapStateToProps = state => ({
  item: state.question.item,
});

const mapDispatchToProps = dispatch => ({
  getDetail: subject => dispatch(detailQuestion(subject)),
});

export default connect(
  mapStateToProps,
  mapDispatchToProps,
)(ActiveQuestionDetail);

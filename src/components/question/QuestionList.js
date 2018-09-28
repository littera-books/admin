import _ from 'lodash';
import React from 'react';
import PropTypes from 'prop-types';
import { Link } from 'react-router-dom';
import { connect } from 'react-redux';
import { listQuestion } from '../../reducers/reducer.survey';

// Styled
import Styled from './Question.styled';

class QuestionList extends React.Component {
  componentDidMount() {
    const { getList } = this.props;
    getList();
  }

  QuestionItem() {
    const { items, matchUrl } = this.props;
    return _.map(items, item => (
      <Link to={`${matchUrl}/${item.subject}`} key={item.id}>
        <Styled.QuestionItem>
          <h3>
            주제: <strong>{item.subject}</strong>
          </h3>
          <p>{`제목: ${item.title}`}</p>
        </Styled.QuestionItem>
      </Link>
    ));
  }

  render() {
    const { length } = this.props;
    return (
      <Styled.ListWrapper>
        <h2>
          설문 갯수: <strong>{length}</strong>
        </h2>
        {this.QuestionItem()}
      </Styled.ListWrapper>
    );
  }
}

QuestionList.propTypes = {
  matchUrl: PropTypes.string.isRequired,
  getList: PropTypes.func.isRequired,
  length: PropTypes.number.isRequired,
  items: PropTypes.arrayOf(PropTypes.object).isRequired,
};

export const mapStateToProps = state => ({
  length: state.survey.length,
  items: state.survey.items,
});

export const mapDispatchToProps = dispatch => ({
  getList: () => dispatch(listQuestion()),
});

export default connect(
  mapStateToProps,
  mapDispatchToProps,
)(QuestionList);

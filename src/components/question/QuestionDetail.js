import _ from 'lodash';
import React from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { detailQuestion } from '../../reducers/reducer.question';
import { listSelection } from '../../reducers/reducer.selection';

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
      nextProps.getList(nextProps.match.params.subject);
      return { subject: nextProps.match.params.subject };
    }
    return null;
  }

  selectionList() {
    const { items } = this.props;

    return _.map(items, item => <div key={item.id}>{item.select}</div>);
  }

  render() {
    const { item } = this.props;

    return (
      <Styled.DetailWrapper>
        <h1>{item.subject}</h1>
        <p>{item.title}</p>
        <hr />
        {this.selectionList()}
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
  items: PropTypes.arrayOf(PropTypes.object).isRequired,
};

const mapStateToProps = state => ({
  item: state.question.item,
  items: state.selection.items,
});

const mapDispatchToProps = dispatch => ({
  getDetail: subject => dispatch(detailQuestion(subject)),
  getList: subject => dispatch(listSelection(subject)),
});

export default connect(
  mapStateToProps,
  mapDispatchToProps,
)(ActiveQuestionDetail);

import _ from 'lodash';
import React from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { listQuestion } from '../../reducers/reducer.survey';

// Styled
import StyledBase from '../../styled/Base';

class QuestionList extends React.Component {
  componentDidMount() {
    const { getList } = this.props;
    getList();
  }

  QuestionItem() {
    const { items } = this.props;
    return _.map(items, item => (
      <StyledBase.ColumnWrapper key={item.id}>
        <h3>{item.subject}</h3>
        <p>{item.title}</p>
      </StyledBase.ColumnWrapper>
    ));
  }

  render() {
    const { length } = this.props;
    return (
      <StyledBase.ColumnWrapper>
        <h2>{length}</h2>
        {this.QuestionItem()}
      </StyledBase.ColumnWrapper>
    );
  }
}

QuestionList.propTypes = {
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

import _ from 'lodash';
import React from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { listQuestion } from '../../../reducers/reducer.survey';

// Component
import Helmet from '../../helmet/Helmet';

// Styled
import StyledBase from '../../../styled/Base';

export class Survey extends React.Component {
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

  QuestionList() {
    const { length } = this.props;
    return (
      <StyledBase.ColumnWrapper>
        <h2>{length}</h2>
        {this.QuestionItem()}
      </StyledBase.ColumnWrapper>
    );
  }

  render() {
    return (
      <StyledBase.FlexWrapper>
        <StyledBase.ColumnWrapper>
          <Helmet pageTitle="Survey" />
          <h1>설문조사 컴포넌트</h1>
          {this.QuestionList()}
        </StyledBase.ColumnWrapper>
      </StyledBase.FlexWrapper>
    );
  }
}

Survey.propTypes = {
  getList: PropTypes.func.isRequired,
  length: PropTypes.number.isRequired,
  items: PropTypes.arrayOf(PropTypes.object).isRequired,
};

export const mapStateToProps = state => ({
  length: state.survey.length,
  items: state.survey.items,
  error: state.survey.error,
});

export const mapDispatchToProps = dispatch => ({
  getList: () => dispatch(listQuestion()),
});

export default connect(
  mapStateToProps,
  mapDispatchToProps,
)(Survey);

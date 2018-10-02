import _ from 'lodash';
import React from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import dataConfig from '../../dataConfig';
import {
  detailQuestion,
  destroyQuestion,
} from '../../reducers/reducer.question';
import { listSelection } from '../../reducers/reducer.selection';
import {
  callPopupFilter,
  setHeaderProperty,
  setMessageProperty,
} from '../../reducers/reducer.popup';

// Components
import Loadable from '../../loadable';

// Styled
import Styled from './Question.styled';

export const DefaultQuestionDetail = () => (
  <Styled.DefaultQuestionDetailWrapper>
    <h1>{dataConfig.questionDetailText}</h1>
  </Styled.DefaultQuestionDetailWrapper>
);

class ActiveQuestionDetail extends React.Component {
  constructor(props) {
    super(props);

    this.state = {
      subject: '',
    };

    this.onDestroyQuestion = this.onDestroyQuestion.bind(this);
  }

  static getDerivedStateFromProps(nextProps, prevState) {
    if (prevState.subject !== nextProps.match.params.subject) {
      nextProps.getDetail(nextProps.match.params.subject);
      nextProps.getList(nextProps.match.params.subject);
      return { subject: nextProps.match.params.subject };
    }
    return null;
  }

  async onDestroyQuestion() {
    const { callPopup, setHeader, setMessage } = this.props;
    setHeader(dataConfig.popup.destroyQuestionHeader);
    setMessage(dataConfig.popup.destroyQuestionText);
    callPopup();
  }

  selectionList() {
    const { items } = this.props;
    return _.map(items, item => <div key={item.id}>{item.select}</div>);
  }

  render() {
    const { subject } = this.state;
    const {
      item, filter, destroyDetail, history,
    } = this.props;

    return (
      <Styled.ActiveQuestionDetailWrapper>
        <h1>{item.subject}</h1>
        <p>{item.title}</p>
        <button type="button" onClick={this.onDestroyQuestion}>
          질문 삭제
        </button>
        <hr />
        {this.selectionList()}
        <Loadable.Popup
          visibility={filter}
          method={destroyDetail}
          argument={subject}
          replace={history.replace}
          destination="/survey"
        />
      </Styled.ActiveQuestionDetailWrapper>
    );
  }
}

ActiveQuestionDetail.propTypes = {
  match: PropTypes.shape({
    params: PropTypes.shape({
      subject: PropTypes.string.isRequired,
    }).isRequired,
  }).isRequired,
  history: PropTypes.shape({
    replace: PropTypes.func.isRequired,
  }).isRequired,
  item: PropTypes.shape({
    subject: PropTypes.string.isRequired,
    title: PropTypes.string.isRequired,
  }).isRequired,
  items: PropTypes.arrayOf(PropTypes.object).isRequired,
  destroyDetail: PropTypes.func.isRequired,
  filter: PropTypes.string.isRequired,
  callPopup: PropTypes.func.isRequired,
  setHeader: PropTypes.func.isRequired,
  setMessage: PropTypes.func.isRequired,
};

const mapStateToProps = state => ({
  item: state.question.item,
  items: state.selection.items,
  filter: state.popup.filter,
  message: state.popup.message,
});

const mapDispatchToProps = dispatch => ({
  getDetail: subject => dispatch(detailQuestion(subject)),
  destroyDetail: subject => dispatch(destroyQuestion(subject)),
  getList: subject => dispatch(listSelection(subject)),
  callPopup: () => dispatch(callPopupFilter()),
  setHeader: header => dispatch(setHeaderProperty(header)),
  setMessage: message => dispatch(setMessageProperty(message)),
});

export default connect(
  mapStateToProps,
  mapDispatchToProps,
)(ActiveQuestionDetail);

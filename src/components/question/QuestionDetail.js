import _ from 'lodash';
import React from 'react';
import PropTypes from 'prop-types';
import { Field, reduxForm } from 'redux-form';
import { connect } from 'react-redux';
import dataConfig from '../../dataConfig';
import FormField from './FormField';
import {
  detailQuestion,
  updateQuestion,
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
import StyledBase from '../../styled/Base';
import Styled from './Question.styled';

export const DefaultQuestionDetail = () => (
  <Styled.DefaultQuestionDetailWrapper>
    <p>{dataConfig.questionDetailText}</p>
  </Styled.DefaultQuestionDetailWrapper>
);

class ActiveQuestionDetail extends React.Component {
  constructor(props) {
    super(props);

    this.state = {
      updateForm: false,
      subject: '',
    };

    this.openUpdateQuestionForm = this.openUpdateQuestionForm.bind(this);
    this.onUpdateQuestion = this.onUpdateQuestion.bind(this);
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

  async onUpdateQuestion(payload) {
    const { putDetail, history } = this.props;
    await putDetail(payload);

    const { error } = this.props;
    if (!error) {
      this.setState(state => ({
        updateForm: !state.updateForm,
      }));
      history.replace('/survey');
      window.location.reload();
    }
  }

  openUpdateQuestionForm() {
    this.setState(state => ({
      updateForm: !state.updateForm,
    }));

    const { item, initialize } = this.props;
    initialize({
      subject: item.subject,
      title: item.title,
    });
  }

  selectionList() {
    const { items } = this.props;
    return _.map(items, item => <div key={item.id}>{item.select}</div>);
  }

  render() {
    const { subject, updateForm } = this.state;
    const {
      item,
      filter,
      destroyDetail,
      history,
      handleSubmit,
      error,
    } = this.props;

    return (
      <Styled.ActiveQuestionDetailWrapper>
        <StyledBase.BetweenWrapper>
          <h2>
            <strong>{item.subject}</strong>
          </h2>
          <Styled.QuestionButtonGroup>
            <StyledBase.BasicButton
              type="button"
              onClick={this.openUpdateQuestionForm}
            >
              질문 수정
            </StyledBase.BasicButton>
            <StyledBase.BasicButton
              type="button"
              onClick={this.onDestroyQuestion}
            >
              {dataConfig.popup.destroyQuestionHeader}
            </StyledBase.BasicButton>
          </Styled.QuestionButtonGroup>
        </StyledBase.BetweenWrapper>
        <p>{item.title}</p>
        <form
          style={{
            visibility: updateForm ? 'visible' : 'hidden',
            height: updateForm ? '6rem' : '0',
          }}
          action="post"
          onSubmit={handleSubmit(this.onUpdateQuestion.bind(this))}
        >
          <Field
            type="text"
            name="subject"
            label="주제"
            component={FormField}
          />
          <Field type="text" name="title" label="제목" component={FormField} />
          <div>
            <small>{error}</small>
          </div>
          <StyledBase.BasicButton type="submit">update</StyledBase.BasicButton>
        </form>
        <StyledBase.BasicHr />
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
  handleSubmit: PropTypes.func.isRequired,
  initialize: PropTypes.func.isRequired,
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
  error: PropTypes.string.isRequired,
  items: PropTypes.arrayOf(PropTypes.object).isRequired,
  putDetail: PropTypes.func.isRequired,
  destroyDetail: PropTypes.func.isRequired,
  filter: PropTypes.string.isRequired,
  callPopup: PropTypes.func.isRequired,
  setHeader: PropTypes.func.isRequired,
  setMessage: PropTypes.func.isRequired,
};

const mapStateToProps = state => ({
  item: state.question.item,
  error: state.question.error,
  items: state.selection.items,
  filter: state.popup.filter,
  message: state.popup.message,
});

const mapDispatchToProps = dispatch => ({
  getDetail: subject => dispatch(detailQuestion(subject)),
  putDetail: payload => dispatch(updateQuestion(payload)),
  destroyDetail: subject => dispatch(destroyQuestion(subject)),
  getList: subject => dispatch(listSelection(subject)),
  callPopup: () => dispatch(callPopupFilter()),
  setHeader: header => dispatch(setHeaderProperty(header)),
  setMessage: message => dispatch(setMessageProperty(message)),
});

export default reduxForm({
  form: 'UpdateQuestionForm',
})(
  connect(
    mapStateToProps,
    mapDispatchToProps,
  )(ActiveQuestionDetail),
);

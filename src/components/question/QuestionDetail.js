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
import {
  setPopupHeaderMessage,
  setPopupButtons,
} from '../../reducers/reducer.popup';

// Components
import Loadable from '../../loadable';

// Styled
import Wrapper from '../../styled_base/Wrapper';
import Element from '../../styled_base/Element';
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
      popupFilter: false,
      updateForm: false,
      subject: '',
    };

    this.cancelPopup = this.cancelPopup.bind(this);
    this.openUpdateQuestionForm = this.openUpdateQuestionForm.bind(this);
    this.onUpdateQuestion = this.onUpdateQuestion.bind(this);
    this.onDestroyQuestion = this.onDestroyQuestion.bind(this);
  }

  static getDerivedStateFromProps(nextProps, prevState) {
    if (prevState.subject !== nextProps.match.params.subject) {
      nextProps.getDetail(nextProps.match.params.subject);
      return {
        updateForm: false,
        subject: nextProps.match.params.subject,
      };
    }
    return null;
  }

  async onDestroyQuestion() {
    const { setPopup, setButtons } = this.props;
    setPopup(dataConfig.popupMessage.destroyQuestion);
    setButtons(dataConfig.popupMessage.destroyConfirm);
    this.setState({ popupFilter: true });
  }

  async onUpdateQuestion(payload) {
    const { putDetail, history } = this.props;
    await putDetail(payload);

    const { error } = this.props;
    if (!error) {
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

  cancelPopup() {
    this.setState({ popupFilter: false });
  }

  render() {
    const { subject, updateForm, popupFilter } = this.state;
    const {
      match,
      item,
      destroyDetail,
      history,
      handleSubmit,
      error,
    } = this.props;

    return (
      <Styled.ActiveQuestionDetailWrapper>
        <Wrapper.BetweenWrapper>
          <h2>
            <strong>{item.subject}</strong>
          </h2>
          <Styled.QuestionButtonGroup>
            <Element.BasicButton
              type="button"
              onClick={this.openUpdateQuestionForm}
            >
              질문 수정
            </Element.BasicButton>
            <Element.BasicButton type="button" onClick={this.onDestroyQuestion}>
              질문 삭제
            </Element.BasicButton>
          </Styled.QuestionButtonGroup>
        </Wrapper.BetweenWrapper>
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
          <Element.BasicButton type="submit">update</Element.BasicButton>
        </form>
        <Element.BasicHr />
        <Loadable.SelectionList
          history={history}
          subject={match.params.subject}
        />
        {popupFilter ? (
          <Loadable.ConfirmPopup
            method={destroyDetail}
            argument={subject}
            error={error}
            cancelPopup={this.cancelPopup}
          />
        ) : null}
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
  putDetail: PropTypes.func.isRequired,
  destroyDetail: PropTypes.func.isRequired,
  setPopup: PropTypes.func.isRequired,
  setButtons: PropTypes.func.isRequired,
};

const mapStateToProps = state => ({
  item: state.question.item,
  error: state.question.error,
  message: state.popup.message,
});

const mapDispatchToProps = dispatch => ({
  getDetail: subject => dispatch(detailQuestion(subject)),
  putDetail: payload => dispatch(updateQuestion(payload)),
  destroyDetail: subject => dispatch(destroyQuestion(subject)),
  setPopup: payload => dispatch(setPopupHeaderMessage(payload)),
  setButtons: payload => dispatch(setPopupButtons(payload)),
});

export default reduxForm({
  form: 'UpdateQuestionForm',
})(
  connect(
    mapStateToProps,
    mapDispatchToProps,
  )(ActiveQuestionDetail),
);

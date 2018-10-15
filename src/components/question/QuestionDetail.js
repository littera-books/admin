import React from 'react';
import PropTypes from 'prop-types';
import { Field, reduxForm } from 'redux-form';
import { connect } from 'react-redux';
import dataConfig from '../../dataConfig';
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
import BasicFormField from '../../form/FormField';
import Validation from '../../form/Validation';

// Styled
import Wrapper from '../../styled_base/Wrapper';
import Element from '../../styled_base/Element';
import Styled from './Question.styled';

export const DefaultQuestionDetail = () => (
  <Wrapper.DefaultDetailWrapper>
    <p>{dataConfig.defaultDetailText}</p>
  </Wrapper.DefaultDetailWrapper>
);

class ActiveQuestionDetail extends React.Component {
  constructor(props) {
    super(props);

    this.state = {
      popupFilter: false,
      updateForm: false,
      questionId: 0,
    };

    this.cancelPopup = this.cancelPopup.bind(this);
    this.openUpdateQuestionForm = this.openUpdateQuestionForm.bind(this);
    this.onUpdateQuestion = this.onUpdateQuestion.bind(this);
    this.onDestroyQuestion = this.onDestroyQuestion.bind(this);
  }

  static getDerivedStateFromProps(nextProps, prevState) {
    if (prevState.questionId !== nextProps.match.params.questionId) {
      nextProps.getDetail(nextProps.match.params.questionId);
      return {
        updateForm: false,
        questionId: nextProps.match.params.questionId,
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

    const { item, initialize, match } = this.props;
    initialize({
      questionId: match.params.questionId,
      subject: item.subject,
      title: item.title,
    });
  }

  cancelPopup() {
    this.setState({ popupFilter: false });
  }

  render() {
    const { questionId, updateForm, popupFilter } = this.state;
    const {
      match,
      item,
      destroyDetail,
      history,
      handleSubmit,
      error,
    } = this.props;

    return (
      <Wrapper.ActiveDetailWrapper>
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
            display: updateForm ? 'block' : 'none',
          }}
          action="post"
          onSubmit={handleSubmit(this.onUpdateQuestion.bind(this))}
        >
          <Field
            type="text"
            name="subject"
            placeholder="주제"
            component={BasicFormField.PlaceholderFormField}
            validate={Validation.required}
          />
          <Field
            type="text"
            name="title"
            placeholder="제목"
            component={BasicFormField.PlaceholderFormField}
            validate={Validation.required}
          />
          <div>
            <Element.BasicSmall>{error}</Element.BasicSmall>
          </div>
          <Element.AlignLeftButton type="submit">
            update
          </Element.AlignLeftButton>
        </form>
        <Element.BasicHr />
        <Loadable.SelectionList
          history={history}
          questionId={match.params.questionId}
        />
        {popupFilter ? (
          <Loadable.ConfirmPopup
            method={destroyDetail}
            argument={questionId}
            error={error}
            cancelPopup={this.cancelPopup}
            replace={history.replace}
            destination="/survey"
          />
        ) : null}
      </Wrapper.ActiveDetailWrapper>
    );
  }
}

ActiveQuestionDetail.propTypes = {
  handleSubmit: PropTypes.func.isRequired,
  initialize: PropTypes.func.isRequired,
  match: PropTypes.shape({
    params: PropTypes.shape({
      questionId: PropTypes.string.isRequired,
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
  getDetail: questionId => dispatch(detailQuestion(questionId)),
  putDetail: payload => dispatch(updateQuestion(payload)),
  destroyDetail: questionId => dispatch(destroyQuestion(questionId)),
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

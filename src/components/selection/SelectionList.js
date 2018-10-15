import _ from 'lodash';
import React from 'react';
import PropTypes from 'prop-types';
import { Field, reduxForm } from 'redux-form';
import { connect } from 'react-redux';
import {
  listSelection,
  updateSelection,
  destroySelection,
} from '../../reducers/reducer.selection';
import {
  setPopupHeaderMessage,
  setPopupButtons,
} from '../../reducers/reducer.popup';
import dataConfig from '../../dataConfig';

// Components
import Loadable from '../../loadable';
import BasicFormField from '../../form/FormField';
import Validation from '../../form/Validation';
import CreateSelection from './CreateSelection';

// Styled
import Wrapper from '../../styled_base/Wrapper';
import Element from '../../styled_base/Element';
import Styled from './Selection.styled';

// Assets
import Pencil from '../../assets/images/pencil-alt-solid.svg';
import Plus from '../../assets/images/plus-circle-solid.svg';

class SelectionList extends React.Component {
  constructor(props) {
    super(props);

    this.state = {
      id: 0,
      questionId: 0,
      selectionIndex: 0,
      createForm: false,
      updateForm: false,
      popupFilter: false,
    };

    this.openCreateSelectionForm = this.openCreateSelectionForm.bind(this);
    this.openUpdateSelectionForm = this.openUpdateSelectionForm.bind(this);
    this.openDestroySelectionForm = this.openDestroySelectionForm.bind(this);
    this.closeCreateForm = this.closeCreateForm.bind(this);
    this.cancelPopup = this.cancelPopup.bind(this);
  }

  static getDerivedStateFromProps(nextProps, prevState) {
    if (prevState.questionId !== nextProps.questionId) {
      nextProps.getList(nextProps.questionId);
      return {
        id: 0,
        questionId: nextProps.questionId,
        selectionIndex: 0,
        createForm: false,
        updateForm: false,
      };
    }
    return null;
  }

  async onUpdateSelection(payload) {
    const { update, getList, questionId } = this.props;
    await update(payload);

    const { error } = this.props;
    if (!error) {
      await getList(questionId);
      this.setState({ updateForm: false });
    }
  }

  openCreateSelectionForm() {
    const { initialize, questionId } = this.props;
    initialize({
      questionId,
    });

    this.setState(state => ({
      createForm: !state.createForm,
      updateForm: false,
    }));
  }

  openUpdateSelectionForm(id) {
    const { initialize, questionId, items } = this.props;
    const openedItem = _.find(items, o => o.id === id);
    const openedIndex = _.findIndex(items, o => o.id === id);
    initialize({
      id,
      questionId,
      select: openedItem.select,
    });

    const { selectionIndex, updateForm } = this.state;
    if (openedIndex !== selectionIndex && updateForm === true) {
      this.setState({
        id,
        selectionIndex: openedIndex,
        createForm: false,
      });
    } else {
      this.setState(state => ({
        id,
        selectionIndex: openedIndex,
        createForm: false,
        updateForm: !state.updateForm,
      }));
    }
  }

  openDestroySelectionForm() {
    const { selectionIndex } = this.state;
    const { setPopup, setButtons } = this.props;
    setPopup({
      header: `${selectionIndex + 1}번 선택지 삭제`,
      message: `${selectionIndex + 1}번 선택지를 삭제하시겠습니까?`,
    });
    setButtons(dataConfig.popupMessage.destroyConfirm);
    this.setState({ popupFilter: true });
  }

  closeCreateForm() {
    this.setState({ createForm: false });
  }

  cancelPopup() {
    this.setState({ popupFilter: false });
  }

  renderItems() {
    const { items } = this.props;
    return _.map(items, item => (
      <Wrapper.BasicFlexWrapper key={item.id}>
        <Styled.SelectionButton
          type="button"
          onClick={e => this.openUpdateSelectionForm(item.id, e)}
        >
          <img src={Pencil} alt="update-selection-button" />
        </Styled.SelectionButton>
        <p>{item.select}</p>
      </Wrapper.BasicFlexWrapper>
    ));
  }

  render() {
    const {
      createForm,
      updateForm,
      popupFilter,
      selectionIndex,
      id,
    } = this.state;
    const {
      handleSubmit, questionId, history, error, destroy,
    } = this.props;
    return (
      <Styled.SelectionWrapper>
        <h4>
          <strong>선택지 목록</strong>
        </h4>
        {this.renderItems()}
        <Wrapper.BasicFlexWrapper>
          <Styled.SelectionButton
            type="button"
            onClick={this.openCreateSelectionForm}
          >
            <img src={Plus} alt="create-selection-button" />
          </Styled.SelectionButton>
          {createForm && (
            <CreateSelection
              questionId={questionId}
              closeCreateForm={this.closeCreateForm}
            />
          )}
        </Wrapper.BasicFlexWrapper>
        <Element.BasicHr />
        <form
          style={{ display: updateForm ? 'block' : 'none' }}
          action="post"
          onSubmit={handleSubmit(this.onUpdateSelection.bind(this))}
        >
          <h5>
            <strong>{`${selectionIndex + 1}번 선택지 편집`}</strong>
          </h5>
          <Field
            type="text"
            name="select"
            placeholder="선택지"
            component={BasicFormField.PlaceholderFormField}
            validate={Validation.required}
          />
          <Styled.SelectionButtonGroup>
            <Element.BasicButton
              type="button"
              onClick={this.openDestroySelectionForm}
            >
              delete
            </Element.BasicButton>
            <Element.BasicButton type="submit">update</Element.BasicButton>
          </Styled.SelectionButtonGroup>
        </form>
        {popupFilter && (
          <Loadable.ConfirmPopup
            method={destroy}
            argument={{ id, questionId }}
            error={error}
            cancelPopup={this.cancelPopup}
            replace={history.replace}
            destination={`/survey/${questionId}`}
          />
        )}
      </Styled.SelectionWrapper>
    );
  }
}

SelectionList.propTypes = {
  history: PropTypes.shape({
    replace: PropTypes.func.isRequired,
  }).isRequired,
  handleSubmit: PropTypes.func.isRequired,
  initialize: PropTypes.func.isRequired,
  setPopup: PropTypes.func.isRequired,
  setButtons: PropTypes.func.isRequired,
  update: PropTypes.func.isRequired,
  destroy: PropTypes.func.isRequired,
  items: PropTypes.arrayOf(PropTypes.object).isRequired,
  questionId: PropTypes.string.isRequired,
  error: PropTypes.string.isRequired,
};

const mapStateToProps = state => ({
  items: state.selection.items,
  error: state.selection.error,
});

const mapDispatchToProps = dispatch => ({
  getList: questionId => dispatch(listSelection(questionId)),
  update: payload => dispatch(updateSelection(payload)),
  destroy: payload => dispatch(destroySelection(payload)),
  setPopup: payload => dispatch(setPopupHeaderMessage(payload)),
  setButtons: payload => dispatch(setPopupButtons(payload)),
});

export default reduxForm({
  form: 'SelectionCRUDForm',
})(
  connect(
    mapStateToProps,
    mapDispatchToProps,
  )(SelectionList),
);

import _ from 'lodash';
import React from 'react';
import PropTypes from 'prop-types';
import { Field, reduxForm } from 'redux-form';
import { connect } from 'react-redux';
import {
  listSelection,
  createSelection,
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

// Styled
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
      index: 0,
      popupFilter: false,
      createForm: false,
      updateForm: false,
      subject: '',
    };

    this.cancelPopup = this.cancelPopup.bind(this);
    this.onDestroySelection = this.onDestroySelection.bind(this);
    this.openCreateSelectionForm = this.openCreateSelectionForm.bind(this);
  }

  static getDerivedStateFromProps(nextProps, prevState) {
    if (prevState.subject !== nextProps.subject) {
      nextProps.getList(nextProps.subject);
      return {
        id: 0,
        index: 0,
        createForm: false,
        updateForm: false,
        subject: nextProps.subject,
      };
    }
    return null;
  }

  async onCreateSelection(payload) {
    const { create, getList } = this.props;
    await create(payload);

    const { error } = this.props;
    if (!error) {
      getList(payload.subject);
      this.setState({ createForm: false });
    }
  }

  async onUpdateSelection(payload) {
    const { putDetail, getList } = this.props;
    await putDetail(payload);

    const { error } = this.props;
    if (!error) {
      getList(payload.subject);
      this.setState({ updateForm: false });
    }
  }

  onDestroySelection() {
    const { index } = this.state;
    const { setPopup, setButtons } = this.props;
    setPopup({
      header: `${index + 1}번 선택지 삭제`,
      message: `${index + 1}번 선택지를 삭제하시겠습니까?`,
    });
    setButtons(dataConfig.popupMessage.destroyConfirm);
    this.setState({ popupFilter: true });
  }

  openCreateSelectionForm() {
    const { initialize, subject } = this.props;
    this.setState(state => ({
      createForm: !state.createForm,
      updateForm: false,
    }));
    initialize({
      subject,
    });
  }

  openUpdateSelectionForm(id) {
    const { items, initialize, subject } = this.props;
    const selectedItem = _.find(items, o => o.id === id);
    const selectedIndex = _.findIndex(items, o => o.id === id);
    initialize({
      select: selectedItem.select,
      id,
      subject,
    });

    const { index, updateForm } = this.state;
    if (index !== selectedIndex && updateForm === true) {
      this.setState({
        createForm: false,
        id,
        index: selectedIndex,
      });
    } else {
      this.setState(state => ({
        createForm: false,
        updateForm: !state.updateForm,
        id,
        index: selectedIndex,
      }));
    }
  }

  cancelPopup() {
    this.setState({ popupFilter: false });
  }

  renderItems() {
    const { items } = this.props;
    return _.map(items, item => (
      <div key={item.id}>
        <Styled.UpdateSelectionButton
          type="button"
          onClick={e => this.openUpdateSelectionForm(item.id, e)}
        >
          <img src={Pencil} alt="update-selection-button" />
        </Styled.UpdateSelectionButton>
        <span style={{ marginLeft: '0.5rem' }}>{item.select}</span>
      </div>
    ));
  }

  render() {
    const {
      id, index, createForm, updateForm, popupFilter,
    } = this.state;
    const {
      history, destroyDetail, handleSubmit, subject, error,
    } = this.props;
    const payload = { id, subject };

    return (
      <div>
        <h4>
          <strong>선택지 편집</strong>
        </h4>
        {this.renderItems()}
        <Styled.CreateSelectionGroup>
          <Styled.UpdateSelectionButton
            type="button"
            onClick={this.openCreateSelectionForm}
          >
            <img src={Plus} alt="create-selection-button" />
          </Styled.UpdateSelectionButton>
          <div
            style={{
              marginLeft: '0.5rem',
              visibility: createForm ? 'visible' : 'hidden',
              height: createForm ? '100%' : '2rem',
            }}
          >
            <form
              action="post"
              onSubmit={handleSubmit(this.onCreateSelection.bind(this))}
            >
              <Styled.CreateSelectionGroup>
                <Field
                  type="text"
                  name="createSelect"
                  placeholder="선택지"
                  component={BasicFormField.PlaceholderFormField}
                  validate={Validation.required}
                />
                <Element.BasicButton type="submit">create</Element.BasicButton>
              </Styled.CreateSelectionGroup>
            </form>
          </div>
        </Styled.CreateSelectionGroup>
        <Element.BasicHr />
        <div style={{ visibility: updateForm ? 'visible' : 'hidden' }}>
          <h5>
            <strong>{`${index + 1}번 선택지 수정`}</strong>
          </h5>
          <form
            action="post"
            onSubmit={handleSubmit(this.onUpdateSelection.bind(this))}
          >
            <Field
              type="text"
              name="select"
              placeholder="선택지"
              component={BasicFormField.PlaceholderFormField}
              validate={Validation.required}
            />
            <Styled.SelectionButtonGroup>
              <Element.BasicButton type="submit">update</Element.BasicButton>
              <Element.BasicButton
                type="button"
                onClick={this.onDestroySelection}
              >
                delete
              </Element.BasicButton>
            </Styled.SelectionButtonGroup>
          </form>
        </div>
        {popupFilter ? (
          <Loadable.ConfirmPopup
            method={destroyDetail}
            argument={payload}
            error={error}
            cancelPopup={this.cancelPopup}
            replace={history.replace}
            destination="/survey"
          />
        ) : null}
      </div>
    );
  }
}

SelectionList.propTypes = {
  handleSubmit: PropTypes.func.isRequired,
  initialize: PropTypes.func.isRequired,
  history: PropTypes.shape({
    replace: PropTypes.func.isRequired,
  }).isRequired,
  items: PropTypes.arrayOf(PropTypes.object).isRequired,
  subject: PropTypes.string.isRequired,
  error: PropTypes.string.isRequired,
  getList: PropTypes.func.isRequired,
  destroyDetail: PropTypes.func.isRequired,
  setPopup: PropTypes.func.isRequired,
  setButtons: PropTypes.func.isRequired,
};

const mapStateToProps = state => ({
  items: state.selection.items,
  error: state.selection.error,
});

const mapDispatchToProps = dispatch => ({
  getList: subject => dispatch(listSelection(subject)),
  create: payload => dispatch(createSelection(payload)),
  putDetail: payload => dispatch(updateSelection(payload)),
  destroyDetail: payload => dispatch(destroySelection(payload)),
  setPopup: payload => dispatch(setPopupHeaderMessage(payload)),
  setButtons: payload => dispatch(setPopupButtons(payload)),
});

export default reduxForm({
  form: 'SelectionForm',
})(
  connect(
    mapStateToProps,
    mapDispatchToProps,
  )(SelectionList),
);

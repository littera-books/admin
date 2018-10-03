import _ from 'lodash';
import React from 'react';
import PropTypes from 'prop-types';
import { Field, reduxForm } from 'redux-form';
import { connect } from 'react-redux';
import {
  listSelection,
  updateSelection,
  destroySelecton,
} from '../../reducers/reducer.selection';
import {
  callPopupFilter,
  setHeaderProperty,
  setMessageProperty,
} from '../../reducers/reducer.popup';

// Components
import Loadable from '../../loadable';

// Styled
import StyledBase from '../../styled/Base';
import Styled from './Selection.styled';

// Assets
import Pencil from '../../assets/images/pencil-alt-solid.svg';
import FormField from '../question/FormField';

class SelectionList extends React.Component {
  constructor(props) {
    super(props);

    this.state = {
      id: 0,
      index: 0,
      updateForm: false,
      subject: '',
    };

    this.onDestroySelection = this.onDestroySelection.bind(this);
  }

  static getDerivedStateFromProps(nextProps, prevState) {
    if (prevState.subject !== nextProps.subject) {
      nextProps.getList(nextProps.subject);
      return {
        id: 0,
        index: 0,
        updateForm: false,
        subject: nextProps.subject,
      };
    }
    return null;
  }

  async onUpdateSelection(payload) {
    const { putDetail, history } = this.props;
    await putDetail(payload);

    const { error } = this.props;
    if (!error) {
      history.replace(`/survey/${payload.subject}`);
      window.location.reload();
    }
  }

  async onDestroySelection() {
    const { index } = this.state;
    const { callPopup, setHeader, setMessage } = this.props;
    setHeader(`${index + 1}번 선택지 삭제`);
    setMessage(`${index + 1}번 선택지를 삭제하시겠습니까?`);
    callPopup();
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
        id,
        index: selectedIndex,
      });
    } else {
      this.setState(state => ({
        updateForm: !state.updateForm,
        id,
        index: selectedIndex,
      }));
    }
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
    const { id, index, updateForm } = this.state;
    const {
      filter,
      destroyDetail,
      history,
      handleSubmit,
      subject,
    } = this.props;
    const payload = { id, subject };

    return (
      <div>
        <h4>
          <strong>선택지 편집</strong>
        </h4>
        {this.renderItems()}
        <StyledBase.BasicHr />
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
              label="선택지"
              component={FormField}
            />
            <Styled.SelectionButtonGroup>
              <StyledBase.BasicButton type="submit">
                update
              </StyledBase.BasicButton>
              <StyledBase.BasicButton
                type="button"
                onClick={this.onDestroySelection}
              >
                delete
              </StyledBase.BasicButton>
            </Styled.SelectionButtonGroup>
          </form>
        </div>
        <Loadable.Popup
          visibility={filter}
          method={destroyDetail}
          argument={payload}
          replace={history.replace}
          destination={`/survey/${subject}`}
        />
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
  destroyDetail: PropTypes.func.isRequired,
  filter: PropTypes.string.isRequired,
  callPopup: PropTypes.func.isRequired,
  setHeader: PropTypes.func.isRequired,
  setMessage: PropTypes.func.isRequired,
};

const mapStateToProps = state => ({
  items: state.selection.items,
  filter: state.popup.filter,
});

const mapDispatchToProps = dispatch => ({
  getList: subject => dispatch(listSelection(subject)),
  putDetail: payload => dispatch(updateSelection(payload)),
  destroyDetail: payload => dispatch(destroySelecton(payload)),
  callPopup: () => dispatch(callPopupFilter()),
  setHeader: header => dispatch(setHeaderProperty(header)),
  setMessage: message => dispatch(setMessageProperty(message)),
});

export default reduxForm({
  form: 'SelectionForm',
})(
  connect(
    mapStateToProps,
    mapDispatchToProps,
  )(SelectionList),
);

import _ from 'lodash';
import React from 'react';
import PropTypes from 'prop-types';
import { Field, reduxForm } from 'redux-form';
import { connect } from 'react-redux';
import {
  listSelection,
  updateSelection,
} from '../../reducers/reducer.selection';

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
      index: 0,
      updateForm: false,
      subject: '',
    };
  }

  static getDerivedStateFromProps(nextProps, prevState) {
    if (prevState.subject !== nextProps.subject) {
      nextProps.getList(nextProps.subject);
      return {
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
      this.setState(state => ({
        updateForm: !state.updateForm,
        index: 0,
      }));
      history.replace(`/survey/${payload.subject}`);
      window.location.reload();
    }
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
        index: selectedIndex,
      });
    } else {
      this.setState(state => ({
        updateForm: !state.updateForm,
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
    const { index, updateForm } = this.state;
    const { handleSubmit } = this.props;

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
              <StyledBase.BasicButton type="button">
                delete
              </StyledBase.BasicButton>
            </Styled.SelectionButtonGroup>
          </form>
        </div>
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
};

const mapStateToProps = state => ({
  items: state.selection.items,
});

const mapDispatchToProps = dispatch => ({
  getList: subject => dispatch(listSelection(subject)),
  putDetail: payload => dispatch(updateSelection(payload)),
});

export default reduxForm({
  form: 'SelectionForm',
})(
  connect(
    mapStateToProps,
    mapDispatchToProps,
  )(SelectionList),
);

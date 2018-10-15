import React from 'react';
import PropTypes from 'prop-types';
import { Field, reduxForm } from 'redux-form';
import { connect } from 'react-redux';
import {
  listSelection,
  createSelection,
} from '../../reducers/reducer.selection';

// Components
import BasicFormField from '../../form/FormField';
import Validation from '../../form/Validation';

// Styled
import Element from '../../styled_base/Element';

class CreateSelection extends React.Component {
  componentDidMount() {
    const { initialize, questionId } = this.props;
    initialize({
      questionId,
    });
  }

  async onCreateSelection(payload) {
    const {
      create, getList, questionId, closeCreateForm,
    } = this.props;
    await create(payload);
    await getList(questionId);
    await closeCreateForm();
  }

  render() {
    const { handleSubmit } = this.props;
    return (
      <form
        action="post"
        onSubmit={handleSubmit(this.onCreateSelection.bind(this))}
      >
        <Field
          type="text"
          name="createSelect"
          placeholder="선택지"
          component={BasicFormField.PlaceholderFormField}
          validate={Validation.required}
        />
        <Element.BasicButton type="submit">create</Element.BasicButton>
      </form>
    );
  }
}

CreateSelection.propTypes = {
  handleSubmit: PropTypes.func.isRequired,
  initialize: PropTypes.func.isRequired,
  getList: PropTypes.func.isRequired,
  create: PropTypes.func.isRequired,
  closeCreateForm: PropTypes.func.isRequired,
  questionId: PropTypes.string.isRequired,
};

const mapDispatchTpProps = dispatch => ({
  getList: questionId => dispatch(listSelection(questionId)),
  create: payload => dispatch(createSelection(payload)),
});

export default reduxForm({
  form: 'CreateSelectionForm',
})(
  connect(
    null,
    mapDispatchTpProps,
  )(CreateSelection),
);

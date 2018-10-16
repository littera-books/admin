import React from 'react';
import PropTypes from 'prop-types';
import { Field, reduxForm } from 'redux-form';
import { connect } from 'react-redux';
import {
  createPromotion,
  detailPromotion,
} from '../../reducers/reducer.promotion';

// Components
import BasicFormField from '../../form/FormField';
import Validation from '../../form/Validation';

// Styled
import Wrapper from '../../styled_base/Wrapper';
import Element from '../../styled_base/Element';

class CreatePromotion extends React.Component {
  componentDidMount() {
    const { initialize, productId } = this.props;
    initialize({
      productId,
    });
  }

  async onCreatePromotion(payload) {
    const {
      create, getDetail, productId, closeCreateForm,
    } = this.props;
    await create(payload);
    await getDetail(productId);
    await closeCreateForm();
  }

  render() {
    const { handleSubmit } = this.props;
    return (
      <form
        action="post"
        onSubmit={handleSubmit(this.onCreatePromotion.bind(this))}
      >
        <Wrapper.BasicFlexWrapper>
          <Field
            type="text"
            name="code"
            placeholder="프로모션 코드"
            component={BasicFormField.PlaceholderFormField}
            validate={[Validation.required, Validation.maxLength20]}
          />
          <Element.BasicButton type="submit">create</Element.BasicButton>
        </Wrapper.BasicFlexWrapper>
      </form>
    );
  }
}

CreatePromotion.propTypes = {
  handleSubmit: PropTypes.func.isRequired,
  initialize: PropTypes.func.isRequired,
  getDetail: PropTypes.func.isRequired,
  create: PropTypes.func.isRequired,
  closeCreateForm: PropTypes.func.isRequired,
  productId: PropTypes.string.isRequired,
};

const mapDispatchToProps = dispatch => ({
  getDetail: productId => dispatch(detailPromotion(productId)),
  create: payload => dispatch(createPromotion(payload)),
});

export default reduxForm({
  form: 'CreatePromotionForm',
})(
  connect(
    null,
    mapDispatchToProps,
  )(CreatePromotion),
);

import React from 'react';
import PropTypes from 'prop-types';
import { Field, reduxForm } from 'redux-form';
import { connect } from 'react-redux';
import {
  detailPromotion,
  updatePromotion,
} from '../../reducers/reducer.promotion';

// Components
import BasicFormField from '../../form/FormField';
import Validation from '../../form/Validation';

// Styled
import Wrapper from '../../styled_base/Wrapper';
import Element from '../../styled_base/Element';
import Styled from './Promotion.styled';

// Assets
import Pencil from '../../assets/images/pencil-alt-solid.svg';

class Promotion extends React.Component {
  constructor(props) {
    super(props);

    this.state = {
      productId: 0,
      promotionFilter: false,
      updateForm: false,
    };

    this.openUpdatePromotionForm = this.openUpdatePromotionForm.bind(this);
  }

  static getDerivedStateFromProps(nextProps, prevState) {
    if (prevState.productId !== nextProps.productId) {
      nextProps.getDetail(nextProps.productId);
      return {
        productId: nextProps.productId,
        promotionFilter: false,
        updateForm: false,
      };
    }
    if (nextProps.item.id !== 0) {
      return { promotionFilter: true };
    }
    return null;
  }

  async onUpdatePromotion(payload) {
    const { update, getDetail, productId } = this.props;
    await update(payload);

    const { error } = this.props;
    if (!error) {
      await this.setState({ updateForm: false });
      await getDetail(productId);
    }
  }

  openUpdatePromotionForm() {
    const { item, productId, initialize } = this.props;
    initialize({
      productId,
      code: item.code,
    });
    this.setState(state => ({ updateForm: !state.updateForm }));
  }

  renderItem() {
    const { item } = this.props;
    return (
      <Wrapper.BasicFlexWrapper>
        <Styled.PromotionButton
          type="button"
          onClick={this.openUpdatePromotionForm}
        >
          <img src={Pencil} alt="update-promotion-button" />
        </Styled.PromotionButton>
        <p>{item.code}</p>
      </Wrapper.BasicFlexWrapper>
    );
  }

  render() {
    const { promotionFilter, updateForm } = this.state;
    const { handleSubmit } = this.props;
    return (
      <Styled.PromotionWrapper>
        <h4>
          <strong>프로모션 코드</strong>
        </h4>
        {promotionFilter && this.renderItem()}
        <Element.BasicHr />
        <form
          style={{ display: updateForm ? 'block' : 'none' }}
          action="post"
          onSubmit={handleSubmit(this.onUpdatePromotion.bind(this))}
        >
          <h5>
            <strong>프로모션 코드 편집</strong>
          </h5>
          <Field
            type="text"
            name="code"
            placeholder="프로모션 코드"
            component={BasicFormField.PlaceholderFormField}
            validate={[Validation.required, Validation.maxLength20]}
          />
          <Styled.PromotionButtonGroup>
            <Element.BasicButton type="button">delete</Element.BasicButton>
            <Element.BasicButton type="submit">update</Element.BasicButton>
          </Styled.PromotionButtonGroup>
        </form>
      </Styled.PromotionWrapper>
    );
  }
}

Promotion.propTypes = {
  item: PropTypes.shape({
    id: PropTypes.number.isRequired,
    code: PropTypes.string.isRequired,
  }).isRequired,
  productId: PropTypes.string.isRequired,
  handleSubmit: PropTypes.func.isRequired,
  initialize: PropTypes.func.isRequired,
  update: PropTypes.func.isRequired,
};

const mapStateToProps = state => ({
  item: state.promotion.item,
  error: state.promotion.error,
});

const mapDispatchToProps = dispatch => ({
  getDetail: productId => dispatch(detailPromotion(productId)),
  update: payload => dispatch(updatePromotion(payload)),
});

export default reduxForm({
  form: 'PromotionUpdateForm',
})(
  connect(
    mapStateToProps,
    mapDispatchToProps,
  )(Promotion),
);

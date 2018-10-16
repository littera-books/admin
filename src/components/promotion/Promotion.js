import React from 'react';
import PropTypes from 'prop-types';
import { Field, reduxForm } from 'redux-form';
import { connect } from 'react-redux';
import {
  detailPromotion,
  updatePromotion,
  destroyPromotion,
} from '../../reducers/reducer.promotion';
import {
  setPopupHeaderMessage,
  setPopupButtons,
} from '../../reducers/reducer.popup';
import dataConfig from '../../dataConfig';

// Components
import Loadable from '../../loadable';
import BasicFormField from '../../form/FormField';
import Validation from '../../form/Validation';
import CreatePromotion from './CreatePromotion';

// Styled
import Wrapper from '../../styled_base/Wrapper';
import Element from '../../styled_base/Element';
import Styled from './Promotion.styled';

// Assets
import Pencil from '../../assets/images/pencil-alt-solid.svg';
import Plus from '../../assets/images/plus-circle-solid.svg';

class Promotion extends React.Component {
  constructor(props) {
    super(props);

    this.state = {
      productId: 0,
      promotionFilter: false,
      updateForm: false,
      popupFilter: false,
    };

    this.openCreatePromotionForm = this.openCreatePromotionForm.bind(this);
    this.openUpdatePromotionForm = this.openUpdatePromotionForm.bind(this);
    this.openDestroyPromotionForm = this.openDestroyPromotionForm.bind(this);
    this.closeCreateForm = this.closeCreateForm.bind(this);
    this.cancelPopup = this.cancelPopup.bind(this);
  }

  static getDerivedStateFromProps(nextProps, prevState) {
    if (prevState.productId !== nextProps.productId) {
      nextProps.getDetail(nextProps.productId);
      return {
        productId: nextProps.productId,
        promotionFilter: false,
        createForm: false,
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

  openCreatePromotionForm() {
    this.setState(state => ({
      createForm: !state.createForm,
      updateForm: false,
    }));
  }

  openUpdatePromotionForm() {
    const { item, productId, initialize } = this.props;
    initialize({
      productId,
      code: item.code,
    });

    this.setState(state => ({
      createForm: false,
      updateForm: !state.updateForm,
    }));
  }

  openDestroyPromotionForm() {
    const { setPopup, setButtons } = this.props;
    setPopup(dataConfig.popupMessage.destroyPromotion);
    setButtons(dataConfig.popupMessage.destroyConfirm);
    this.setState({ popupFilter: true });
  }

  closeCreateForm() {
    this.setState({ createForm: false });
  }

  cancelPopup() {
    this.setState({ popupFilter: false });
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
    const {
      promotionFilter, createForm, updateForm, popupFilter,
    } = this.state;
    const {
      handleSubmit,
      error,
      productId,
      history,
      destroy,
      item,
    } = this.props;
    return (
      <Styled.PromotionWrapper>
        <h4>
          <strong>프로모션 코드</strong>
        </h4>
        {promotionFilter && this.renderItem()}
        {item.id === 0 ? (
          <Wrapper.BasicFlexWrapper>
            <Styled.PromotionButton
              type="button"
              onClick={this.openCreatePromotionForm}
            >
              <img src={Plus} alt="create-promotion-button" />
            </Styled.PromotionButton>
            {createForm && (
              <CreatePromotion
                productId={productId}
                closeCreateForm={this.closeCreateForm}
              />
            )}
          </Wrapper.BasicFlexWrapper>
        ) : null}
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
            <Element.BasicButton
              type="button"
              onClick={this.openDestroyPromotionForm}
            >
              delete
            </Element.BasicButton>
            <Element.BasicButton type="submit">update</Element.BasicButton>
          </Styled.PromotionButtonGroup>
        </form>
        {popupFilter && (
          <Loadable.ConfirmPopup
            method={destroy}
            argument={productId}
            error={error}
            cancelPopup={this.cancelPopup}
            replace={history.replace}
            destination={`/product/${productId}`}
          />
        )}
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
  error: PropTypes.string.isRequired,
  history: PropTypes.shape({
    replace: PropTypes.func.isRequired,
  }).isRequired,
  handleSubmit: PropTypes.func.isRequired,
  initialize: PropTypes.func.isRequired,
  setPopup: PropTypes.func.isRequired,
  setButtons: PropTypes.func.isRequired,
  update: PropTypes.func.isRequired,
  destroy: PropTypes.func.isRequired,
};

const mapStateToProps = state => ({
  item: state.promotion.item,
  error: state.promotion.error,
});

const mapDispatchToProps = dispatch => ({
  getDetail: productId => dispatch(detailPromotion(productId)),
  update: payload => dispatch(updatePromotion(payload)),
  destroy: productId => dispatch(destroyPromotion(productId)),
  setPopup: payload => dispatch(setPopupHeaderMessage(payload)),
  setButtons: payload => dispatch(setPopupButtons(payload)),
});

export default reduxForm({
  form: 'PromotionUpdateForm',
})(
  connect(
    mapStateToProps,
    mapDispatchToProps,
  )(Promotion),
);

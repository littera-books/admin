import React from 'react';
import PropTypes from 'prop-types';
import { Field, reduxForm } from 'redux-form';
import { connect } from 'react-redux';
import {
  detailProduct,
  updateProduct,
  destroyProduct,
  clearError,
} from '../../../reducers/reducer.product';
import {
  setPopupHeaderMessage,
  setPopupButtons,
} from '../../../reducers/reducer.popup';
import dataConfig from '../../../dataConfig';

// Components
import Loadable from '../../../loadable';
import BasicFormField from '../../../form/FormField';
import Validation from '../../../form/Validation';

// Styled
import Wrapper from '../../../styled_base/Wrapper';
import Element from '../../../styled_base/Element';
import Styled from './Product.styled';

export const DefaultProductDetail = () => (
  <Wrapper.DefaultDetailWrapper>
    <p>{dataConfig.defaultDetailText}</p>
  </Wrapper.DefaultDetailWrapper>
);

class ActiveProductDetail extends React.Component {
  constructor(props) {
    super(props);

    this.state = {
      popupFilter: false,
      updateForm: false,
      productId: 0,
      file: '',
      imagePreviewUrl: '',
    };

    this.cancelPopup = this.cancelPopup.bind(this);
    this.openUpdateProductForm = this.openUpdateProductForm.bind(this);
    this.onDestroyProduct = this.onDestroyProduct.bind(this);
  }

  static getDerivedStateFromProps(nextProps, prevState) {
    if (prevState.productId !== nextProps.match.params.productId) {
      nextProps.getDetail(nextProps.match.params.productId);
      return {
        updateForm: false,
        productId: nextProps.match.params.productId,
      };
    }
    return null;
  }

  async onUpdateProduct(payload) {
    const { productId, file } = this.state;
    const { update, getDetail, history } = this.props;

    const formData = new FormData();

    formData.append('books', payload.books);
    formData.append('months', payload.months);
    formData.append('price', payload.price);
    formData.append('description', payload.description);
    formData.append('is_visible', payload.isVisible);
    formData.append('thumbnail', file);

    await update(productId, formData);

    const { error } = this.props;
    if (!error) {
      this.setState({ updateForm: false });
      getDetail(productId);
      history.replace('/product');
      window.location.reload();
    }
  }

  onDestroyProduct() {
    const { setPopup, setButtons, clear } = this.props;
    setPopup(dataConfig.popupMessage.destroyProduct);
    setButtons(dataConfig.popupMessage.destroyConfirm);
    clear();
    this.setState({ popupFilter: true, updateForm: false });
  }

  openUpdateProductForm() {
    this.setState(state => ({
      updateForm: !state.updateForm,
    }));

    const { productId } = this.state;
    const { item, initialize } = this.props;
    initialize({
      productId,
      books: item.books,
      months: item.months,
      price: item.price,
      description: item.description,
      isVisible: item.is_visible,
    });
  }

  cancelPopup() {
    this.setState({ popupFilter: false });
  }

  handleFileUpload(event) {
    event.preventDefault();
    const reader = new FileReader();
    const file = event.target.files[0];

    reader.onloadend = () => {
      this.setState({
        file,
        imagePreviewUrl: reader.result,
      });
    };

    reader.readAsDataURL(file);
  }

  render() {
    const {
      popupFilter, updateForm, productId, imagePreviewUrl,
    } = this.state;
    const {
      history, handleSubmit, item, destroy, error,
    } = this.props;
    return (
      <Wrapper.ActiveDetailWrapper>
        <Wrapper.BetweenWrapper>
          <h2>
            <strong>{item.description}</strong>
          </h2>
          <Styled.ButtonGroup>
            <Element.BasicButton
              type="button"
              onClick={this.openUpdateProductForm}
            >
              상품 수정
            </Element.BasicButton>
            <Element.BasicButton type="button" onClick={this.onDestroyProduct}>
              상품 삭제
            </Element.BasicButton>
          </Styled.ButtonGroup>
        </Wrapper.BetweenWrapper>
        <p>{`책 수: ${item.books}`}</p>
        <p>{`개월: ${item.months}`}</p>
        <p>{`가격: ${item.price}`}</p>
        {item.url && (
          <Element.ResponsiveImg
            width="120px"
            src={dataConfig.baseUrl + item.url}
            alt="product-thumbnail"
          />
        )}
        <form
          style={{ display: updateForm ? 'block' : 'none' }}
          action="post"
          onSubmit={handleSubmit(this.onUpdateProduct.bind(this))}
        >
          <Field
            type="number"
            name="books"
            placeholder="책 수"
            component={BasicFormField.PlaceholderFormField}
            validate={[Validation.required, Validation.number]}
          />
          <Field
            type="number"
            name="months"
            placeholder="개월 수"
            component={BasicFormField.PlaceholderFormField}
            validate={[Validation.required, Validation.number]}
          />
          <Field
            type="number"
            name="price"
            placeholder="가격"
            component={BasicFormField.PlaceholderFormField}
            validate={[Validation.required, Validation.number]}
          />
          <Field
            type="text"
            name="description"
            placeholder="설명"
            component={BasicFormField.PlaceholderFormField}
            validate={Validation.required}
          />
          <Field
            type="checkbox"
            name="isVisible"
            placeholder="발행 여부"
            component={BasicFormField.CheckboxFormField}
          />
          <input
            id="thumbnailInput"
            name="thumbnail"
            type="file"
            onChange={this.handleFileUpload.bind(this)}
          />
          {imagePreviewUrl && (
            <Element.ResponsiveImg
              width="120px"
              src={imagePreviewUrl}
              alt="product-thumbnail"
            />
          )}
          <div>
            <Element.BasicSmall>{error}</Element.BasicSmall>
          </div>
          <Element.AlignLeftButton type="submit">
            update
          </Element.AlignLeftButton>
        </form>
        <Element.BasicHr />
        <Loadable.Promotion history={history} productId={productId} />
        {popupFilter && (
          <Loadable.ConfirmPopup
            method={destroy}
            argument={productId}
            error={error}
            cancelPopup={this.cancelPopup}
            replace={history.replace}
            destination="/product"
          />
        )}
      </Wrapper.ActiveDetailWrapper>
    );
  }
}

ActiveProductDetail.propTypes = {
  history: PropTypes.shape({
    replace: PropTypes.func.isRequired,
  }).isRequired,
  item: PropTypes.shape({
    months: PropTypes.number.isRequired,
    price: PropTypes.number.isRequired,
    description: PropTypes.string.isRequired,
  }).isRequired,
  error: PropTypes.string.isRequired,
  update: PropTypes.func.isRequired,
  destroy: PropTypes.func.isRequired,
  clear: PropTypes.func.isRequired,
  setPopup: PropTypes.func.isRequired,
  setButtons: PropTypes.func.isRequired,
  handleSubmit: PropTypes.func.isRequired,
  initialize: PropTypes.func.isRequired,
};

const mapStateToProps = state => ({
  item: state.product.item,
  error: state.product.error,
});

const mapDispatchToProps = dispatch => ({
  getDetail: productId => dispatch(detailProduct(productId)),
  update: (productId, formData) => dispatch(updateProduct(productId, formData)),
  destroy: productId => dispatch(destroyProduct(productId)),
  clear: () => dispatch(clearError()),
  setPopup: payload => dispatch(setPopupHeaderMessage(payload)),
  setButtons: payload => dispatch(setPopupButtons(payload)),
});

export default reduxForm({
  form: 'UpdateProductForm',
})(
  connect(
    mapStateToProps,
    mapDispatchToProps,
  )(ActiveProductDetail),
);

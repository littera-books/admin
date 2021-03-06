import _ from 'lodash';
import React from 'react';
import PropTypes from 'prop-types';
import { Link } from 'react-router-dom';
import { Field, reduxForm } from 'redux-form';
import { connect } from 'react-redux';
import { ListProduct, createProduct } from '../../../reducers/reducer.product';

// Components
import BasicFormField from '../../../form/FormField';
import Validation from '../../../form/Validation';

// Styled
import Wrapper from '../../../styled_base/Wrapper';
import Element from '../../../styled_base/Element';
import Styled from './Product.styled';

class ProductList extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      createProductForm: false,
      file: '',
      imagePreviewUrl: '',
    };

    this.openCreateProductForm = this.openCreateProductForm.bind(this);
  }

  componentDidMount() {
    const { getList } = this.props;
    getList();
  }

  async onCreateProduct(payload) {
    const { file } = this.state;
    const { create } = this.props;

    const formData = new FormData();

    formData.append('books', payload.books);
    formData.append('months', payload.months);
    formData.append('price', payload.price);
    formData.append('discount_amount', payload.discountAmount);
    formData.append('description', payload.description);
    formData.append('thumbnail', file);

    await create(formData);

    const { error, getList, initialize } = this.props;
    if (!error) {
      this.setState(state => ({
        createProductForm: !state.createProductForm,
      }));
      initialize();
      getList();
    }
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

  openCreateProductForm() {
    this.setState(state => ({
      createProductForm: !state.createProductForm,
    }));
  }

  createProduct() {
    const { imagePreviewUrl } = this.state;
    const { handleSubmit, error } = this.props;
    return (
      <Styled.ProductItem>
        <h5>
          <strong>새 상품 만들기</strong>
        </h5>
        <form
          action="post"
          onSubmit={handleSubmit(this.onCreateProduct.bind(this))}
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
            type="number"
            name="discountAmount"
            placeholder="할인액"
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
          <input
            id="thumbnailInput"
            name="thumbnail"
            type="file"
            onChange={this.handleFileUpload.bind(this)}
            required
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
          <Element.AlignRightButton type="submit">
            Create
          </Element.AlignRightButton>
        </form>
      </Styled.ProductItem>
    );
  }

  renderItems() {
    const { items, matchUrl } = this.props;
    return _.map(items, item => (
      <Styled.ProductItem key={item.id}>
        <Link to={`${matchUrl}/${item.id}`}>
          <p>{`책 수: ${item.books}`}</p>
          <p>{`개월: ${item.months}`}</p>
          <p>{`가격: ${item.price}`}</p>
          <p>{`할인액: ${item.discount_amount}`}</p>
          <p>{`설명: ${item.description}`}</p>
          <p>{`발행 여부: ${item.is_visible ? 'O' : 'X'}`}</p>
        </Link>
      </Styled.ProductItem>
    ));
  }

  render() {
    const { createProductForm } = this.state;
    const { length } = this.props;
    return (
      <Wrapper.ListWrapper>
        <Wrapper.BetweenWrapper>
          <p>{`상품 갯수: ${length}`}</p>
          <Element.BasicButton
            type="button"
            onClick={this.openCreateProductForm}
          >
            &nbsp;
            <strong>{createProductForm ? '-' : '+'}</strong>
            &nbsp;
          </Element.BasicButton>
        </Wrapper.BetweenWrapper>
        {createProductForm && this.createProduct()}
        {this.renderItems()}
      </Wrapper.ListWrapper>
    );
  }
}

ProductList.propTypes = {
  matchUrl: PropTypes.string.isRequired,
  handleSubmit: PropTypes.func.isRequired,
  initialize: PropTypes.func.isRequired,
  items: PropTypes.arrayOf(PropTypes.object.isRequired).isRequired,
  error: PropTypes.string.isRequired,
  length: PropTypes.number.isRequired,
  getList: PropTypes.func.isRequired,
  create: PropTypes.func.isRequired,
};

const mapStateToProps = state => ({
  items: state.product.items,
  length: state.product.length,
  error: state.product.error,
});

const mapDispatchToProps = dispatch => ({
  getList: () => dispatch(ListProduct()),
  create: payload => dispatch(createProduct(payload)),
});

export default reduxForm({
  form: 'createProductForm',
})(
  connect(
    mapStateToProps,
    mapDispatchToProps,
  )(ProductList),
);

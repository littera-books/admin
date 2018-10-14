import _ from 'lodash';
import React from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { getProductList } from '../../../reducers/reducer.product';

// Styled
import Wrapper from '../../../styled_base/Wrapper';
import Styled from './Product.styled';

class ProductList extends React.Component {
  componentDidMount() {
    const { getList } = this.props;
    getList();
  }

  renderItems() {
    const { items } = this.props;
    return _.map(items, item => (
      <Styled.ProductItem key={item.id}>
        <p>{`개월: ${item.months}`}</p>
        <p>{`가격: ${item.price}`}</p>
        <p>{`설명: ${item.description}`}</p>
      </Styled.ProductItem>
    ));
  }

  render() {
    const { length } = this.props;
    return (
      <Wrapper.ListWrapper>
        <p>{`상품 갯수: ${length}`}</p>
        {this.renderItems()}
      </Wrapper.ListWrapper>
    );
  }
}

ProductList.propTypes = {
  items: PropTypes.shape({
    id: PropTypes.number.isRequired,
    months: PropTypes.number.isRequired,
    price: PropTypes.number.isRequired,
    description: PropTypes.string.isRequired,
  }).isRequired,
  length: PropTypes.number.isRequired,
  getList: PropTypes.func.isRequired,
};

const mapStateToProps = state => ({
  items: state.product.items,
  length: state.product.length,
});

const mapDispatchToProps = dispatch => ({
  getList: () => dispatch(getProductList()),
});

export default connect(
  mapStateToProps,
  mapDispatchToProps,
)(ProductList);

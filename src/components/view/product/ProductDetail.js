import React from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { detailProduct } from '../../../reducers/reducer.product';
import dataConfig from '../../../dataConfig';

// Styled
import Wrapper from '../../../styled_base/Wrapper';

export const DefaultProductDetail = () => (
  <Wrapper.DefaultDetailWrapper>
    <p>{dataConfig.defaultDetailText}</p>
  </Wrapper.DefaultDetailWrapper>
);

class ActiveProductDetail extends React.Component {
  constructor(props) {
    super(props);

    this.state = {
      productId: 0,
    };
  }

  static getDerivedStateFromProps(nextProps, prevState) {
    if (prevState.productId !== nextProps.match.params.productId) {
      nextProps.getDetail(nextProps.match.params.productId);
      return { productId: nextProps.match.params.productId };
    }
    return null;
  }

  render() {
    const { item } = this.props;
    return (
      <Wrapper.ActiveDetailWrapper>
        <h2>
          <strong>{item.description}</strong>
        </h2>
        <p>{item.months}</p>
        <p>{item.price}</p>
      </Wrapper.ActiveDetailWrapper>
    );
  }
}

ActiveProductDetail.propTypes = {
  item: PropTypes.shape({
    months: PropTypes.number.isRequired,
    price: PropTypes.number.isRequired,
    description: PropTypes.string.isRequired,
  }).isRequired,
};

const mapStateToProps = state => ({
  item: state.product.item,
});

const mapDispatchToProps = dispatch => ({
  getDetail: productId => dispatch(detailProduct(productId)),
});

export default connect(
  mapStateToProps,
  mapDispatchToProps,
)(ActiveProductDetail);

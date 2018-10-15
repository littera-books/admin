import React from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { detailPromotion } from '../../reducers/reducer.promotion';

// Styled
import Styled from './Promotion.styled';

class Promotion extends React.Component {
  state = {
    productId: 0,
  };

  static getDerivedStateFromProps(nextProps, prevState) {
    if (prevState.productId !== nextProps.productId) {
      nextProps.getDetail(nextProps.productId);
      return { productId: nextProps.productId };
    }
    return null;
  }

  render() {
    const { item } = this.props;
    return (
      <Styled.PromotionWrapper>
        <h4>
          <strong>프로모션</strong>
        </h4>
        <p>{item.code}</p>
      </Styled.PromotionWrapper>
    );
  }
}

Promotion.propTypes = {
  item: PropTypes.shape({
    code: PropTypes.string.isRequired,
  }).isRequired,
};

const mapStateToProps = state => ({
  item: state.promotion.item,
});

const mapDispatchToProps = dispatch => ({
  getDetail: productId => dispatch(detailPromotion(productId)),
});

export default connect(
  mapStateToProps,
  mapDispatchToProps,
)(Promotion);

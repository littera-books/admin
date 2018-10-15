import React from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { detailPromotion } from '../../reducers/reducer.promotion';

// Styled
import Wrapper from '../../styled_base/Wrapper';
import Styled from './Promotion.styled';

// Assets
import Pencil from '../../assets/images/pencil-alt-solid.svg';

class Promotion extends React.Component {
  state = {
    productId: 0,
    promotionFilter: false,
  };

  static getDerivedStateFromProps(nextProps, prevState) {
    if (prevState.productId !== nextProps.productId) {
      nextProps.getDetail(nextProps.productId);
      return { productId: nextProps.productId };
    }
    if (nextProps.item.id !== 0) {
      return { promotionFilter: true };
    }
    return null;
  }

  renderItem() {
    const { item } = this.props;
    return (
      <Wrapper.BasicFlexWrapper>
        <Styled.PromotionButton type="button">
          <img src={Pencil} alt="update-promotion-button" />
        </Styled.PromotionButton>
        <p>{item.code}</p>
      </Wrapper.BasicFlexWrapper>
    );
  }

  render() {
    const { promotionFilter } = this.state;
    return (
      <Styled.PromotionWrapper>
        <h4>
          <strong>프로모션</strong>
        </h4>
        {promotionFilter && this.renderItem()}
      </Styled.PromotionWrapper>
    );
  }
}

Promotion.propTypes = {
  item: PropTypes.shape({
    id: PropTypes.number.isRequired,
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

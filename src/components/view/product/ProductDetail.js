import React from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import {
  detailProduct,
  destroyProduct,
} from '../../../reducers/reducer.product';
import {
  setPopupHeaderMessage,
  setPopupButtons,
} from '../../../reducers/reducer.popup';
import dataConfig from '../../../dataConfig';

// Components
import Loadable from '../../../loadable';

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
      productId: 0,
    };

    this.cancelPopup = this.cancelPopup.bind(this);
    this.onDestroyProduct = this.onDestroyProduct.bind(this);
  }

  static getDerivedStateFromProps(nextProps, prevState) {
    if (prevState.productId !== nextProps.match.params.productId) {
      nextProps.getDetail(nextProps.match.params.productId);
      return { productId: nextProps.match.params.productId };
    }
    return null;
  }

  onDestroyProduct() {
    const { setPopup, setButtons } = this.props;
    setPopup(dataConfig.popupMessage.destroyProduct);
    setButtons(dataConfig.popupMessage.destroyConfirm);
    this.setState({ popupFilter: true });
  }

  cancelPopup() {
    this.setState({ popupFilter: false });
  }

  render() {
    const { popupFilter, productId } = this.state;
    const {
      history, item, destroy, error,
    } = this.props;
    return (
      <Wrapper.ActiveDetailWrapper>
        <Wrapper.BetweenWrapper>
          <h2>
            <strong>{item.description}</strong>
          </h2>
          <Styled.ButtonGroup>
            <Element.BasicButton type="button">상품 수정</Element.BasicButton>
            <Element.BasicButton type="button" onClick={this.onDestroyProduct}>
              상품 삭제
            </Element.BasicButton>
          </Styled.ButtonGroup>
        </Wrapper.BetweenWrapper>
        <p>{item.months}</p>
        <p>{item.price}</p>
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
  destroy: PropTypes.func.isRequired,
  setPopup: PropTypes.func.isRequired,
  setButtons: PropTypes.func.isRequired,
};

const mapStateToProps = state => ({
  item: state.product.item,
  error: state.product.error,
});

const mapDispatchToProps = dispatch => ({
  getDetail: productId => dispatch(detailProduct(productId)),
  destroy: productId => dispatch(destroyProduct(productId)),
  setPopup: payload => dispatch(setPopupHeaderMessage(payload)),
  setButtons: payload => dispatch(setPopupButtons(payload)),
});

export default connect(
  mapStateToProps,
  mapDispatchToProps,
)(ActiveProductDetail);

import React from 'react';
import PropTypes from 'prop-types';
import { PrivateRoute } from '../../../App';
import dataConfig from '../../../dataConfig';

// Components
import Helmet from '../../helmet/Helmet';
import Loadable from '../../../loadable';
import { DefaultProductDetail } from './ProductDetail';

// Styled
import Styled from './Product.styled';

const Product = ({ match }) => (
  <Styled.ProductWrapper>
    <Helmet pageTitle="Product" />
    <h5>
      <strong>{dataConfig.productTitle}</strong>
    </h5>
    <Styled.ProductInnerWrapper>
      <Loadable.ProductList />
      <PrivateRoute
        exact
        path={`${match.url}`}
        component={DefaultProductDetail}
      />
    </Styled.ProductInnerWrapper>
  </Styled.ProductWrapper>
);

Product.propTypes = {
  match: PropTypes.shape({
    url: PropTypes.string.isRequired,
  }).isRequired,
};

export default Product;

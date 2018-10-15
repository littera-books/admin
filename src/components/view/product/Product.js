import React from 'react';
import PropTypes from 'prop-types';
import { PrivateRoute } from '../../../App';
import dataConfig from '../../../dataConfig';

// Components
import Helmet from '../../helmet/Helmet';
import Loadable from '../../../loadable';
import { DefaultProductDetail } from './ProductDetail';

// Styled
import Wrapper from '../../../styled_base/Wrapper';

const Product = ({ match }) => (
  <Wrapper.SectionWrapper>
    <Helmet pageTitle="Product" />
    <h5>
      <strong>{dataConfig.productTitle}</strong>
    </h5>
    <Wrapper.SectionInnerWrapper>
      <Loadable.ProductList matchUrl={match.url} />
      <PrivateRoute
        exact
        path={`${match.url}`}
        component={DefaultProductDetail}
      />
      <PrivateRoute
        path={`${match.url}/:productId`}
        component={Loadable.ProductDetail}
      />
    </Wrapper.SectionInnerWrapper>
  </Wrapper.SectionWrapper>
);

Product.propTypes = {
  match: PropTypes.shape({
    url: PropTypes.string.isRequired,
  }).isRequired,
};

export default Product;

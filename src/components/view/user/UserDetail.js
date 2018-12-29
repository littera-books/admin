import _ from 'lodash';
import React from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { detailUser } from '../../../reducers/reducer.user';
import { listResult } from '../../../reducers/reducer.surveyResult';
import dataConfig from '../../../dataConfig';

// Styled
import Wrapper from '../../../styled_base/Wrapper';
import Element from '../../../styled_base/Element';
import Styled from './User.styled';

export const DefaultUserDetail = () => (
  <Wrapper.DefaultDetailWrapper>
    <p>{dataConfig.defaultDetailText}</p>
  </Wrapper.DefaultDetailWrapper>
);

class ActiveUserDetail extends React.Component {
  state = {
    userId: 0,
  };

  static getDerivedStateFromProps(nextProps, prevState) {
    if (prevState.userId !== nextProps.match.params.userId) {
      nextProps.getDetail(nextProps.match.params.userId);
      nextProps.getListResult(nextProps.match.params.userId);
      return { userId: nextProps.match.params.userId };
    }
    return null;
  }

  renderSurveyItems() {
    const { itemsResult } = this.props;
    return _.map(itemsResult, item => (
      <li key={item.id}>
        <span>{item.select}</span>
      </li>
    ));
  }

  render() {
    const { item } = this.props;
    return (
      <Wrapper.ActiveDetailWrapper>
        <h2>
          <strong>{item.email}</strong>
        </h2>
        <Element.BasicHr />
        <Styled.UserDashboardWrapper>
          <Styled.UserSectionWrapper>
            <h3>
              <strong>Infomation</strong>
            </h3>
            <Styled.NameWrapper>
              <p>{item.first_name}</p>
              <p>{item.last_name}</p>
            </Styled.NameWrapper>
            <p>{item.phone}</p>
            <p>{item.address}</p>
            <p>{item.extra_address}</p>
          </Styled.UserSectionWrapper>
          <Styled.UserSectionWrapper>
            <h3>
              <strong>Subscription</strong>
            </h3>
            <p>{`구독 중인 상품: ${item.subscription}`}</p>
          </Styled.UserSectionWrapper>
          <Styled.UserSectionWrapper>
            <h3>
              <strong>Survey Result</strong>
            </h3>
            <Styled.SurveyResultUL>
              {this.renderSurveyItems()}
            </Styled.SurveyResultUL>
          </Styled.UserSectionWrapper>
        </Styled.UserDashboardWrapper>
      </Wrapper.ActiveDetailWrapper>
    );
  }
}

ActiveUserDetail.propTypes = {
  item: PropTypes.objectOf(
    PropTypes.oneOfType([PropTypes.string, PropTypes.number]),
  ).isRequired,
  itemsResult: PropTypes.arrayOf(PropTypes.object).isRequired,
};

const mapStateToProps = state => ({
  item: state.user.item,
  itemsResult: state.surveyResult.items,
});

const mapDispatchToProps = dispatch => ({
  getDetail: userId => dispatch(detailUser(userId)),
  getListResult: userId => dispatch(listResult(userId)),
});

export default connect(
  mapStateToProps,
  mapDispatchToProps,
)(ActiveUserDetail);

import _ from 'lodash';
import React from 'react';
import PropTypes from 'prop-types';
import moment from 'moment';
import { connect } from 'react-redux';
import { detailUser } from '../../../reducers/reducer.user';
import { listResult } from '../../../reducers/reducer.surveyResult';
import { listSubscription } from '../../../reducers/reducer.subscription';
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

export const determineProductName = (item) => {
  if (item.months === 0) {
    return 'A book with surprise';
  }

  if (item.months === 12) {
    return `${item.books} books for 1 year`;
  }

  if (item.books === 1) {
    return `${item.books} book for ${item.months} months`;
  }

  return `${item.books} books for ${item.months} months`;
};

class ActiveUserDetail extends React.Component {
  state = {
    userId: 0,
  };

  static getDerivedStateFromProps(nextProps, prevState) {
    if (prevState.userId !== nextProps.match.params.userId) {
      nextProps.getDetail(nextProps.match.params.userId);
      nextProps.getListResult(nextProps.match.params.userId);
      nextProps.getListSub(nextProps.match.params.userId);
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

  renderSubItems() {
    const { subResult } = this.props;
    return _.map(subResult, (item, idx) => (
      <li key={idx}>
        <p>
          <strong>{determineProductName(item.product)}</strong>
          <span>&nbsp;|&nbsp;</span>
          <span>{`start: ${moment(item.create_at).format('YYYY-MM-DD')}`}</span>
        </p>
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
            <Styled.SurveyResultUL>
              {this.renderSubItems()}
            </Styled.SurveyResultUL>
          </Styled.UserSectionWrapper>
          <Styled.UserSectionWrapper>
            <h3>
              <strong>Survey</strong>
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
  subResult: PropTypes.arrayOf(PropTypes.object).isRequired,
};

const mapStateToProps = state => ({
  item: state.user.item,
  itemsResult: state.surveyResult.items,
  subResult: state.subscription.items,
});

const mapDispatchToProps = dispatch => ({
  getDetail: userId => dispatch(detailUser(userId)),
  getListResult: userId => dispatch(listResult(userId)),
  getListSub: userId => dispatch(listSubscription(userId)),
});

export default connect(
  mapStateToProps,
  mapDispatchToProps,
)(ActiveUserDetail);

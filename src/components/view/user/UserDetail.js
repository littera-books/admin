import _ from 'lodash';
import React from 'react';
import PropTypes from 'prop-types';
import moment from 'moment';
import { connect } from 'react-redux';
import { Link } from 'react-router-dom';
import {
  detailUser,
  toggleActive,
  deleteUser,
} from '../../../reducers/reducer.user';
import { listResult } from '../../../reducers/reducer.surveyResult';
import {
  listSubscription,
  deleteSubscription,
} from '../../../reducers/reducer.subscription';
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
  constructor(props) {
    super(props);
    this.state = {
      userId: 0,
    };

    this.onToggleActive = this.onToggleActive.bind(this);
    this.deleteUser = this.deleteUser.bind(this);
    this.deleteSubscription = this.deleteSubscription.bind(this);
  }

  static getDerivedStateFromProps(nextProps, prevState) {
    if (prevState.userId !== nextProps.match.params.userId) {
      nextProps.getDetail(nextProps.match.params.userId);
      nextProps.getListResult(nextProps.match.params.userId);
      nextProps.getListSub(nextProps.match.params.userId);
      return { userId: nextProps.match.params.userId };
    }
    return null;
  }

  async onToggleActive() {
    const { item, toggle } = this.props;
    await toggle(item.id);

    const { error, history } = this.props;
    if (!error) {
      history.replace('/user');
      window.location.reload();
    }
  }

  async deleteUser() {
    const { userId } = this.state;
    const { item, deleteU, history } = this.props;
    const answer = window.confirm(`Are you sure delete user: ${item.email}?`);

    if (answer) {
      await deleteU(userId);
      history.replace('/user');
      window.location.reload();
    }
  }

  async deleteSubscription(e, subItem) {
    const { userId } = this.state;
    const { deleteS, getListSub } = this.props;
    const startedAt = moment.unix(subItem.created_at).format('YYYY-MM-DD');
    const answer = window.confirm(
      `Are you sure delete subscription: ${startedAt}?`,
    );

    if (answer) {
      await deleteS(userId, subItem.id);
      await getListSub(userId);
    }
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
    const { userId } = this.state;
    const { subResult } = this.props;
    return _.map(subResult, (item, idx) => (
      <li key={idx}>
        <Link to={`/user/${userId}/${item.id}`}>
          <strong>{determineProductName(item.product)}</strong>
          <span>&nbsp;|&nbsp;</span>
          <span>{`started at: ${moment
            .unix(item.created_at)
            .format('YYYY-MM-DD')}`}</span>
        </Link>
        <Element.BasicButton onClick={e => this.deleteSubscription(e, item)}>
          <strong style={{ color: 'red' }}>Delete</strong>
        </Element.BasicButton>
      </li>
    ));
  }

  render() {
    const { item } = this.props;
    return (
      <Wrapper.ActiveDetailWrapper>
        <Styled.UserInfo>
          <h2>
            <strong>{item.email}</strong>
          </h2>
          <Styled.UserInfo>
            <span>{`started at: ${moment
              .unix(item.created_at)
              .format('YYYY-MM-DD')}`}</span>
            <span>&nbsp;|&nbsp;</span>
            <Element.BasicButton onClick={this.onToggleActive}>
              {item.is_active ? (
                <span style={{ color: 'green' }}>Active</span>
              ) : (
                <span style={{ color: 'red' }}>Inactive</span>
              )}
            </Element.BasicButton>
          </Styled.UserInfo>
        </Styled.UserInfo>
        <div style={{ margin: '0.5rem 0 0 auto' }}>
          <Element.BasicButton onClick={this.deleteUser}>
            <strong style={{ color: 'red' }}>Delete user</strong>
          </Element.BasicButton>
        </div>
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
    PropTypes.oneOfType([PropTypes.string, PropTypes.number, PropTypes.bool]),
  ).isRequired,
  itemsResult: PropTypes.arrayOf(PropTypes.object).isRequired,
  subResult: PropTypes.arrayOf(PropTypes.object).isRequired,
};

const mapStateToProps = state => ({
  item: state.user.item,
  error: state.user.error,
  itemsResult: state.surveyResult.items,
  subResult: state.subscription.items,
});

const mapDispatchToProps = dispatch => ({
  getDetail: userId => dispatch(detailUser(userId)),
  getListResult: userId => dispatch(listResult(userId)),
  getListSub: userId => dispatch(listSubscription(userId)),
  toggle: userId => dispatch(toggleActive(userId)),
  deleteU: userId => dispatch(deleteUser(userId)),
  deleteS: (userId, subscriptionId) => dispatch(deleteSubscription(userId, subscriptionId)),
});

export default connect(
  mapStateToProps,
  mapDispatchToProps,
)(ActiveUserDetail);

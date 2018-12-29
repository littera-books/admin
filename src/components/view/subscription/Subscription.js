import React from 'react';
import PropTypes from 'prop-types';
import moment from 'moment';
import { connect } from 'react-redux';
import { Link } from 'react-router-dom';
import { detailUser } from '../../../reducers/reducer.user';
import { detailSubscription } from '../../../reducers/reducer.subscription';
import { determineProductName } from '../user/UserDetail';

// Styled
import Wrapper from '../../../styled_base/Wrapper';
import Element from '../../../styled_base/Element';

class Subscription extends React.Component {
  async componentDidMount() {
    const { match, getUser, getDetail } = this.props;
    await getUser(match.params.userId);
    await getDetail(match.params.userId, match.params.subscriptionId);
  }

  render() {
    const { match, userItem, subItem } = this.props;
    return (
      <Wrapper.ActiveDetailWrapper>
        <h2>
          <Link to={`/user/${match.params.userId}`}>
            <strong>{userItem.email}</strong>
          </Link>
          <span>&nbsp;|&nbsp;</span>
          <span>Subscription</span>
        </h2>
        <Element.BasicHr />
        <h2>
          <span>Name:&nbsp;</span>
          <strong>{determineProductName(subItem.product)}</strong>
        </h2>
        <h2>
          <span>Started at:&nbsp;</span>
          <strong>{moment(subItem.create_at).format('YYYY-MM-DD')}</strong>
        </h2>
        <Element.BasicHr />
        <h2>
          <strong>User Info</strong>
        </h2>
        <p>
          <span>Name:&nbsp;</span>
          <strong>{`${subItem.first_name} ${subItem.last_name}`}</strong>
        </p>
        <p>
          <span>Address:&nbsp;</span>
          <strong>{`${subItem.address} ${subItem.extra_address}`}</strong>
        </p>
        <p>
          <span>Phone:&nbsp;</span>
          <strong>{subItem.phone}</strong>
        </p>
        <Element.BasicHr />
        <h2>
          <strong>Book Info</strong>
        </h2>
      </Wrapper.ActiveDetailWrapper>
    );
  }
}

Subscription.propTypes = {
  match: PropTypes.shape({
    params: PropTypes.object.isRequired,
  }).isRequired,
  userItem: PropTypes.objectOf(
    PropTypes.oneOfType([PropTypes.string, PropTypes.number]),
  ).isRequired,
  subItem: PropTypes.objectOf(
    PropTypes.oneOfType([PropTypes.string, PropTypes.number, PropTypes.object]),
  ).isRequired,
};

const mapStateToProps = state => ({
  userItem: state.user.item,
  subItem: state.subscription.item,
});

const mapDispatchToProps = dispatch => ({
  getUser: userId => dispatch(detailUser(userId)),
  getDetail: (userId, subscriptionId) => dispatch(detailSubscription(userId, subscriptionId)),
});

export default connect(
  mapStateToProps,
  mapDispatchToProps,
)(Subscription);

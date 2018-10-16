import _ from 'lodash';
import React from 'react';
import PropTypes from 'prop-types';
import moment from 'moment';
import { Link } from 'react-router-dom';
import { connect } from 'react-redux';
import { detailUser } from '../../../reducers/reducer.user';
import { listLetter } from '../../../reducers/reducer.letter';
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
      nextProps.getListLetter(nextProps.match.params.userId);
      return { userId: nextProps.match.params.userId };
    }
    return null;
  }

  renderLetterItems() {
    const { userId } = this.state;
    const { items } = this.props;
    return _.map(items, (item) => {
      const time = moment.unix(item.created_at).format('YYYY.M.D');

      const rawBody = JSON.parse(item.body);
      const firstLine = rawBody.ops[0].insert;
      const truncatedLine = firstLine.substr(0, 10);
      return (
        <Link to={`/user/${userId}/letter-box/${item.id}`} key={item.id}>
          <span>{time}</span>
          <Styled.TitleSpan>{truncatedLine}</Styled.TitleSpan>
        </Link>
      );
    });
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
          </Styled.UserSectionWrapper>
          <Styled.UserSectionWrapper>
            <h3>
              <strong>Letter Box</strong>
            </h3>
            {this.renderLetterItems()}
            <Link
              style={{
                marginLeft: 'auto',
                marginTop: 'auto',
              }}
              to={`/user/${item.id}/letter-box`}
            >
              더 보기
            </Link>
          </Styled.UserSectionWrapper>
          <Styled.UserSectionWrapper>
            <h3>
              <strong>Subscription</strong>
            </h3>
            <p>{`구독 중인 상품: ${item.subscription}`}</p>
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
  items: PropTypes.arrayOf(PropTypes.object).isRequired,
};

const mapStateToProps = state => ({
  item: state.user.item,
  items: state.letter.items,
});

const mapDispatchToProps = dispatch => ({
  getDetail: userId => dispatch(detailUser(userId)),
  getListLetter: userId => dispatch(listLetter(userId)),
});

export default connect(
  mapStateToProps,
  mapDispatchToProps,
)(ActiveUserDetail);

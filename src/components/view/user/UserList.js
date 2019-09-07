import _ from 'lodash';
import React from 'react';
import PropTypes from 'prop-types';
import { Link } from 'react-router-dom';
import { connect } from 'react-redux';
import { listUser } from '../../../reducers/reducer.user';
import NotiImg from '../../../assets/images/exclamation-circle-solid.svg';

// Styled
import Wrapper from '../../../styled_base/Wrapper';
import Styled from './User.styled';

class UserList extends React.Component {
  componentDidMount() {
    const { getList } = this.props;
    getList();
  }

  renderItems() {
    const { items, matchUrl } = this.props;
    return _.map(items, item => (
      <Styled.UserItem key={item.id}>
        <Link to={`${matchUrl}/${item.id}`}>
          <Styled.UserInfo>
            <Styled.UserInfo>
              {item.log ? (
                <img
                  src={NotiImg}
                  alt="notification"
                  width="16px"
                  height="16px"
                  style={{ opacity: '0.5', marginRight: '0.5rem' }}
                />
              ) : null}
              <span>{item.email}</span>
            </Styled.UserInfo>
            {item.is_active ? (
              <span style={{ color: 'green' }}>Active</span>
            ) : (
              <span style={{ color: 'red' }}>Inactive</span>
            )}
          </Styled.UserInfo>
        </Link>
      </Styled.UserItem>
    ));
  }

  render() {
    const { length } = this.props;
    return (
      <Wrapper.ListWrapper>
        <p>{`가입자 수: ${length}`}</p>
        {this.renderItems()}
      </Wrapper.ListWrapper>
    );
  }
}

UserList.propTypes = {
  matchUrl: PropTypes.string.isRequired,
  items: PropTypes.arrayOf(PropTypes.object).isRequired,
  length: PropTypes.number.isRequired,
  getList: PropTypes.func.isRequired,
};

const mapStateToProps = state => ({
  items: state.user.items,
  length: state.user.length,
});

const mapDispatchToProps = dispatch => ({
  getList: () => dispatch(listUser()),
});

export default connect(
  mapStateToProps,
  mapDispatchToProps,
)(UserList);

import _ from 'lodash';
import React from 'react';
import PropTypes from 'prop-types';
import { Link } from 'react-router-dom';
import { connect } from 'react-redux';
import { listUser } from '../../../reducers/reducer.user';

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
          <p>{item.email}</p>
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

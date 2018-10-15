import _ from 'lodash';
import React from 'react';
import PropTypes from 'prop-types';
import moment from 'moment';
import { Link } from 'react-router-dom';
import { connect } from 'react-redux';
import { listLetter } from '../../reducers/reducer.letter';

// Components
import Helmet from '../helmet/Helmet';

// Stylec
import Wrapper from '../../styled_base/Wrapper';
import Styled from './LetterBox.styled';

class LetterBox extends React.Component {
  state = {
    userId: 0,
  };

  static getDerivedStateFromProps(nextProps, prevState) {
    if (prevState.userId !== nextProps.match.params.userId) {
      nextProps.getListLetter(nextProps.match.params.userId);
      return { userId: nextProps.match.params.userId };
    }
    return null;
  }

  renderItems() {
    const { userId } = this.state;
    const { items } = this.props;
    return _.map(items, (item) => {
      const time = moment.unix(item.created_at).format('YYYY.M.D');

      const rawBody = JSON.parse(item.body);
      const firstLine = rawBody.ops[0].insert;
      const truncatedLine = firstLine.substr(0, 30);
      return (
        <Link to={`/user/${userId}/letter-box/${item.id}`} key={item.id}>
          <span>{time}</span>
          <Styled.TitleSpan>{`${truncatedLine} ...`}</Styled.TitleSpan>
        </Link>
      );
    });
  }

  render() {
    const { length } = this.props;
    return (
      <Wrapper.FlexWrapper>
        <Helmet pageTitle="Letter Box" />
        <Styled.LetterBoxWrapper>
          <Styled.LetterItemWrapper>
            {this.renderItems()}
          </Styled.LetterItemWrapper>
          <Styled.NavigationWrapper>
            <p>Send Letter</p>
            <p>{`You have ${length} letters.`}</p>
          </Styled.NavigationWrapper>
        </Styled.LetterBoxWrapper>
      </Wrapper.FlexWrapper>
    );
  }
}

LetterBox.propTypes = {
  items: PropTypes.arrayOf(PropTypes.object).isRequired,
  length: PropTypes.number.isRequired,
};

const mapStateToProps = state => ({
  items: state.letter.items,
  length: state.letter.length,
});

const mapDispatchToProps = dispatch => ({
  getListLetter: userId => dispatch(listLetter(userId)),
});

export default connect(
  mapStateToProps,
  mapDispatchToProps,
)(LetterBox);

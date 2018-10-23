import _ from 'lodash';
import React from 'react';
import PropTypes from 'prop-types';
import moment from 'moment';
import { Link } from 'react-router-dom';
import { connect } from 'react-redux';
import { getCount, listLetter } from '../../reducers/reducer.letter';

// Components
import Helmet from '../helmet/Helmet';

// Styled
import Wrapper from '../../styled_base/Wrapper';
import Styled from './LetterBox.styled';

class LetterBox extends React.Component {
  state = {
    userId: 0,
  };

  async componentDidMount() {
    const { getC, getListLetter, match } = this.props;
    await this.setState({ userId: match.params.userId });

    const { userId } = this.state;
    await getC(userId);
    await getListLetter(userId, 1);

    const paginationWrapper = document.getElementById('pagination');
    const firstNode = paginationWrapper.childNodes[0];
    firstNode.setAttribute('style', 'font-weight: bold');
  }

  async handleClick(pageNum, e) {
    const clickedButton = e.target;
    const allButtons = clickedButton.parentNode.childNodes;
    _.forEach(allButtons, (button) => {
      button.setAttribute('style', 'font-weight: normal');
    });
    clickedButton.setAttribute('style', 'font-weight: bold');

    const { userId } = this.state;
    const { getListLetter } = this.props;
    await getListLetter(userId, pageNum);
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

  renderPagination() {
    const { count } = this.props;
    const maxPage = Math.ceil(count / 5);

    if (maxPage <= 1) {
      return (
        <Styled.PaginationItem type="button" disabled>
          1
        </Styled.PaginationItem>
      );
    }

    const pageArray = _.map([...Array(maxPage).keys()], i => i + 1);
    return _.map(pageArray, i => (
      <Styled.PaginationItem
        key={i}
        type="button"
        onClick={e => this.handleClick(i, e)}
      >
        {i}
      </Styled.PaginationItem>
    ));
  }

  render() {
    const { userId } = this.state;
    const { count } = this.props;
    return (
      <Wrapper.FlexWrapper>
        <Helmet pageTitle="Letter Box" />
        <Styled.LetterBoxWrapper>
          <Styled.LetterItemWrapper>
            {this.renderItems()}
          </Styled.LetterItemWrapper>
          <Styled.PaginationWrapper id="pagination">
            {this.renderPagination()}
          </Styled.PaginationWrapper>
          <Styled.NavigationWrapper>
            <Link to={`/user/${userId}/letter-box/send`}>Send Letter</Link>
            <p>{`You have ${count} letters.`}</p>
          </Styled.NavigationWrapper>
        </Styled.LetterBoxWrapper>
      </Wrapper.FlexWrapper>
    );
  }
}

LetterBox.propTypes = {
  items: PropTypes.arrayOf(PropTypes.object).isRequired,
  count: PropTypes.number.isRequired,
};

const mapStateToProps = state => ({
  items: state.letter.items,
  count: state.letter.count,
});

const mapDispatchToProps = dispatch => ({
  getC: userId => dispatch(getCount(userId)),
  getListLetter: (userId, pageNum) => dispatch(listLetter(userId, pageNum)),
});

export default connect(
  mapStateToProps,
  mapDispatchToProps,
)(LetterBox);

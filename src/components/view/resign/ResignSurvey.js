import _ from 'lodash';
import React from 'react';
import PropTypes from 'prop-types';
import { Link } from 'react-router-dom';
import { connect } from 'react-redux';
import moment from 'moment';
import {
  countResign,
  listResign,
} from '../../../reducers/reducer.resignSurvey';

// Components
import Helmet from '../../helmet/Helmet';

// Styled
import Wrapper from '../../../styled_base/Wrapper';
import Styled from '../../letter_box/LetterBox.styled';

class ResignSurvey extends React.Component {
  async componentDidMount() {
    const { getCount, getList } = this.props;
    await getCount();
    await getList(1);

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

    const { getList } = this.props;
    await getList(pageNum);
  }

  renderItems() {
    const { items } = this.props;
    return _.map(items, (item) => {
      const time = moment.unix(item.created_at).format('YYYY.M.D');

      const rawBody = JSON.parse(item.content);
      const firstLine = rawBody.ops[0].insert;
      const truncatedLine = firstLine.substr(0, 30);
      return (
        <Link to={`/resign/${item.id}`} key={item.id}>
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
    const { count } = this.props;
    return (
      <Wrapper.FlexWrapper>
        <Helmet pageTitle="Resign Survey" />
        <Styled.LetterBoxWrapper>
          <Styled.LetterItemWrapper>
            {this.renderItems()}
          </Styled.LetterItemWrapper>
          <Styled.PaginationWrapper id="pagination">
            {this.renderPagination()}
          </Styled.PaginationWrapper>
          <p style={{ marginLeft: 'auto' }}>{`You have ${count} letters.`}</p>
        </Styled.LetterBoxWrapper>
      </Wrapper.FlexWrapper>
    );
  }
}

ResignSurvey.propTypes = {
  items: PropTypes.arrayOf(PropTypes.object).isRequired,
  count: PropTypes.number.isRequired,
  getCount: PropTypes.func.isRequired,
  getList: PropTypes.func.isRequired,
};

const mapStateToProps = state => ({
  items: state.resignSurvey.items,
  count: state.resignSurvey.count,
});

const mapDispatchToProps = dispatch => ({
  getCount: () => dispatch(countResign()),
  getList: pageNum => dispatch(listResign(pageNum)),
});

export default connect(
  mapStateToProps,
  mapDispatchToProps,
)(ResignSurvey);

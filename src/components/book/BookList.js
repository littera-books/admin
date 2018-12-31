import _ from 'lodash';
import React from 'react';
import PropTypes from 'prop-types';
import moment from 'moment';
import { connect } from 'react-redux';
import { listBook } from '../../reducers/reducer.book';

// Styled
import Element from '../../styled_base/Element';

class BookList extends React.Component {
  async handleClick(pageNum, e) {
    const clickedButton = e.target;
    const allButtons = clickedButton.parentNode.childNodes;
    _.forEach(allButtons, (button) => {
      button.setAttribute('style', 'font-weight: normal');
    });
    clickedButton.setAttribute('style', 'font-weight: bold');

    const { getList, subscriptionId } = this.props;
    await getList(subscriptionId, pageNum);
  }

  renderPagination() {
    const { length } = this.props;
    const maxPage = Math.ceil(length / 6);

    if (maxPage <= 1) {
      return (
        <Element.BasicButton type="button" disabled>
          1
        </Element.BasicButton>
      );
    }

    const pageArray = _.map([...Array(maxPage).keys()], i => i + 1);
    return _.map(pageArray, i => (
      <Element.BasicButton
        key={i}
        type="button"
        onClick={e => this.handleClick(i, e)}
      >
        {i}
      </Element.BasicButton>
    ));
  }

  renderList() {
    const { items, months } = this.props;
    return _.map(items, item => (
      <li key={item.id}>
        <span>
          {`${item.order}|${months}`}
          &nbsp;
        </span>
        <span>{item.name}</span>
        <span>{moment.unix(item.created_at).format('YYYY-MM-DD')}</span>
      </li>
    ));
  }

  render() {
    return (
      <div>
        <ul>{this.renderList()}</ul>
        <div>{this.renderPagination()}</div>
      </div>
    );
  }
}

BookList.propTypes = {
  length: PropTypes.number.isRequired,
  months: PropTypes.number.isRequired,
  items: PropTypes.arrayOf(PropTypes.object).isRequired,
};

const mapStateToProps = state => ({
  length: state.book.length,
  months: state.book.months,
  items: state.book.items,
});

const mapDispatchToProps = dispatch => ({
  getList: (subscriptionId, pageNum) => dispatch(listBook(subscriptionId, pageNum)),
});

export default connect(
  mapStateToProps,
  mapDispatchToProps,
)(BookList);

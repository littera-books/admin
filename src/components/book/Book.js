import React, { Fragment } from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { listBook } from '../../reducers/reducer.book';

// Styled
import Styled from './Book.styled';

class Book extends React.Component {
  async componentDidMount() {
    const { getList, match } = this.props;
    await getList(match.params.subscriptionId);
  }

  render() {
    const { length, months } = this.props;
    return (
      <Fragment>
        <p>
          <span>You delivered {length} books.</span>
          <span>&nbsp;|&nbsp;</span>
          <span>
            Total months: <strong>{months} months</strong>
          </span>
        </p>
        <Styled.BookWrapper />
      </Fragment>
    );
  }
}

Book.propTypes = {
  length: PropTypes.number.isRequired,
  months: PropTypes.number.isRequired,
};

const mapStateToProps = state => ({
  length: state.book.length,
  months: state.book.months,
  items: state.book.items,
});

const mapDispatchToProps = dispatch => ({
  getList: subscriptionId => dispatch(listBook(subscriptionId)),
});

export default connect(
  mapStateToProps,
  mapDispatchToProps,
)(Book);

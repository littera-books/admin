import React, { Fragment } from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { listBook } from '../../reducers/reducer.book';

// Component
import BookList from './BookList';

// Styled
import Styled from './Book.styled';

class Book extends React.Component {
  async componentDidMount() {
    const { getList, match } = this.props;
    await getList(match.params.subscriptionId, 1);
  }

  render() {
    const { length, months, match } = this.props;
    return (
      <Fragment>
        <p style={{ marginBottom: '1rem' }}>
          <span>You delivered {length} books.</span>
          <span>&nbsp;|&nbsp;</span>
          <span>
            Total months: <strong>{months} months</strong>
          </span>
        </p>
        <Styled.BookWrapper>
          <BookList subscriptionId={match.params.subscriptionId} />
        </Styled.BookWrapper>
      </Fragment>
    );
  }
}

Book.propTypes = {
  match: PropTypes.shape({
    params: PropTypes.object.isRequired,
  }).isRequired,
  length: PropTypes.number.isRequired,
  months: PropTypes.number.isRequired,
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
)(Book);

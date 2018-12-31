import _ from 'lodash';
import React from 'react';
import PropTypes from 'prop-types';
import moment from 'moment';
import { connect } from 'react-redux';
import { reduxForm, Field } from 'redux-form';
import { listBook, createBook } from '../../reducers/reducer.book';

// Components
import BasicFormField from '../../form/FormField';
import Validation from '../../form/Validation';

// Styled
import Wrapper from '../../styled_base/Wrapper';
import Element from '../../styled_base/Element';
import Styled from './Book.styled';

class BookList extends React.Component {
  state = {
    isOpen: false,
  };

  async onSubmit(payload) {
    const { getList, create, subscriptionId } = this.props;
    await create(subscriptionId, payload);

    const { error, initialize } = this.props;
    if (!error) {
      await getList(subscriptionId, 1);
      await initialize();
      this.setState({ isOpen: false });
    }
  }

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
        <span>
          {item.name}
          &nbsp;
        </span>
        <span>{moment.unix(item.created_at).format('YYYY-MM-DD')}</span>
      </li>
    ));
  }

  renderForm() {
    const { handleSubmit, error } = this.props;
    return (
      <form onSubmit={handleSubmit(this.onSubmit.bind(this))}>
        <h3 style={{ marginBottom: '2rem' }}>Create Book</h3>
        <Field
          type="number"
          name="order"
          placeholder="순서"
          component={BasicFormField.PlaceholderFormField}
          validate={[Validation.required, Validation.number]}
        />
        <Field
          type="text"
          name="name"
          placeholder="책 이름"
          component={BasicFormField.PlaceholderFormField}
          validate={Validation.required}
        />
        <div>
          <Element.BasicSmall>{error}</Element.BasicSmall>
        </div>
        <Element.BasicButton type="submit" style={{ marginTop: '2rem' }}>
          Create
        </Element.BasicButton>
      </form>
    );
  }

  render() {
    const { isOpen } = this.state;
    return (
      <Wrapper.BasicFlexWrapper>
        <div style={{ marginRight: '2rem' }}>
          <Wrapper.BetweenWrapper>
            <span>Create</span>
            <Element.BasicButton
              type="button"
              style={{ fontSize: '1rem' }}
              onClick={() => this.setState(state => ({ isOpen: !state.isOpen }))
              }
            >
              +
            </Element.BasicButton>
          </Wrapper.BetweenWrapper>
          <ul style={{ margin: '2rem 0' }}>{this.renderList()}</ul>
          <Styled.PaginationWrapper>
            {this.renderPagination()}
          </Styled.PaginationWrapper>
        </div>
        {isOpen && this.renderForm()}
      </Wrapper.BasicFlexWrapper>
    );
  }
}

BookList.propTypes = {
  length: PropTypes.number.isRequired,
  months: PropTypes.number.isRequired,
  items: PropTypes.arrayOf(PropTypes.object).isRequired,
  handleSubmit: PropTypes.func.isRequired,
  error: PropTypes.string.isRequired,
};

const mapStateToProps = state => ({
  length: state.book.length,
  months: state.book.months,
  items: state.book.items,
  error: state.book.error,
});

const mapDispatchToProps = dispatch => ({
  getList: (subscriptionId, pageNum) => dispatch(listBook(subscriptionId, pageNum)),
  create: (subscriptionId, payload) => dispatch(createBook(subscriptionId, payload)),
});

export default reduxForm({
  form: 'BookCreateForm',
})(
  connect(
    mapStateToProps,
    mapDispatchToProps,
  )(BookList),
);

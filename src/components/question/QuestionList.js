import _ from 'lodash';
import React from 'react';
import PropTypes from 'prop-types';
import { Link } from 'react-router-dom';
import { Field, reduxForm } from 'redux-form';
import { connect } from 'react-redux';
import { listQuestion, createQuestion } from '../../reducers/reducer.question';
import FormField from './FormField';

// Styled
import StyledBase from '../../styled/Base';
import Styled from './Question.styled';

export class QuestionList extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      createQuestionItem: false,
    };

    this.handleClick = this.handleClick.bind(this);
  }

  componentDidMount() {
    const { getList } = this.props;
    getList();
  }

  async onSubmit(payload) {
    const { create } = this.props;
    await create(payload);

    const { error } = this.props;
    if (!error) {
      this.setState(state => ({
        createQuestionItem: !state.createQuestionItem,
      }));
      const { getList } = this.props;
      getList();
    }
  }

  handleClick() {
    this.setState(state => ({
      createQuestionItem: !state.createQuestionItem,
    }));
  }

  createQuestion() {
    const { handleSubmit, error } = this.props;
    return (
      <Styled.QuestionItem>
        <h4>
          <strong>새 질문 만들기</strong>
        </h4>
        <form action="post" onSubmit={handleSubmit(this.onSubmit.bind(this))}>
          <Field
            type="text"
            name="subject"
            label="주제"
            component={FormField}
          />
          <Field type="text" name="title" label="제목" component={FormField} />
          <div>
            <small>{error}</small>
          </div>
          <Styled.QuestionSubmitButton type="submit">
            Create
          </Styled.QuestionSubmitButton>
        </form>
      </Styled.QuestionItem>
    );
  }

  QuestionItem() {
    const { items, matchUrl } = this.props;
    return _.map(items, item => (
      <Link to={`${matchUrl}/${item.subject}`} key={item.id}>
        <Styled.QuestionItem>
          <h4>
            주제: <strong>{item.subject}</strong>
          </h4>
          <p>{`제목: ${item.title}`}</p>
        </Styled.QuestionItem>
      </Link>
    ));
  }

  render() {
    const { createQuestionItem } = this.state;
    const { length } = this.props;

    return (
      <Styled.ListWrapper>
        <Styled.QuestionState>
          <h4>
            질문 갯수: <strong>{length}</strong>
          </h4>
          <StyledBase.BasicButton type="button" onClick={this.handleClick}>
            &nbsp;
            <strong>{createQuestionItem ? '-' : '+'}</strong>
            &nbsp;
          </StyledBase.BasicButton>
        </Styled.QuestionState>
        {createQuestionItem ? this.createQuestion() : null}
        {this.QuestionItem()}
      </Styled.ListWrapper>
    );
  }
}

QuestionList.propTypes = {
  handleSubmit: PropTypes.func.isRequired,
  matchUrl: PropTypes.string.isRequired,
  getList: PropTypes.func.isRequired,
  length: PropTypes.number.isRequired,
  items: PropTypes.arrayOf(PropTypes.object).isRequired,
  error: PropTypes.string.isRequired,
};

export const mapStateToProps = state => ({
  length: state.question.length,
  items: state.question.items,
  error: state.question.error,
});

export const mapDispatchToProps = dispatch => ({
  getList: () => dispatch(listQuestion()),
  create: payload => dispatch(createQuestion(payload)),
});

export default reduxForm({
  form: 'CreateQuestionForm',
})(
  connect(
    mapStateToProps,
    mapDispatchToProps,
  )(QuestionList),
);

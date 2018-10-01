import _ from 'lodash';
import React from 'react';
import PropTypes from 'prop-types';
import { Link } from 'react-router-dom';
import { Field, reduxForm } from 'redux-form';
import { connect } from 'react-redux';
import { listQuestion, createQuestion } from '../../reducers/reducer.question';

// Styled
import Styled from './Question.styled';
import FormField from './FormField';

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
      alert('질문이 생성되었습니다');
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
        <h3>
          <strong>새 질문 만들기</strong>
        </h3>
        <form action="post" onSubmit={handleSubmit(this.onSubmit.bind(this))}>
          <Field
            type="text"
            name="subject"
            label="주제"
            component={FormField}
          />
          <Field type="text" name="title" label="제목" component={FormField} />
          <div>
            <small style={{ color: 'red' }}>{error}</small>
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
          <h3>
            주제: <strong>{item.subject}</strong>
          </h3>
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
          <h2>
            설문 갯수: <strong>{length}</strong>
          </h2>
          <Styled.QuestionCreateButton type="button" onClick={this.handleClick}>
            &nbsp;
            {createQuestionItem ? '-' : '+'}
            &nbsp;
          </Styled.QuestionCreateButton>
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

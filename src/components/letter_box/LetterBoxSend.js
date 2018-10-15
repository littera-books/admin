import React from 'react';
import PropTypes from 'prop-types';
import { reduxForm } from 'redux-form';
import { connect } from 'react-redux';
import Quill from 'quill';
import { sendLetter } from '../../reducers/reducer.letter';

// Components
import Helmet from '../helmet/Helmet';

// Styled
import Wrapper from '../../styled_base/Wrapper';
import Element from '../../styled_base/Element';
import Styled from './LetterBox.styled';
import 'quill/dist/quill.core.css';
import 'quill/dist/quill.bubble.css';

class LetterBoxSend extends React.Component {
  constructor(props) {
    super(props);

    this.state = {
      quill: '',
      required: '',
    };

    this.clearError = this.clearError.bind(this);
  }

  componentDidMount() {
    this.setState({
      quill: new Quill('#editor', {
        theme: 'bubble',
      }),
    });
    window.addEventListener('keydown', this.clearError);
  }

  componentWillUnmount() {
    window.removeEventListener('keydown', this.clearError);
  }

  static getDerivedStateFromProps(prevState, nextProps) {
    if (nextProps.quill !== '') {
      nextProps.quill.focus();
      return null;
    }
    return null;
  }

  async onSubmit() {
    const { quill } = this.state;

    if (quill.getLength() === 1) {
      this.setState({ required: '반드시 내용을 입력하세요' });
    } else {
      const { send, match } = this.props;
      const content = JSON.stringify(quill.getContents());
      const formData = new FormData();

      formData.append('content', content);
      await send(match.params.userId, formData);

      const { error, history } = this.props;
      if (!error) {
        history.replace(`/user/${match.params.userId}/letter-box`);
      }
    }
  }

  clearError() {
    this.setState({ required: '' });
  }

  render() {
    const { required } = this.state;
    const { handleSubmit, history } = this.props;
    return (
      <Wrapper.FlexWrapper>
        <Helmet pageTitle="Send Letter" />
        <Styled.MarginForm
          action="post"
          onSubmit={handleSubmit(this.onSubmit.bind(this))}
        >
          <Wrapper.QuillEditor id="editor" />
          <div>
            <Element.BasicSmall>{required}</Element.BasicSmall>
          </div>
          <Styled.NavigationWrapper>
            <Element.BasicButton type="button" onClick={history.goBack}>
              ←
            </Element.BasicButton>
            <Element.BasicButton type="submit">Send</Element.BasicButton>
          </Styled.NavigationWrapper>
        </Styled.MarginForm>
      </Wrapper.FlexWrapper>
    );
  }
}

LetterBoxSend.propTypes = {
  history: PropTypes.shape({
    replace: PropTypes.func.isRequired,
  }).isRequired,
  match: PropTypes.shape({
    params: PropTypes.shape({
      userId: PropTypes.string.isRequired,
    }).isRequired,
  }).isRequired,
  handleSubmit: PropTypes.func.isRequired,
  send: PropTypes.func.isRequired,
};

const mapStateToProps = state => ({
  error: state.letter.error,
});

const mapDispatchToProps = dispatch => ({
  send: (userId, payload) => dispatch(sendLetter(userId, payload)),
});

export default reduxForm({
  form: 'SendLetterForm',
})(
  connect(
    mapStateToProps,
    mapDispatchToProps,
  )(LetterBoxSend),
);

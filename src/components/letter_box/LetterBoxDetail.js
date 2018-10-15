import React from 'react';
import PropTypes from 'prop-types';
import Quill from 'quill';
import moment from 'moment';
import { Link } from 'react-router-dom';
import { connect } from 'react-redux';
import { detailLetter } from '../../reducers/reducer.letter';

// Components
import Helmet from '../helmet/Helmet';

// Styled
import Wrapper from '../../styled_base/Wrapper';
import Element from '../../styled_base/Element';
import Styled from './LetterBox.styled';

class LetterBoxDetail extends React.Component {
  state = {
    quill: '',
  };

  async componentDidMount() {
    const { getDetail, match } = this.props;

    await getDetail({
      userId: match.params.userId,
      messageId: match.params.id,
    });

    await this.setState({ quill: new Quill('#editor') });
    const { item } = this.props;
    const body = await JSON.parse(item.body);
    const { quill } = this.state;
    await quill.setContents(body);

    document.getElementById('content').innerHTML = quill.root.innerHTML;
  }

  render() {
    const { item, history, match } = this.props;
    const time = moment.unix(item.created_at).format('YYYY.M.D');
    return (
      <Wrapper.FlexWrapper>
        <Helmet pageTitle={time} />
        <Styled.LetterDetailWrapper>
          <p>{time}</p>
          <Styled.Content id="content" />
          <div id="editor" style={{ display: 'none' }} />
          <Styled.NavigationWrapper>
            <Element.BasicButton type="button" onClick={history.goBack}>
              ←
            </Element.BasicButton>
            <Link to={`/user/${match.params.userId}/letter-box/send`}>
              reply
            </Link>
          </Styled.NavigationWrapper>
        </Styled.LetterDetailWrapper>
      </Wrapper.FlexWrapper>
    );
  }
}

LetterBoxDetail.propTypes = {
  item: PropTypes.shape({
    id: PropTypes.number.isRequired,
    body: PropTypes.string.isRequired,
    created_at: PropTypes.number.isRequired,
  }).isRequired,
  history: PropTypes.shape({
    goBack: PropTypes.func.isRequired,
  }).isRequired,
  match: PropTypes.shape({
    params: PropTypes.shape({
      userId: PropTypes.string.isRequired,
    }).isRequired,
  }).isRequired,
  getDetail: PropTypes.func.isRequired,
};

const mapStateToProps = state => ({
  item: state.letter.item,
});

const mapDispatchToProps = dispatch => ({
  getDetail: payload => dispatch(detailLetter(payload)),
});

export default connect(
  mapStateToProps,
  mapDispatchToProps,
)(LetterBoxDetail);

import React from 'react';
import PropTypes from 'prop-types';
import Quill from 'quill';
import moment from 'moment';
import { connect } from 'react-redux';
import { detailResign } from '../../../reducers/reducer.resignSurvey';

// Components
import Helmet from '../../helmet/Helmet';

// Styled
import Wrapper from '../../../styled_base/Wrapper';
import Element from '../../../styled_base/Element';
import Styled from './ResignSurvey.styled';

class ResignSurveyDetail extends React.Component {
  state = {
    quill: '',
  };

  async componentDidMount() {
    const { getDetail, match } = this.props;

    await getDetail(match.params.surveyId);

    await this.setState({ quill: new Quill('#editor') });
    const { item } = this.props;
    const content = await JSON.parse(item.content);
    const { quill } = this.state;
    await quill.setContents(content);

    document.getElementById('content').innerHTML = quill.root.innerHTML;
  }

  render() {
    const { item, history } = this.props;
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
          </Styled.NavigationWrapper>
        </Styled.LetterDetailWrapper>
      </Wrapper.FlexWrapper>
    );
  }
}

ResignSurveyDetail.propTypes = {
  item: PropTypes.shape({
    content: PropTypes.string.isRequired,
    created_at: PropTypes.number.isRequired,
  }).isRequired,
  history: PropTypes.shape({
    goBack: PropTypes.func.isRequired,
  }).isRequired,
  match: PropTypes.shape({
    params: PropTypes.shape({
      surveyId: PropTypes.string.isRequired,
    }).isRequired,
  }).isRequired,
  getDetail: PropTypes.func.isRequired,
};

const mapStateToProps = state => ({
  item: state.resignSurvey.item,
});

const mapDispatchToProps = dispatch => ({
  getDetail: surveyId => dispatch(detailResign(surveyId)),
});

export default connect(
  mapStateToProps,
  mapDispatchToProps,
)(ResignSurveyDetail);

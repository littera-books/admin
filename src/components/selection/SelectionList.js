import _ from 'lodash';
import React from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { listSelection } from '../../reducers/reducer.selection';

// Styled
import Styled from './Selection.styled';

// Assets
import Pencil from '../../assets/images/pencil-alt-solid.svg';

class SelectionList extends React.Component {
  state = {
    subject: '',
  };

  static getDerivedStateFromProps(nextProps, prevState) {
    if (prevState.subject !== nextProps.subject) {
      nextProps.getList(nextProps.subject);
      return { subject: nextProps.subject };
    }
    return null;
  }

  render() {
    const { items } = this.props;
    return _.map(items, item => (
      <div key={item.id}>
        <Styled.UpdateSelectionButton>
          <img src={Pencil} alt="update-selection-button" />
        </Styled.UpdateSelectionButton>
        <span style={{ marginLeft: '0.5rem' }}>{item.select}</span>
      </div>
    ));
  }
}

SelectionList.propTypes = {
  items: PropTypes.arrayOf(PropTypes.object).isRequired,
};

const mapStateToProps = state => ({
  items: state.selection.items,
});

const mapDispatchToProps = dispatch => ({
  getList: subject => dispatch(listSelection(subject)),
});

export default connect(
  mapStateToProps,
  mapDispatchToProps,
)(SelectionList);

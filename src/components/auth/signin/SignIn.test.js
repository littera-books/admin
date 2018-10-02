import React from 'react';
import Enzyme, { shallow } from 'enzyme';
import Adapter from 'enzyme-adapter-react-16';
import { SignIn, mapDispatchToProps } from './SignIn';
import {
  setVisibilityFilter,
  VisibilityFilters,
} from '../../../reducers/reducer.controlHeader';
import { initialState } from '../../../reducers/reducer.auth';

Enzyme.configure({ adapter: new Adapter() });

function setup() {
  const props = {
    init: jest.fn(),
    logIn: jest.fn(),
    handleSubmit: jest.fn(),
    error: initialState.error,
    filter: jest.fn(),
  };

  const enzymeWrapper = shallow(<SignIn {...props} />);

  return {
    props,
    enzymeWrapper,
  };
}

describe('SignIn', () => {
  it('올바로 렌더링되었는가', () => {
    const { enzymeWrapper } = setup();
    expect(enzymeWrapper.find('h3').text()).toBe('Sign In');
  });

  it('기본 filter 값이 hidden인가', () => {
    const { props } = setup();
    expect(props.filter.mock.calls[0][0]).toEqual(
      setVisibilityFilter(VisibilityFilters.HIDE_HEADER).filter,
    );
  });

  it('filter를 호출했을 때 값이 바뀌는가', () => {
    const { props } = setup();
    mapDispatchToProps(props.filter).filter(VisibilityFilters.SHOW_HEADER);
    expect(props.filter.mock.calls[1][0].filter).toEqual(
      setVisibilityFilter(VisibilityFilters.SHOW_HEADER).filter,
    );
    mapDispatchToProps(props.filter).filter(VisibilityFilters.HIDE_HEADER);
    expect(props.filter.mock.calls[2][0].filter).toEqual(
      setVisibilityFilter(VisibilityFilters.HIDE_HEADER).filter,
    );
  });
});

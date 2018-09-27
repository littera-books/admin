import React from 'react';
import Enzyme, { mount } from 'enzyme';
import Adapter from 'enzyme-adapter-react-16';
import { App } from './App';
import { VisibilityFilters } from './reducers/reducer.controlHeader';

Enzyme.configure({ adapter: new Adapter() });

function setup() {
  const props = {
    isVisible: VisibilityFilters.HIDE_TITLE,
  };

  const enzymeWrapper = mount(<App {...props} />);

  return {
    props,
    enzymeWrapper,
  };
}

describe('App', () => {
  it('기본 isVisible Props가 hidden인가', () => {
    const { enzymeWrapper } = setup();
    expect(enzymeWrapper.props().isVisible).toBe('hidden');
  });
});

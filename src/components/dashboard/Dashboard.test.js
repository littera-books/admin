import React from 'react';
import Enzyme, { shallow } from 'enzyme';
import Adapter from 'enzyme-adapter-react-16';
import { Link } from 'react-router-dom';
import Dashboard, { Menu } from './Dashboard';

Enzyme.configure({ adapter: new Adapter() });

function setup() {
  const enzymeWrapper = shallow(<Dashboard />);
  return {
    enzymeWrapper,
  };
}

describe('Dashboard', () => {
  it('올바로 렌더링되었는가', () => {
    const { enzymeWrapper } = setup();
    expect(
      enzymeWrapper
        .find(Menu)
        .dive()
        .find(Link),
    ).toHaveLength(2);
  });
});

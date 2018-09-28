import React from 'react';
import Enzyme, { shallow } from 'enzyme';
import Adapter from 'enzyme-adapter-react-16';
import Survey from './Survey';

Enzyme.configure({ adapter: new Adapter() });

function setup() {
  const enzymeWrapper = shallow(<Survey />);

  return {
    enzymeWrapper,
  };
}

describe('Survey', () => {
  it('올바로 렌더링되었는가', () => {
    const { enzymeWrapper } = setup();
    expect(enzymeWrapper.find('h1').text()).toBe('설문조사 컴포넌트');
  });
});

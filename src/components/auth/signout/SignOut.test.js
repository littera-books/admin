import React from 'react';
import Enzyme, { shallow } from 'enzyme';
import Adapter from 'enzyme-adapter-react-16';
import { SignOut } from './SignOut';

Enzyme.configure({ adapter: new Adapter() });

function setup() {
  const props = {
    logOut: jest.fn(),
  };

  const enzymeWrapper = shallow(<SignOut {...props} />);

  return {
    props,
    enzymeWrapper,
  };
}

describe('SignOut', () => {
  it('올바로 렌더링되었는가', () => {
    const { enzymeWrapper } = setup();
    expect(enzymeWrapper.find('h4').text()).toBe('로그아웃되었습니다.');
  });
});

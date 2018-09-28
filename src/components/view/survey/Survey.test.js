import React from 'react';
import Enzyme, { shallow } from 'enzyme';
import Adapter from 'enzyme-adapter-react-16';
import dataConfig from '../../../dataConfig';
import Survey from './Survey';

Enzyme.configure({ adapter: new Adapter() });

function setup() {
  const props = {
    match: {
      url: '/survey',
    },
  };

  const enzymeWrapper = shallow(<Survey {...props} />);

  return {
    enzymeWrapper,
  };
}

describe('Survey', () => {
  it('올바로 렌더링되었는가', () => {
    const { enzymeWrapper } = setup();
    expect(enzymeWrapper.find('h1').text()).toBe(dataConfig.surveyTitle);
  });
});

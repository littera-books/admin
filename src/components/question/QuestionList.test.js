import React from 'react';
import Enzyme, { shallow } from 'enzyme';
import Adapter from 'enzyme-adapter-react-16';
import { QuestionList } from './QuestionList';
import { initialState } from '../../reducers/reducer.question';

Enzyme.configure({ adapter: new Adapter() });

function setup() {
  const props = {
    handleSubmit: jest.fn(),
    matchUrl: '/survey',
    getList: jest.fn(),
    length: initialState.length,
    items: initialState.items,
    error: initialState.error,
  };

  const enzymeWrapper = shallow(<QuestionList {...props} />);

  return {
    props,
    enzymeWrapper,
  };
}

describe('QuestionList', () => {
  it('올바로 렌더링되었는가', () => {
    const { props, enzymeWrapper } = setup();
    expect(enzymeWrapper.find('h2').text()).toBe(`설문 갯수: ${props.length}`);
  });
});

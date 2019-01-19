import React from 'react';
import { mount, shallow } from 'enzyme';
import { shallowToJson } from 'enzyme-to-json';

import Disclose from '../index';

const disclose = shallow(<Disclose title='Some title'> <div>disclose this</div> </Disclose>);


describe('Disclose Component ', () => {
  it('renders correctly', () => {
    expect(shallowToJson(disclose)).toMatchSnapshot();
  });

  it('should add a hard left class to the link when the noIndent prop is passed', () => {
    const component = mount(<Disclose title='Some title' noIndent={ true }> <div>disclose this</div> </Disclose>);
    expect(component.find('a').hasClass('hard--left')).toBe(true);
  });
});

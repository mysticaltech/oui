import React from 'react';
import Select from '../index';
import { shallow, mount } from 'enzyme';
import { shallowToJson } from 'enzyme-to-json';

describe('components/Select', () => {
  it('should render correctly when declared with no properties', () => {
    const output = shallow(
      <Select>
        <option value="one">This is option one</option>
        <option value="two">And this is option two</option>
      </Select>
    );
    expect(shallowToJson(output)).toMatchSnapshot();
  });

  it('should render correctly when isDisabled prop is declared', () => {
    const output = shallow(
      <Select isDisabled={ true }>
        <option value="one">This is option one</option>
        <option value="two">And this is option two</option>
      </Select>
    );
    expect(shallowToJson(output)).toMatchSnapshot();
  });

  it('should render correctly when a label is supplied', () => {
    const output = shallow(
      <Select isDisabled={ false } label="Test Select">
        <option value="one">This is option one</option>
        <option value="two">And this is option two</option>
      </Select>
    );
    expect(shallowToJson(output)).toMatchSnapshot();
  });

  it('should render correctly when isFullWidth is declared', () => {
    const output = shallow(
      <Select isDisabled={ false } label="Test Select" isFullWidth={ true }>
        <option value="one">This is option one</option>
        <option value="two">And this is option two</option>
      </Select>
    );
    expect(shallowToJson(output)).toMatchSnapshot();
  });

  it('should render correctly when displayError is declared and a note is present', () => {
    const output = shallow(
      <Select
        isDisabled={ false }
        label="Test Select"
        note="This field is required"
        displayError={ true }>
        <option value="one">This is option one</option>
        <option value="two">And this is option two</option>
      </Select>
    );
    expect(shallowToJson(output)).toMatchSnapshot();
  });

  it('should call the onChange function passed in', () => {
    const handler = {
      onChange: event => {},
    };
    spyOn(handler, 'onChange');

    const component = mount(
      <Select onChange={ handler.onChange }>
        <option value="one">This is option one</option>
        <option value="two">And this is option two</option>
      </Select>
    );

    component.simulate('change');

    expect(handler.onChange).toHaveBeenCalled();
  });
});

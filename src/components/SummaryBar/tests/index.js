import React from 'react';
import ExampleComponent from '../index';
import { mount } from 'enzyme';
import { mountToJson } from 'enzyme-to-json';
import Input from '../../Input';
import Button from '../../Button';

describe('components/ExampleComponent', function() {
  let component;
  let fnMock = jest.fn(event => { return event; });

  beforeEach(function() {
    component = mount(
      <ExampleComponent
        aString={ 'aStringValue' }
        aNumber={ 5 }
        aBoolean={ true }
        aFunction={ fnMock }
        anArray={ [ 1, 2, 3 ] }
        anObject={{ initialValue: 'INITIAL_VALUE' }}>
        { ({
          aString,
          aNumber,
          aBoolean,
          aFunction,
          anArray,
          anObject,
          handleInputUpdate,
          name,
        }) => (
          <React.Fragment>
            <Input type="text" onInput={ handleInputUpdate } testSection="nameInput"/>
            <div data-test-section="inputNameValue">{ name }</div>
            <Button style="outline" onClick={ aFunction } testSection="pressMe">Press Me!</Button>
            <div data-test-section="aString">{ String(aString) }</div>
            <div data-test-section="aNumber">{ String(aNumber) }</div>
            <div data-test-section="aBoolean">{ String(aBoolean) }</div>
            <div data-test-section="anArray">{ JSON.stringify(anArray) }</div>
            <div data-test-section="anObject">{ JSON.stringify(anObject) }</div>
          </React.Fragment>
        ) }
      </ExampleComponent>
    );
  });

  it('should update "aStringValue" prop', function() {
    expect(component.find('[data-test-section="aString"]').text()).toBe('aStringValue (with updates)');
  });

  it('should update "aNumber" prop', function() {
    expect(component.find('[data-test-section="aNumber"]').text()).toBe('6');
  });

  it('should update "aBoolean" prop', function() {
    expect(component.find('[data-test-section="aBoolean"]').text()).toBe('false');
  });

  it('should update "anArray" prop', function() {
    expect(component.find('[data-test-section="anArray"]').text()).toBe('[1,2,3,4,5,6]');
  });

  it('should update "anObject" prop', function() {
    expect(component.find('[data-test-section="anObject"]').text()).toBe('{\"initialValue\":\"INITIAL_VALUE\",\"newKey\":true}');
  });

  it('should update ExampleComponent state and return name to children when a user types their name in an input', function() {
    expect(component.state()).toMatchObject({ name: ''});
    component.find('[data-test-section="nameInput"]').simulate('input', { target: { value: 'Johnny' } });
    expect(component.state()).toMatchObject({ name: 'Johnny'});
    expect(component.find('[data-test-section="inputNameValue"]').text()).toBe('Johnny');
  });

  it('should call aFunction with a string argument of "updated" when the Button is pressed', function() {
    component.find('[data-test-section="pressMe"]').simulate('click');
    expect(fnMock.mock.calls[0][0]).toBe('updated');
  });

  it('should match the Jest Snapshot', function() {
    expect(mountToJson(component)).toMatchSnapshot();
  });
});

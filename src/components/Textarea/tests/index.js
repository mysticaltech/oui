import React from 'react';
import Textarea from '../index';
import { shallow, mount } from 'enzyme';

describe('components/Textarea', () => {
  it('should render a `<textarea>` element', () => {
    const component = shallow(<Textarea />);
    expect(component.type()).toBe('textarea');
  });

  it('should add correct OUI classes', () => {
    const component = shallow(<Textarea />);
    expect(component.hasClass('oui-textarea')).toBe(true);
  });

  it('should call the `onChange` event handler when the textarea is changed', () => {
    const handler = {
      onChange: (event) => {},
    };
    spyOn(handler, 'onChange');

    const component = mount(
      <Textarea onChange={ handler.onChange } />
    );

    component.simulate('change');

    expect(handler.onChange).toHaveBeenCalled();
  });

  it('should call the `onFocus` event handler when the textarea gains focus', () => {
    const handler = {
      onFocus: (event) => {},
    };
    spyOn(handler, 'onFocus');

    const component = mount(
      <Textarea onFocus={ handler.onFocus } />
    );

    component.simulate('focus');

    expect(handler.onFocus).toHaveBeenCalled();
  });

  it('should call the `onBlur` event handler when the textarea loses focus', () => {
    const handler = {
      onBlur: (event) => {},
    };
    spyOn(handler, 'onBlur');

    const component = mount(
      <Textarea onBlur={ handler.onBlur } />
    );

    component.simulate('blur');

    expect(handler.onBlur).toHaveBeenCalled();
  });

  it('should call the `onKeyDown` event handler when a key is pressed down', () => {
    const handler = {
      onKeyDown: (event) => {},
    };
    spyOn(handler, 'onKeyDown');

    const component = mount(
      <Textarea onKeyDown={ handler.onKeyDown } />
    );

    component.simulate('keydown');

    expect(handler.onKeyDown).toHaveBeenCalled();
  });

  it('should call the `onInput` event handler when the textarea receives user input', () => {
    const handler = {
      onInput: (event) => { },
    };
    spyOn(handler, 'onInput');

    const component = mount(
      <Textarea onInput={ handler.onInput } />
    );

    component.simulate('input');

    expect(handler.onInput).toHaveBeenCalled();
  });

  it('should blur the textarea when `blur` function is called', () => {
    const component = mount(<Textarea />);

    const instance = component.instance();
    spyOn(instance._textarea, 'blur');

    instance.blur();

    expect(instance._textarea.blur).toHaveBeenCalled();
  });

  it('should have a properly set test section', () => {
    const component = shallow(
      <Textarea testSection="foo" />
    );

    expect(component.is('[data-test-section="foo"]')).toBe(true);
  });

  it('should render a label if label is passed', () => {
    const component = mount(
      <Textarea testSection="foo" label="Input Label" />
    );

    expect(component.find('[data-test-section="foo-label"]').length).toBe(1);
  });

  it('should render a label with optional text if label and isOptional is passed', () => {
    const component = mount(
      <Textarea testSection="foo" label="Input Label" isOptional={ true } />
    );

    expect(component.text()).toBe('Input Label(Optional)');
  });

  it('should throw an error if isOptional is passed without a label', () => {
    spyOn(console, 'error').and.stub();

    shallow(
      <Textarea testSection="foo" isOptional={ true } />
    );

    expect(console.error.calls.all()[0].args[0]).toContain('Must include a value for the label prop to use the isOptional prop'); // eslint-disable-line
  });

  it('should render a label with required mark if label and isRequired is passed', () => {
    const component = mount(
      <Textarea testSection="foo" label="Input Label" isRequired={ true } />
    );
    expect(component.find('.oui-label--required').length).toBe(1);
  });

  it('should not render a label by default', () => {
    const component = mount(
      <Textarea testSection="foo" />
    );

    expect(component.find('[data-test-section="foo-label"]').length).toBe(0);
  });

  it('should render a note if passed', () => {
    const component = mount(
      <Textarea testSection="foo" note="A short description" />
    );

    expect(component.find('[data-test-section="foo-note"]').length).toBe(1);
    expect(component.find('[data-test-section="foo-note"]').text()).toBe('A short description');
  });

  it('should add a numRows attribute when numRows is passed', () => {
    const component = mount(
      <Textarea numRows={ 10 } />
    );
    expect(component.find('textarea').prop('rows')).toBe(10);
  });

  it('should add a maxLength attribute when maxLength is passed', () => {
    const component = mount(
      <Textarea maxLength={ 50 } />
    );
    expect(component.find('textarea').prop('maxLength')).toBe(50);
  });
});

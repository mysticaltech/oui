import React from 'react';
import Button from '../index';
import { mount } from 'enzyme';

describe('components/Loading Button', () => {

  it('should not disable the button if isLoading is false', () => {
    const component = mount(
      <Button isLoading={ false } >Create Campaign</Button>
    );
    expect(component.getDOMNode().attributes.getNamedItem('disabled')).toBe(null);
  });

  it('should disable the button if isLoading is true', () => {
    const component = mount(
      <Button isLoading={ true } >Create Campaign</Button>
    );
    expect(component.getDOMNode().attributes.getNamedItem('disabled').value).not.toBe(null);
  });

  it('should add a loading spinner', () => {
    const component = mount(
      <Button isLoading={ true } >Create Campaign</Button>
    );
    expect(component.find('.oui-button--loading').exists()).toBe(true);
    expect(component.find('.oui-spinner').exists()).toBe(true);
  });

  it('should change the button text to Processing if loadingText is not passed', () => {
    const component = mount(
      <Button isLoading={ true } >Create Campaign</Button>
    );
    expect(component.find('button').text()).toBe('Processing');

  });

  it('should change the button text to the loadingText passed in', () => {
    let loadingText = 'Creating Campaign';
    const component = mount(
      <Button isLoading={ true } loadingText={ loadingText } >Create Campaign</Button>
    );
    expect(component.find('button').text()).toBe(loadingText);
  });

  it('should add an `aria-live` polite value', () => {
    const component = mount(
      <Button isLoading={ true } >Create Campaign</Button>
    );
    expect(component.find('[aria-live="polite"]').exists()).toBe(true);
  });
});

describe('components/Button', () => {

  it('should render a `button` HTML element', () => {
    const component = mount(<Button>Hello!</Button>);
    expect(component.find('button').exists()).toBe(true);
  });

  it('should render contents that are passed in', () => {
    const component = mount(<Button>Hello!</Button>);
    expect(component.text()).toBe('Hello!');
  });

  it('should call function that is passed in as `onClick` after click', () => {
    const onClickSpy = jest.fn();

    const component = mount(
      <Button onClick={ onClickSpy }>Hello!</Button>
    );

    component.simulate('click');

    expect(onClickSpy).toHaveBeenCalled();
  });

  it('should call function that is passed in as `onBlur` after losing focus', () => {
    const onBlurSpy = jest.fn();

    const component = mount(
      <Button onBlur={ onBlurSpy }>Hello!</Button>
    );

    component.simulate('blur');

    expect(onBlurSpy).toHaveBeenCalled();
  });

  it('should call function that is passed in as `onMouseDown` after mousedown', () => {
    const onMouseDownSpy = jest.fn();

    const component = mount(
      <Button onMouseDown={ onMouseDownSpy }>Hello!</Button>
    );

    component.simulate('mousedown');

    expect(onMouseDownSpy).toHaveBeenCalled();
  });

  it('should add an `aria-label` when provided', () => {
    const component = mount(
      <Button ariaLabel="a11y">Hello!</Button>
    );

    expect(component.find('[aria-label="a11y"]').exists()).toBe(true);
  });

  it('should add a title when provided', () => {
    const component = mount(
      <Button title="a11y">Hello!</Button>
    );

    expect(component.find('[title="a11y"]').exists()).toBe(true);
  });

  it('should add the active class if `isActive` is true', () => {
    const component = mount(
      <Button isActive={ true }>Hello!</Button>
    );
    expect(component.find('button').hasClass('is-active')).toBe(true);
  });

  it('should add the disabled attribute if `isDisabled` is true', () => {
    const component = mount(
      <Button isDisabled={ true }>Hello!</Button>
    );
    expect(component.getDOMNode().attributes.getNamedItem('disabled').value).not.toBe(null);
  });

  it('should be of type `button` when `isSubmit` is false', () => {
    const component = mount(
      <Button isSubmit={ false }>Hello!</Button>
    );
    expect(component.getDOMNode().attributes.getNamedItem('type').value).toBe('button');
  });

  it('should be of type `button` when `isSubmit` is not provided', () => {
    const component = mount(<Button>Hello!</Button>);
    expect(component.getDOMNode().attributes.getNamedItem('type').value).toBe('button');
  });

  it('should be of type `submit` when `isSubmit` is true', () => {
    const component = mount(
      <Button isSubmit={ true }>Hello!</Button>
    );
    expect(component.getDOMNode().attributes.getNamedItem('type').value).toBe('submit');
  });

  it('should have a properly set size class if `size` is provided', () => {
    const component = mount(
      <Button size="tiny">Hello!</Button>
    );

    expect(component.find('button').hasClass('oui-button--tiny')).toBe(true);
  });

  it('should have a properly set style class if `style` is provided', () => {
    const component = mount(
      <Button style="outline">Hello!</Button>
    );

    expect(component.find('button').hasClass('oui-button--outline')).toBe(true);
  });

  it('should have a properly set test section', () => {
    const component = mount(
      <Button testSection="foo">Hello!</Button>
    );
    expect(component.find('[data-test-section="foo"]').exists()).toBe(true);
  });

  it('should have a properly set width class if `width` is provided', () => {
    const component = mount(
      <Button width="full">Hello!</Button>
    );

    expect(component.find('button').hasClass('oui-button--full')).toBe(true);
  });

  it('should render as a div if isLink is true', () => {
    const component = mount(
      <Button isLink={ true } testSection="test-button">Faux Button</Button>
    );
    expect(component.find('button').exists()).toBe(false);
    const testComponent = component.find('[data-test-section="test-button"]');
    expect(testComponent.type()).toEqual('div');
  });
});

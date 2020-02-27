import React from 'react';
import ButtonIcon from '../index';
import { mount } from 'enzyme';

import { FILL_COLOR_MAP } from '../../../utils/accessibility';

describe('ButtonIcon component', () => {

  it('should render a medium size icon by default', () => {
    const component = mount(
      <ButtonIcon iconName="add"/>
    );
    expect(component.find('.oui-button-icon__medium').length).toBe(1);
    expect(component.find('.oui-icon').length).toBe(1);
  });
  it('should change size when prop is passed', () => {
    const component = mount(
      <ButtonIcon iconName="add" size="large"/>
    );
    expect(component.find('.oui-button-icon__large').length).toBe(1);
  });
  it('should set the title on the button when title is passed', () => {
    const component = mount(
      <ButtonIcon iconName="add" title="add row"/>
    );
    expect(component.getDOMNode().attributes.getNamedItem('title').value).toBe('add row');
  });
  it('should disable the button if isDisabled is true', () => {
    const component = mount(
      <ButtonIcon iconName="add" isDisabled={ true }/>
    );
    expect(component.getDOMNode().attributes.getNamedItem('disabled').value).not.toBe(null);
  });
  it('should add a style when style prop is passed', () => {
    const component = mount(
      <ButtonIcon iconName="add" style="danger"/>
    );
    expect(component.find('.oui-button--danger').length).toBe(1);
  });
  it('should fill the icon when iconFill is supplied', () => {
    const component = mount(
      <ButtonIcon iconName="add" iconFill="red"/>
    );
    expect(
      component
        .find('.oui-icon')
        .getDOMNode().attributes
        .getNamedItem('style').value
    ).toContain(`fill: ${FILL_COLOR_MAP['red']}`
    );
  });
  it('should call function that is passed in as `onClick` after click', () => {
    const onClickSpy = jest.fn();
    const component = mount(
      <ButtonIcon onClick={ onClickSpy } iconName="add"/>
    );
    component.simulate('click');
    expect(onClickSpy).toHaveBeenCalled();
  });
  it('should not call the onClick function if button isDisabled', () => {
    const onClickSpy = jest.fn();
    const component = mount(
      <ButtonIcon iconName="add" isDisabled={ true } onClick={ onClickSpy }/>
    );
    component.simulate('click');
    expect(onClickSpy).not.toHaveBeenCalled();
  });
});

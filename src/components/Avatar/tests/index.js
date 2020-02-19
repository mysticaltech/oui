import React from 'react';
import Avatar from '../index';
import { mount, render } from 'enzyme';

describe('components/Avatar', () => {

  it('should render default when no imageUrl is passed', () => {
    const component = mount(
      <Avatar />
    );
    expect(component.find('.oui-avatar').length).toBe(1);
  });

  it('should render an image when imageUrl is specified', () => {
    const imageUrl = 'https://parkseed.com/images/xxl/52081-pk-p1.jpg';
    const component = render(
      <Avatar imageUrl={ imageUrl }/>
    );
    let containerStyle = component.find('.oui-avatar').prop('style');
    expect(containerStyle).toHaveProperty('background-image', `url(${imageUrl})`);
  });

  it('should render small size when size is passed', () => {
    const component = mount(
      <Avatar size="small"/>
    );
    expect(component.find('.oui-avatar--small').length).toBe(1);
  });

  it('should render emulating border when isEmulating is true', () => {
    const component = mount(
      <Avatar size="small" isEmulating={ true }/>
    );
    expect(component.find('.color-admin--border').length).toBe(1);
  });

});

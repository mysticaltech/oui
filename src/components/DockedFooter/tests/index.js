import React from 'react';
import Button from '../../Button';
import DockedFooter from '../index';
import { mount } from 'enzyme';

describe('components/DockedFooter ', () => {
  describe('with Buttons as children supplied', () => {

    beforeEach(() => {
      const div = document.createElement('div');
      window.domNode = div;
      document.body.appendChild(div);
    });

    function componentFooter() {
      return (
        <DockedFooter
          scrollRef={ 'scroll-ref' }
          testSection={ 'test-footer' }
          includesMargin={ true }
          rightGroup={ [
            <Button style="plain" key={ 0 }>
              Cancel
            </Button>,
            <Button style="highlight" key={ 1 }>
              Confirm
            </Button>,
          ] }></DockedFooter>
      );
    }

    it('should render DockedFooter with testSection and parentTestSection', () => {
      const component = mount(componentFooter(), { attachTo: window.domNode }
      );
      expect(component.find('.oui-docked-footer').length).toBeGreaterThanOrEqual(1);
      expect(
        component.find('[data-test-section="test-footer"]')
          .length
      ).toBeGreaterThanOrEqual(1);
      expect(
        component.find('[scrollRef="scroll-ref"]').length
      ).toBeGreaterThanOrEqual(1);
    });

    it('should not dock when isDocked is false', () => {
      const component = mount(componentFooter());
      component.setState({ isDocked: false });
      expect(component.find('.oui-docked-footer--is-docked').length).toBeGreaterThanOrEqual(0);
    });

    it('should dock when isDocked is true', () => {
      const component = mount(componentFooter());
      component.setState({ isDocked: true });
      expect(component.find('.oui-docked-footer--is-docked').length).toBeGreaterThanOrEqual(1);
    });

    it('should add margin styles when includesMargin is true', () => {
      const component = mount(componentFooter());
      component.setProps({ includesMargin: true });
      expect(component.find('.push-double--top').length).toBeGreaterThanOrEqual(1);
    });

    it('should call onScroll method', () => {
      const div = document.createElement('div');
      window.domNode = div;
      document.body.appendChild(div);
      const component = mount(
        componentFooter(), { attachTo: window.domNode }
      );
      const instance = component.instance();
      jest.spyOn(instance, 'setAtBottom');
      expect(instance.setAtBottom).not.toHaveBeenCalled();
      instance.setAtBottom();
      expect(instance.setAtBottom).toHaveBeenCalled();
    });
  });
});

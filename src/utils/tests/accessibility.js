import React, { useEffect } from 'react';
import { mount } from 'enzyme';

import { getAssistiveTextFromColorClass, keyboardTracker } from '../accessibility';

const InputListComponent = keyboardTracker(props => {
  const { handleKeyDown, currentFauxFocusIndex, setItemCount } = props;

  useEffect(() => {
    setItemCount(3);
  }, []);

  return (
    <div>
      <input onKeyDown={ handleKeyDown }/>
      <ul>
        {
          [1, 2, 3].map((item, idx) => (
            <li className={ currentFauxFocusIndex === idx ? 'selected' : '' } key={ idx }>
              Item {item}
            </li>
          ))
        }
      </ul>
    </div>
  );
});

describe('utils/accessibility', () => {
  describe('#getAssistiveTextFromColorClass', () => {
    it('should throw error if non-existent class is provided', () => {
      expect(() => { getAssistiveTextFromColorClass('foo-bar'); }).toThrow();
    });

    it('should return a word if a correct color class is provided', () => {
      expect(getAssistiveTextFromColorClass('good-news')).toBe('Success');
    });
  });

  describe('#keyboardTracker', () => {
    let component;
    beforeEach(function() {
      component = mount(<InputListComponent />);
    });

    it('should default to index 0', () => {
      const selected = component.find('li.selected');
      expect(selected).toHaveLength(1);
      expect(selected.at(0).text()).toBe('Item 1');
    });

    it('should track ArrowDown and ArrowUp keys', () => {
      component.find('input').simulate('keydown', { key: 'ArrowDown'});
      const selected = component.find('li.selected');
      expect(selected).toHaveLength(1);
      expect(selected.at(0).text()).toBe('Item 2');
    });

    it('should limit key tracking to the size of the list', () => {
      // Simulate arrow key'ing all the way down, then all the way back up
      const selected = component.find.bind(component, 'li.selected');
      expect(selected().first().text()).toBe('Item 1');
      component.find('input').simulate('keydown', { key: 'ArrowDown'});
      expect(selected().first().text()).toBe('Item 2');
      component.find('input').simulate('keydown', { key: 'ArrowDown'});
      expect(selected().first().text()).toBe('Item 3');
      component.find('input').simulate('keydown', { key: 'ArrowDown'});
      component.find('input').simulate('keydown', { key: 'ArrowDown'});
      component.find('input').simulate('keydown', { key: 'ArrowDown'});
      expect(selected().first().text()).toBe('Item 3');
      component.find('input').simulate('keydown', { key: 'ArrowUp'});
      expect(selected().first().text()).toBe('Item 2');
      component.find('input').simulate('keydown', { key: 'ArrowUp'});
      expect(selected().first().text()).toBe('Item 1');
      component.find('input').simulate('keydown', { key: 'ArrowUp'});
      component.find('input').simulate('keydown', { key: 'ArrowUp'});
      component.find('input').simulate('keydown', { key: 'ArrowUp'});
      expect(selected().first().text()).toBe('Item 1');
    });
  });
});

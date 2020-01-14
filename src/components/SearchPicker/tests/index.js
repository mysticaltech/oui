import React from 'react';
import { mount } from 'enzyme';
import { mountToJson } from 'enzyme-to-json';

import { getSearchFunction } from '../mock_api';
import SearchPicker from '../';

const MOCK_API_DELAY = 10;

const searchFunction = getSearchFunction(MOCK_API_DELAY);

const getDelayedPromise = (delay = 0) => new Promise(r => setTimeout(r, delay));


describe('components/SearchPicker', () => {
  let component;
  let renderedData;
  let onItemSelectedStub;

  describe('default case', () => {
    beforeEach(() => {
      onItemSelectedStub = jest.fn();
      component = mount(
        <SearchPicker
          onItemSelected={ onItemSelectedStub }
          searchFunction={ searchFunction }
          supportedTypes={ ['feature'] }>
          {(data) => {
            renderedData = data;
            return (
              <div>
                {data.renderInput()}
                <p>A list of entities</p>
              </div>
            );
          }}
        </SearchPicker>
      );
    });

    it('should render component same as snapshot', () => {
      expect(mountToJson(component)).toMatchSnapshot();
    });

    it('should pass a default list of items on creation', () => {
      return getDelayedPromise().then(() => {
        component.find('input').simulate('click');
      })
        .then(() => getDelayedPromise(MOCK_API_DELAY))
        .then(() => {
          component.update();
          expect(renderedData.availableEntities).toHaveLength(5);
        });
    });

    it('should update the list when a search term is entered', () => {
      return getDelayedPromise().then(() => {
        component.find('input').simulate('mouseenter');
        component.find('input').simulate('click');
        component.find('input').simulate('input', { target: { value: '123' }});
      })
        // Account for our mock API delay and the debounce delay
        .then(() => getDelayedPromise(MOCK_API_DELAY + 10))
        .then(() => {
          component.update();
          expect(renderedData.availableEntities).toHaveLength(1);
          expect(renderedData.availableEntities[0].name).toContain('My feature 123');
        });
    });

    it('should pass isLoading and the searchQuery correctly', () => {
      expect(renderedData.isLoading).toBe(true);
      return getDelayedPromise(MOCK_API_DELAY).then(() => {
        expect(renderedData.searchQuery).toBe('');
        expect(renderedData.isLoading).toBe(false);
        component.find('input').simulate('mouseenter');
        component.find('input').simulate('click');
        component.find('input').simulate('input', { target: { value: '123' }});
      })
        // Wait for debounce
        .then(() => getDelayedPromise(10))
        .then(() => {
          expect(renderedData.searchQuery).toBe('123');
          expect(renderedData.isLoading).toBe(true);
        })
        // Account for our mock API delay and the debounce delay
        .then(() => getDelayedPromise(MOCK_API_DELAY + 10))
        .then(() => {
          component.update();
          expect(renderedData.isLoading).toBe(false);
        });
    });
  });
});

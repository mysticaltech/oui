import React from 'react';
import { mount } from 'enzyme';


import Dropdown from '../../Dropdown';
import SelectDropdown from '../index';

describe('components/SelectDropdown', function() {
  let component;
  let onChange;
  const items = [
    {
      label: 'label 1',
      value: 'value 1',
      description: 'description 1',
    },
    {
      label: 'label 2',
      value: 'value 2',
      description: 'description 2',
    },
  ];

  const multiSelectItems = [
    {
      label: 'label 1',
      value: 'value 1',
      description: 'description 1',
    },
    {
      label: 'label 2',
      value: 'value 2',
      description: 'description 2',
      isSelected: true,
    },
  ];

  beforeEach(function() {
    onChange = jest.fn();
  });

  it('should render all items in dropdown', function() {
    component = mount(<SelectDropdown items={ items } value={ 'value 2' } onChange={ onChange } />);
    const activator = component.find('Button');
    activator.simulate('click');
    const listItems = component.find(Dropdown.ListItem);
    expect(listItems).toHaveLength(2);

    const item1 = listItems.at(0);
    expect(item1.text()).toContain('label 1');
    expect(item1.text()).toContain('description 1');
    expect(item1.find(Dropdown.BlockLink).props().isLink).toEqual(true);

    const item2 = listItems.at(1);
    expect(item2.text()).toContain('label 2');
    expect(item2.text()).toContain('description 2');
    expect(item2.find(Dropdown.BlockLink).props().isLink).toEqual(false);
  });

  it('should call onChange when another item is selected', function() {
    component = mount(<SelectDropdown items={ items } value={ 'value 2' } onChange={ onChange } />);
    const activator = component.find('Button');
    activator.simulate('click');
    const listItems = component.find('DropdownBlockLink');
    const item1 = listItems.at(0).find('[data-test-section="dropdown-block-link-value 1"]');
    item1.simulate('click');
    expect(onChange).toHaveBeenCalled();
    expect(onChange).toHaveBeenCalledWith('value 1');
  });

  it('should set the width of the activator', function() {
    component = mount(
      <SelectDropdown
        items={ items }
        value={ 'value 2' }
        onChange={ onChange }
        width="400px"
      />);
    expect(component.find('Dropdown').find('div.oui-dropdown-group__activator').props().style).toEqual({
      width: '400px',
    });
  });

  it('should pass fullWidth prop to Dropdown', function() {
    component = mount(
      <SelectDropdown
        items={ items }
        value={ 'value 2' }
        onChange={ onChange }
        fullWidth={ true }
      />);
    expect(component.find('Dropdown').prop('fullWidth')).toEqual(true);
  });

  it('should set the maxWidth of the activator', function() {
    component = mount(
      <SelectDropdown
        items={ items }
        value={ 'value 2' }
        onChange={ onChange }
        maxWidth="100px"
      />);
    expect(
      component.find('Dropdown').find('div.oui-dropdown-group__activator').props().style
    ).toEqual({maxWidth: '100px', width: '100%'});
  });

  it('should contain error class', function() {
    component = mount(
      <SelectDropdown
        items={ items }
        value={ 'value 2' }
        onChange={ onChange }
        displayError={ true }
      />);
    expect(component.find('.oui-form-bad-news').length).toBe(1);
  });

  it('should set the width of the content', function() {
    component = mount(
      <SelectDropdown
        items={ items }
        value={ 'value 2' }
        onChange={ onChange }
        minDropdownWidth="400px"
      />);
    const activator = component.find('Button');
    activator.simulate('click');
    expect(component.find('DropdownContents').prop('minWidth')).toEqual('400px');
  });

  it('should not render DropdownContents when isDisabled is true', function() {
    component = mount(
      <SelectDropdown
        items={ items }
        isDisabled={ true }
        value={ 'value 2' }
        onChange={ onChange }
      />);
    const activator = component.find('Button');
    activator.simulate('click');
    expect(component.find('Dropdown').prop('isDisabled')).toEqual(true);
    expect(component.find('DropdownContents').length).toEqual(0);
  });

  it('should display activatorLabel if provided', function() {
    const itemsWithActivatorLabel = [
      {
        activatorLabel: 'Production',
        label: 'Production (50%)',
        value: 'Production',
      },
      {
        activatorLabel: 'Staging',
        label: 'Staging (100%)',
        value: 'Staging',
      },
    ];
    component = mount(
      <SelectDropdown
        items={ itemsWithActivatorLabel }
        value='Production'
        onChange={ onChange }
      />);
    const activator = component.find('Button');
    expect(activator.text()).toBe('Production');
  });

  it('should display initialPlaceholder if provided', function() {
    component = mount(
      <SelectDropdown
        items={ items }
        initialPlaceholder="Select a value..."
        onChange={ onChange }
      />);
    const activator = component.find('Button');
    expect(activator.text()).toBe('Select a value...');
  });

  it('should display items with checkboxes if isMultiSelect is true', function() {
    component = mount(
      <SelectDropdown
        isMultiSelect={ true }
        items={ items }
        initialPlaceholder="Select a value..."
        onChange={ onChange }
      />);
    const activator = component.find('Button');
    activator.simulate('click');

    expect(component.find('input[type="checkbox"]').length).toBe(2);
  });

  it('should display items with checked checkboxes if item\'s isSelected is true', function() {
    component = mount(
      <SelectDropdown
        isMultiSelect={ true }
        items={ multiSelectItems }
        initialPlaceholder="Select a value..."
        onChange={ onChange }
      />);
    const activator = component.find('Button');
    activator.simulate('click');
    expect(component.find('Checkbox').length).toBe(2);
    expect(component.find('Checkbox').last().prop('defaultChecked')).toBe(true);
  });
  describe('links', function() {
    describe('if linkURL and linkText are provided', function() {
      beforeEach(function() {
        component = mount(
          <SelectDropdown
            isMultiSelect={ true }
            items={ [{label: 'label0', value: 'value0', description: 'description0', linkURL: '#', linkText: 'some link'}].concat(items) }
            initialPlaceholder="Select a value..."
            onChange={ onChange }
          />);
        const activator = component.find('Button');
        activator.simulate('click');
      });

      it('should display text and link', function() {
        expect(component.find('DropdownListItem').at(0).find('Link').length).toBe(1);
        expect(component.find('DropdownListItem').at(0).find('Link').text()).toBe('some link');
        expect(component.find('DropdownListItem').at(0).find('Link').props().href).toBe('#');
      });

      it('should not close the dropdown if clicked', function() {
        const link = component.find('DropdownListItem').at(0).find('Link');
        link.simulate('click'); // clicking on the link shouldn't close the dropdown
        // this signals that the dropdown contents box doesn't close even when the link is clicked on
        const dropdownContents = component.find('DropdownContents');
        expect(dropdownContents.length).toBe(1);
      });
    });

    describe('if linkURL is not provided', function() {
      it('should not display text and link', function() {
        component = mount(
          <SelectDropdown
            isMultiSelect={ true }
            items={ [{label: 'label0', value: 'value0', description: 'description0', linkURL: '#'}].concat(items) }
            initialPlaceholder="Select a value..."
            onChange={ onChange }
          />);
        const activator = component.find('Button');
        activator.simulate('click');
        expect(component.find('DropdownListItem').at(0).find('Link').length).toBe(0);
      });
    });

    describe('if linkText is not provided', function() {
      it('should not display text and link', function() {
        component = mount(
          <SelectDropdown
            isMultiSelect={ true }
            items={ [{label: 'label0', value: 'value0', description: 'description0', linkText: 'some link'}].concat(items) }
            initialPlaceholder="Select a value..."
            onChange={ onChange }
          />);
        const activator = component.find('Button');
        activator.simulate('click');
        expect(component.find('DropdownListItem').at(0).find('Link').length).toBe(0);
      });
    });
  });
});

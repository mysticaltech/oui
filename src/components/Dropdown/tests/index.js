import React from 'react';
import Dropdown from '../index';
import { mount, shallow } from 'enzyme';
import { mountToJson, shallowToJson } from 'enzyme-to-json';

const data = [
  { title: 'Manual', description: 'Dolcelatte cheeseburger swiss paneer cow gouda edam cheese slices' },
  {
    title: 'Maximize Conventions',
    header: 'Automation',
    description: 'Everyone loves cut the cheese cow squirty cheese emmental jarlsberg halloumi camembert de normandie.',
  },
  { title: 'Faster Results', description: 'Cauliflower cheese stilton paneer hard cheese fondue.' },
];

describe('components/Dropdown', () => {
  it('should render children when isOpen is true', () => {
    const component = mount(
      <Dropdown icon={ true } isOpen={ true } buttonContent="Dropdown">
        <ul>
          {data.map((item, index) => {
            return <li key={ index }>{item.title}</li>;
          })}
        </ul>
      </Dropdown>
    );

    expect(component.find('Dropdown').props().isOpen).toBe(true);
    expect(component.find('ul').exists()).toBe(true);
    expect(component.find('Popper').exists()).toBe(true);
  });

  it('should not render children or Popper when isDisabled is true', () => {
    const component = mount(
      <Dropdown icon={ true } buttonContent="Dropdown" idDisabled={ true }>
        <ul>
          {data.map((item, index) => {
            return <li key={ index }>{item.title}</li>;
          })}
        </ul>
      </Dropdown>
    );
    expect(mountToJson(component)).toMatchSnapshot();
    expect(component.find('Popper').exists()).toBe(false);
  });

  it('should call the child onClick handler when clicked', () => {
    const onClickMock = jest.fn();
    const component = shallow(
      <Dropdown icon={ true } buttonContent="Dropdown" idDisabled={ true }>
        <ul>
          {data.map((item, index) => {
            return (
              <li key={ index } onClick={ onClickMock } data-test-section={ `dropdown-item-${index}` }>
                {item.title}
              </li>
            );
          })}
        </ul>
      </Dropdown>
    );

    component.find('[data-test-section="dropdown-item-1"]').simulate('click');
    expect(onClickMock.mock.calls.length).toBe(1);
  });

  it('should not use .oui-arrow-inline--down when icon isEqual to triangle', () => {
    const component = shallow(
      <Dropdown icon={ true } buttonContent="Dropdown">
        <ul>
          {data.map((item, index) => {
            return <li key={ index }>{item.title}</li>;
          })}
        </ul>
      </Dropdown>
    );
    expect(shallowToJson(component)).toMatchSnapshot();
  });

  it('should use oui-button--full class when fullWidth is true', () => {
    const component = shallow(
      <Dropdown icon={ true } buttonContent="Dropdown" fullWidth={ true }>
        <ul>
          {data.map((item, index) => {
            return <li key={ index }>{item.title}</li>;
          })}
        </ul>
      </Dropdown>
    );
    expect(shallowToJson(component)).toMatchSnapshot();
  });

  it('should highlight button class when style equals highlight', () => {
    const component = shallow(
      <Dropdown icon={ true } buttonContent="Dropdown" style="highlight">
        <ul>
          {data.map((item, index) => {
            return <li key={ index }>{item.title}</li>;
          })}
        </ul>
      </Dropdown>
    );
    expect(shallowToJson(component)).toMatchSnapshot();
  });

  it('should include oui-form-bad-news class when display error is true', () => {
    const component = shallow(<Dropdown buttonContent="Dropdown" displayError={ true }></Dropdown>);
    expect(shallowToJson(component)).toMatchSnapshot();
  });

  it('should render an activator node when passed as a prop via `activator`', () => {
    const component = shallow(<Dropdown activator={ <button>Click me</button> } displayError={ true }></Dropdown>);
    expect(shallowToJson(component)).toMatchSnapshot();
  });

  it('should render an activator node when passed as a render prop via `renderActivator`', () => {
    function renderActivator() {
      return <button>Click me</button>;
    }
    const component = shallow(<Dropdown renderActivator={ renderActivator } displayError={ true }></Dropdown>);
    expect(shallowToJson(component)).toMatchSnapshot();
  });

  it('should hide children when shouldHideChildrenOnClick is not passed and children are clicked', () => {
    const component = mount(
      <Dropdown
        arrowIcon="down"
        buttonContent={ <div data-test-section="dropdown-button">Press me!</div> }
        placement="bottom-start"
        style="outline">
        <div data-test-section="dropdown-children">
          <p data-test-section="dropdown-text">This is some initial text! Click me, nothing happens.</p>
          <button data-test-section="dropdown-button-1">Doesn't Hide</button>,
          <button data-test-section="dropdown-button-2">Hide Dropdown</button>,
        </div>
      </Dropdown>
    );

    expect(component.find('[data-test-section="dropdown-children"]').length).toBe(0);
    component.find('[data-test-section="dropdown-button"]').simulate('click');
    expect(component.find('[data-test-section="dropdown-children"]').length).toBe(1);
    component.find('[data-test-section="dropdown-text"]').simulate('mouseover');
    component.find('[data-test-section="dropdown-text"]').simulate('click');
    expect(component.find('[data-test-section="dropdown-children"]').length).toBe(0);
  });

  it('should hide children when ignoreToggle is false on a DropdownItem child', () => {
    const onClickMock = jest.fn();
    const component = mount(
      <Dropdown
        arrowIcon="down"
        buttonContent={ <div data-test-section="dropdown-button">Press me!</div> }
        placement="bottom-start"
        style="outline">
        <Dropdown.ListItem>
          <Dropdown.BlockLink
            value={ 'item' }
            onClick={ onClickMock }
            isLink={ true }
            testSection={ 'dropdown-block-link-item' }>
            Button
          </Dropdown.BlockLink>
        </Dropdown.ListItem>
      </Dropdown>
    );

    expect(component.find(Dropdown.ListItem).length).toBe(0);
    component.find('[data-test-section="dropdown-button"]').simulate('click');
    expect(component.find(Dropdown.ListItem).length).toBe(1);
    component.find(Dropdown.BlockLink).simulate('mouseover');
    component.find(Dropdown.BlockLink).simulate('click');
    expect(component.find(Dropdown.ListItem).length).toBe(0);
    expect(onClickMock).toHaveBeenCalledTimes(1);
  });

  it('should not hide children when ignoreToggle is true on a DropdownItem child', () => {
    const onClickMock = jest.fn();
    const component = mount(
      <Dropdown
        arrowIcon="down"
        buttonContent={ <div data-test-section="dropdown-button">Press me!</div> }
        placement="bottom-start"
        style="outline">
        <Dropdown.ListItem ignoreToggle={ true }>
          <Dropdown.BlockLink
            value={ 'item' }
            onClick={ onClickMock }
            isLink={ true }
            testSection={ 'dropdown-block-link-item' }>
            Button
          </Dropdown.BlockLink>
        </Dropdown.ListItem>
      </Dropdown>
    );

    expect(component.find(Dropdown.ListItem).length).toBe(0);
    component.find('[data-test-section="dropdown-button"]').simulate('click');
    expect(component.find(Dropdown.ListItem).length).toBe(1);
    component.find(Dropdown.BlockLink).simulate('mouseover');
    component.find(Dropdown.BlockLink).simulate('click');
    expect(component.find(Dropdown.ListItem).length).toBe(1);
    expect(onClickMock).toHaveBeenCalledTimes(1);
  });

  it('should not show children at all when isDisabled is true', () => {
    const onClickMock = jest.fn();
    const component = mount(
      <Dropdown
        arrowIcon="down"
        buttonContent={ <div data-test-section="dropdown-button">Press me!</div> }
        isDisabled={ true }
        placement="bottom-start"
        style="outline">
        <Dropdown.ListItem>
          <Dropdown.BlockLink
            value={ 'item' }
            onClick={ onClickMock }
            isLink={ true }
            testSection={ 'dropdown-block-link-item' }>
            Button
          </Dropdown.BlockLink>
        </Dropdown.ListItem>
      </Dropdown>
    );

    expect(component.find(Dropdown.ListItem).length).toBe(0);
    component.find('[data-test-section="dropdown-button"]').simulate('click');
    expect(component.find(Dropdown.ListItem).length).toBe(0);
  });

  it('should hide children when shouldHideChildrenOnClick is passed with true and children are clicked', () => {
    const component = mount(
      <Dropdown
        arrowIcon="down"
        buttonContent={ <div data-test-section="dropdown-button">Press me!</div> }
        placement="bottom-start"
        shouldHideChildrenOnClick={ true }
        style="outline">
        <div data-test-section="dropdown-children">
          <p data-test-section="dropdown-text">This is some initial text! Click me, nothing happens.</p>
          <button data-test-section="dropdown-button-1">Doesn't Hide</button>,
          <button data-test-section="dropdown-button-2">Hide Dropdown</button>,
        </div>
      </Dropdown>
    );

    expect(component.find('[data-test-section="dropdown-children"]').length).toBe(0);
    component.find('[data-test-section="dropdown-button"]').simulate('click');
    expect(component.find('[data-test-section="dropdown-children"]').length).toBe(1);
    component.find('[data-test-section="dropdown-text"]').simulate('mouseover');
    component.find('[data-test-section="dropdown-text"]').simulate('click');
    expect(component.find('[data-test-section="dropdown-children"]').length).toBe(0);
  });

  it('should NOT hide children when shouldHideChildrenOnClick is passed with false and children are clicked', () => {
    const component = mount(
      <Dropdown
        arrowIcon="down"
        buttonContent={ <div data-test-section="dropdown-button">Press me!</div> }
        placement="bottom-start"
        shouldHideChildrenOnClick={ false }
        style="outline">
        <div data-test-section="dropdown-children">
          <p data-test-section="dropdown-text">This is some initial text! Click me, nothing happens.</p>
          <button data-test-section="dropdown-button-1">Doesn't Hide</button>,
          <button data-test-section="dropdown-button-2">Hide Dropdown</button>,
        </div>
      </Dropdown>
    );

    expect(component.find('[data-test-section="dropdown-children"]').length).toBe(0);
    component.find('[data-test-section="dropdown-button"]').simulate('click');
    expect(component.find('[data-test-section="dropdown-children"]').length).toBe(1);
    component.find('[data-test-section="dropdown-text"]').simulate('mouseover');
    component.find('[data-test-section="dropdown-text"]').simulate('click');
    expect(component.find('[data-test-section="dropdown-children"]').length).toBe(1);
    component.find('[data-test-section="dropdown-button-1"]').simulate('click');
    expect(component.find('[data-test-section="dropdown-children"]').length).toBe(1);
    component.find('[data-test-section="dropdown-button-2"]').simulate('click');
    expect(component.find('[data-test-section="dropdown-children"]').length).toBe(1);
  });

  it(
    'should only hide children after handleHideChildren is invoked when shouldHideChildrenOnClick is passed with false ' +
      'and render props function child is provided',
    () => {
      const component = mount(
        <Dropdown
          arrowIcon="down"
          buttonContent={ <div data-test-section="dropdown-button">Press me!</div> }
          placement="bottom-start"
          shouldHideChildrenOnClick={ false }
          style="outline">
          {({ handleHideChildren }) => (
            <div data-test-section="dropdown-children">
              <p data-test-section="dropdown-text">This is some initial text! Click me, nothing happens.</p>
              <button data-test-section="dropdown-button-1">Doesn't Hide</button>,
              <button data-test-section="dropdown-button-2" onClick={ handleHideChildren }>
                Hide Dropdown
              </button>
              ,
            </div>
          )}
        </Dropdown>
      );

      expect(component.find('[data-test-section="dropdown-children"]').length).toBe(0);
      component.find('[data-test-section="dropdown-button"]').simulate('click');
      expect(component.find('[data-test-section="dropdown-children"]').length).toBe(1);
      component.find('[data-test-section="dropdown-text"]').simulate('mouseover');
      component.find('[data-test-section="dropdown-text"]').simulate('click');
      expect(component.find('[data-test-section="dropdown-children"]').length).toBe(1);
      component.find('[data-test-section="dropdown-button-1"]').simulate('click');
      expect(component.find('[data-test-section="dropdown-children"]').length).toBe(1);
      component.find('[data-test-section="dropdown-button-2"]').simulate('click');
      expect(component.find('[data-test-section="dropdown-children"]').length).toBe(0);
    }
  );

  it(
    'should hide children when clicked when shouldHideChildrenOnClick is passed with true ' +
      'and render props function child is provided',
    () => {
      const component = mount(
        <Dropdown
          arrowIcon="down"
          buttonContent={ <div data-test-section="dropdown-button">Press me!</div> }
          placement="bottom-start"
          shouldHideChildrenOnClick={ true }
          style="outline">
          {({ handleHideChildren }) => (
            <div data-test-section="dropdown-children">
              <p data-test-section="dropdown-text">This is some initial text! Click me, nothing happens.</p>
              <button data-test-section="dropdown-button-1">Doesn't Hide</button>,
              <button data-test-section="dropdown-button-2" onClick={ handleHideChildren }>
                Hide Dropdown
              </button>
              ,
            </div>
          )}
        </Dropdown>
      );

      expect(component.find('[data-test-section="dropdown-children"]').length).toBe(0);
      component.find('[data-test-section="dropdown-button"]').simulate('click');
      expect(component.find('[data-test-section="dropdown-children"]').length).toBe(1);
      component.find('[data-test-section="dropdown-text"]').simulate('mouseover');
      component.find('[data-test-section="dropdown-text"]').simulate('click');
      expect(component.find('[data-test-section="dropdown-children"]').length).toBe(0);
    }
  );

  it(
    'should hide children after handleHideChildren is invoked when shouldHideChildrenOnClick is passed with true ' +
      'and render props function child is provided',
    () => {
      const component = mount(
        <Dropdown
          arrowIcon="down"
          buttonContent={ <div data-test-section="dropdown-button">Press me!</div> }
          placement="bottom-start"
          shouldHideChildrenOnClick={ true }
          style="outline">
          {({ handleHideChildren }) => (
            <div data-test-section="dropdown-children">
              <p data-test-section="dropdown-text">This is some initial text! Click me, nothing happens.</p>
              <button data-test-section="dropdown-button-1">Doesn't Hide</button>,
              <button data-test-section="dropdown-button-2" onClick={ handleHideChildren }>
                Hide Dropdown
              </button>
              ,
            </div>
          )}
        </Dropdown>
      );

      expect(component.find('[data-test-section="dropdown-children"]').length).toBe(0);
      component.find('[data-test-section="dropdown-button"]').simulate('click');
      expect(component.find('[data-test-section="dropdown-children"]').length).toBe(1);
      component.find('[data-test-section="dropdown-button-2"]').simulate('mouseover');
      component.find('[data-test-section="dropdown-button-2"]').simulate('click');
      expect(component.find('[data-test-section="dropdown-children"]').length).toBe(0);
    }
  );

  it('should add a label when the buttonContent specifies one', () => {
    const component = mount(
      <Dropdown
        arrowIcon="down"
        buttonContent={{label: 'date', content: 'test'}}
        placement="bottom-start"
        style="outline">
        <div data-test-section="dropdown-children">
          <p data-test-section="dropdown-text">This is some initial text! Click me, nothing happens.</p>
          <button data-test-section="dropdown-button-1">Doesn't Hide</button>,
          <button data-test-section="dropdown-button-2">Hide Dropdown</button>,
        </div>
      </Dropdown>
    );

    expect(component.find('.oui-assistive-text').length).toBe(1);
  });
});

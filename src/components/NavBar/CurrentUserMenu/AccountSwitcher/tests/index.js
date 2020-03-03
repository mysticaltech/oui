import React from 'react';
import { mount } from 'enzyme';

import AccountSwitcher from '../index';

const getTestSection = (component, testSection) => component.find(`[data-test-section="${testSection}"]`);

const userAccounts = [
  { text: 'Account 1', url: '#', description: 'Account 1 Description', isCurrent: false },
  { text: 'Account 3', url: '#', description: 'Account 3 Description', isCurrent: false },
  { text: 'Account 5', url: '#', description: 'Account 5 Description', isCurrent: false },
  { text: 'Account 4', url: '#', description: 'Account 4 Description', isCurrent: false },
  { text: 'Account 2', url: '#', description: 'Account 2 Description', isCurrent: true },
];

const sortedUserAccounts = [
  { text: 'Account 1', url: '#', description: 'Account 1 Description', isCurrent: false },
  { text: 'Account 2', url: '#', description: 'Account 2 Description', isCurrent: true },
  { text: 'Account 3', url: '#', description: 'Account 3 Description', isCurrent: false },
  { text: 'Account 4', url: '#', description: 'Account 4 Description', isCurrent: false },
  { text: 'Account 5', url: '#', description: 'Account 5 Description', isCurrent: false },
];

describe('components/NavBar/CurrentUserMenu/AccountSwitcher', function() {
  let component;
  let handlerObj;

  beforeEach(function() {
    handlerObj = {
      accountSwitcherHandler: () => {},
    };
    spyOn(handlerObj, 'accountSwitcherHandler');

    component = mount(
      <AccountSwitcher
        accountSwitcherItems={ userAccounts }
        accountSwitcherHandler={ handlerObj.accountSwitcherHandler }
      />
    );
  });

  it('should render sorted user accounts', function() {
    expect(component.find('Category').length).toBe(5);
    const renderedUserAccountsNameList = getTestSection(component, 'switch-account-row-name');
    sortedUserAccounts.forEach((account, index) => {
      expect(renderedUserAccountsNameList.at(index).text()).toBe(account.text);
    });
  });

  it('should call accountSwitcherHandler callback when non-active account is clicked', function() {
    component.find('Item').at(0).props().onClick();
    expect(handlerObj.accountSwitcherHandler).toBeCalled();
  });

  it('should not call accountSwitcherHandler callback when active account item is clicked', function() {
    expect(component.find('Item').at(1).props().onClick).toBeUndefined();
  });
});

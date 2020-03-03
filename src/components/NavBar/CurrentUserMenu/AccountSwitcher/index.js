/**
 * Switch Accounts with in the user
 */
import React from 'react';
import PropTypes from 'prop-types';
import classNames from 'classnames';

import Badge from '../../../Badge';
import BlockList from '../../../BlockList';

const sortAscending = (a, b) => {
  if (a.text > b.text) {
    return 1;
  }
  if (b.text > a.text) {
    return -1;
  }
  return 0;
};

const AccountSwitcher = (props) => {
  const {
    accountSwitcherItems,
    accountSwitcherHandler,
  } = props;
  return accountSwitcherItems.sort(sortAscending).map(account => {
    function onAccountSelect() {
      accountSwitcherHandler(account);
    }

    return (
      <BlockList.Category
        key={ account.text }
        testSection="switch-account-row">
        <BlockList.Item
          href={ `${!account.isCurrent ? account.url : ''}` }
          onClick={ !account.isCurrent ? onAccountSelect : undefined }>
          <div
            data-test-section="switch-account-row-name"
            className={ classNames({
              'color--base': account.isCurrent,
              'color--brand': !account.isCurrent,
            }) }>
            { account.text }
          </div>
          <div className="micro muted">
            { account.description }
          </div>
          { account.isCurrent && (
            <Badge color="primary">
              CURRENT ACCOUNT
            </Badge>
          ) }
        </BlockList.Item>
      </BlockList.Category>
    );
  });
};

AccountSwitcher.propTypes = {
  /** Function Called to Switch Account */
  accountSwitcherHandler: PropTypes.func.isRequired,
  /* User account list */
  accountSwitcherItems: PropTypes.arrayOf(PropTypes.shape({
    text: PropTypes.string.isRequired,
    description: PropTypes.string.isRequired,
    url: PropTypes.string.isRequired,
    isCurrent: PropTypes.bool.isRequired,
  })).isRequired,
};

export default AccountSwitcher;

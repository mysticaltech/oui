import React from 'react';
import classNames from 'classnames';
import PropTypes from 'prop-types';

import Link from '../Link';
import Badge from '../Badge';
import IconLink from './IconLink';
import CurrentUserMenu from './CurrentUserMenu';

const LINK = 'link';
const PUSH_STATE = 'pushstate';
const BUTTON = 'button';

const linkPropTypes = {
  /** Should show a separator line before this link. */
  hasSeparator: PropTypes.bool,
  /** Url to Navigate to when type is link. */
  href: PropTypes.string,
  /** Name of Icon. */
  iconName: PropTypes.string.isRequired,
  /** Whether the link is highlighted blue as the current active nav link. */
  isActive: PropTypes.bool,
  /** Condition in which this link is visible. */
  isVisible: PropTypes.bool,
  /** Description of url. */
  linkLabel: PropTypes.string,
  /** Handler called when link is clicked. */
  onClick: PropTypes.func,
  /** Name of test data section. */
  testSection: PropTypes.string,
  /** Type of Link. */
  type: PropTypes.oneOf([LINK, PUSH_STATE, BUTTON]),
};

const linkDefaultProps = {
  href: '',
  isActive: false,
  isVisible: true,
  linkLabel: '',
  testSection: null,
  hasSeparator: false,
  onClick: () => {},
  type: LINK,
};

const PrimaryLink = props => <IconLink { ...props } isSecondaryLink={ false } />;
PrimaryLink.propTypes = linkPropTypes;
PrimaryLink.defaultProps = linkDefaultProps;

const SecondaryLink = props => <IconLink { ...props } isSecondaryLink={ true } />;
SecondaryLink.propTypes = linkPropTypes;
SecondaryLink.defaultProps = linkDefaultProps;

const NavBar = (props) => {
  const {
    isOpen,
    homeUrl,
    logoUrl,
    trialContent,
    title,
    badgeText,
    children,
  } = props;

  const renderChildrenByType = ComponentType =>
    React.Children
      .toArray(children)
      .filter(child => child.type === ComponentType)
      .map(element => React.cloneElement(element, { isOpen }));

  const logoClasses = classNames('push-double--left',
    {
      'root-nav__logo--full': isOpen,
      'root-nav__logo--mark': !isOpen,
    });

  return (
    <nav
      className={ classNames({
        'root-nav': true,
        'root-nav--open': isOpen,
      }) }
      data-test-section="p13n-root-navbar">
      <div data-test-section="navbar-header">
        <div className="root-nav__logo push-double--bottom">
          <Link href={ homeUrl }>
            <img
              alt="logo"
              src={ logoUrl }
              className={ logoClasses }
            />
          </Link>
        </div>
        { trialContent }
        <div
          className={ classNames({
            'root-nav__project': true,
            'root-nav-fader': !isOpen,
          }) }>
          <div
            className="epsilon truncate"
            data-test-section="project-name">
            { title }
          </div>
          <Badge color="primary" testSection="project-badge">
            { badgeText }
          </Badge>
        </div>
      </div>
      <ul className="push-double--ends">
        { renderChildrenByType(PrimaryLink) }
      </ul>
      <div className="anchor--bottom">
        <ul className="push-double--ends">
          { renderChildrenByType(SecondaryLink) }
        </ul>
        { renderChildrenByType(CurrentUserMenu) }
      </div>
    </nav>
  );
};

NavBar.propTypes = {
  /** Text to appear below title in a badge. */
  badgeText: PropTypes.string,
  /* Allowed Children are <PrimaryLink>, <SecondaryLink>, <CurrentUser>. */
  children: (props, propName) => {
    const prop = props[propName];
    let error = null;
    React.Children.forEach(prop, (child) => {
      if (child === null) { // Skip checking empty child nodes
        return;
      }
      if (![SecondaryLink, PrimaryLink, CurrentUserMenu].includes(child.type)) {
        error = new Error('Children should be of type PrimaryLink, SecondaryLink, or CurrentUserMenu.');
      }
    });
    if (!error && React.Children.toArray(prop).filter(child => child.type === CurrentUserMenu).length !== 1) {
      error = new Error('There should be only one instance of `CurrentUserMenu`');
    }
    return error;
  },
  /** Url to navigate to when Brand Logo is clicked. */
  homeUrl: PropTypes.string,
  /** Is Navigation Bar open or closed. */
  isOpen: PropTypes.bool,
  /** Brand logo URL. */
  logoUrl: PropTypes.string,
  /** Title of navigation bar */
  title: PropTypes.string,
  /** Component to appear above title and below brand logo. */
  trialContent: PropTypes.node,
};

NavBar.defaultProps = {
  badgeText: '',
  homeUrl: '',
  isOpen: true,
  logoUrl: null,
  title: '',
  trialContent: null,
};

NavBar.PrimaryLink = PrimaryLink;
NavBar.SecondaryLink = SecondaryLink;
NavBar.CurrentUserMenu = CurrentUserMenu;

export default NavBar;

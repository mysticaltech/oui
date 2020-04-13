import classNames from 'classnames';
import Icon from 'react-oui-icons';
import PropTypes from 'prop-types';
import React from 'react';

import Link from '../../Link';
import Poptip from '../../Poptip';

const LINK = 'link';
const PUSH_STATE = 'pushstate';
const BUTTON = 'button';

// Should have a main component on its own.
class IconLink extends React.PureComponent {
  static propTypes = {
    /* Boolean, Should show a separator line before this link */
    hasSeparator: PropTypes.bool,
    /* Navigates to this URL when clicked */
    href: PropTypes.string,
    /* String, name of Icon */
    iconName: PropTypes.string.isRequired,
    /* Boolean, whether the link is highlighted
     * blue as the current active nav link */
    isActive: PropTypes.bool,
    /* Boolean, whether navbar is open or closed */
    isOpen: PropTypes.bool,
    /* Boolean, whether link is primary or secondary */
    isSecondaryLink: PropTypes.bool,
    /* String or Node, description of url */
    linkLabel: PropTypes.oneOfType([
      PropTypes.string,
      PropTypes.node,
    ]).isRequired,
    /* Function called when IconLink is clicked */
    onClick: PropTypes.func,
    /* String, name of test data section */
    testSection: PropTypes.string.isRequired,
    /* IconLink can be one of these types
     * LINK
     * PUSH_STATE
     * BUTTON */
    type: PropTypes.oneOf([LINK, PUSH_STATE, BUTTON]),
  };

  static defaultProps = {
    hasSeparator: false,
    href: '',
    isActive: false,
    isOpen: true,
    isSecondaryLink: false,
    onClick: () => {},
    type: LINK,
  };

  renderNavLink = () => {
    const {
      isActive,
      iconName,
      isOpen,
      isSecondaryLink,
      hasSeparator,
      linkLabel,
    } = this.props;
    const iconSize = isSecondaryLink ? 'medium' : 'large';
    return (
      <React.Fragment>
        { hasSeparator &&
          <hr className="oui-rule push-double--sides"/>
        }
        <Poptip
          content={ linkLabel }
          disable={ isOpen }
          isAnimated={ false }
          position="right">
          <div
            className={ classNames(
              'root-nav__link',
              {
                'is-active': isActive,
                'root-nav__link--primary': !isSecondaryLink,
                'root-nav__link--secondary': isSecondaryLink,
              },
            ) }>
            <div className="flex">
              <Icon
                name={ iconName }
                size={ iconSize }
              />
            </div>
            <div className={ classNames('root-nav__link__text', ' truncate', { 'root-nav-fader': !isOpen }) }>
              { linkLabel }
            </div>
          </div>
        </Poptip>
      </React.Fragment>
    );
  };

  onAppRouteLinkClick = event => {
    const { href, onClick } = this.props;
    return onClick(href, event);
  };

  renderAppRouteLink = () => {
    const { testSection, href } = this.props;
    return (
      <Link
        style="reverse"
        href={ href }
        onClick={ this.onAppRouteLinkClick }
        testSection={ `${testSection}-internal-link` }>
        { this.renderNavLink() }
      </Link>
    );
  };

  renderExternalLink = () => {
    const { testSection, href } = this.props;
    return (
      <Link
        href={ href }
        style="reverse"
        testSection={ `${testSection}-external-link` }>
        { this.renderNavLink() }
      </Link>
    );
  };

  renderButton = () => {
    const { testSection, onClick } = this.props;
    return (
      <Link
        onClick={ onClick }
        style="reverse"
        testSection={ `${testSection}-button` }>
        { this.renderNavLink() }
      </Link>
    );
  };

  render() {
    const { testSection, type } = this.props;
    let linkToRender;

    switch (type) {
      case PUSH_STATE:
        linkToRender = this.renderAppRouteLink();
        break;
      case LINK:
        linkToRender = this.renderExternalLink();
        break;
      case BUTTON:
        linkToRender = this.renderButton();
        break;
      default:
        // Should never reach here
        linkToRender = null;
    }

    return (
      <li className="display--inline-block" data-test-section={ testSection }>
        { linkToRender }
      </li>
    );
  }
}

export default IconLink;

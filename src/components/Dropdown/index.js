import React from 'react';
import classNames from 'classnames';
import PropTypes from 'prop-types';
import { Manager, Popper, Reference } from 'react-popper';
import { withState } from 'recompose';
import { withToggle } from '../../utils/recompose-utils';

import DropdownContents from './DropdownContents';
import DropdownListItem from './DropdownListItem';
import DropdownBlockLink from './DropdownBlockLink';
import DropdownBlockLinkText from './DropdownBlockLinkText';
import DropdownBlockLinkSecondaryText from './DropdownBlockLinkSecondaryText';

@withToggle
@withState('overChildren', 'setOverChildren', false)
class Dropdown extends React.Component {
  static displayName = 'Dropdown';

  static shouldDisplayChildren = ({ isOpen, isDisabled }) =>
    isOpen && !isDisabled;

  componentDidUpdate = prevProps => {
    // For performance reasons, only listen to global clicks
    // while the children are displayed.
    if (
      Dropdown.shouldDisplayChildren(prevProps) ===
      Dropdown.shouldDisplayChildren(this.props)
    ) {
      return;
    }
    if (Dropdown.shouldDisplayChildren(this.props)) {
      document.addEventListener('click', this.handleOnBlur);
    } else {
      document.removeEventListener('click', this.handleOnBlur);
    }
  };

  handleHideChildren = () => {
    const { hide, setOverChildren, shouldHideChildrenOnClick } = this.props;
    // We need to return early because handleToggle() and hide() will
    // cancel each other out if shouldHideChildrenOnClick is true
    if (shouldHideChildrenOnClick) {
      return;
    }
    hide();
    setOverChildren(false);
  };

  handleOnBlur = () => {
    const { target } = event;
    const targetIsInput = target.nodeName === 'INPUT';
    if (!this.props.overChildren && !targetIsInput) {
      this.props.hide();
    }
  };

  handleToggle = event => {
    const { isDisabled, overChildren, shouldHideChildrenOnClick } = this.props;
    if (
      isDisabled ||
      event.ignoreToggle ||
      (!shouldHideChildrenOnClick && overChildren)
    ) {
      return;
    }
    this.props.setOverChildren(false);
    this.props.toggle();
  };

  onMouseOver = () => this.props.setOverChildren(true);

  onMouseLeave = () => this.props.setOverChildren(false);

  render() {
    const {
      arrowIcon,
      buttonContent,
      children,
      isDisabled,
      isOpen,
      displayError,
      fullWidth,
      placement,
      renderActivator,
      style,
      testSection,
      width,
      zIndex,
    } = this.props;

    const groupClass = classNames(
      'oui-dropdown-group',
      { ['width--1-1']: fullWidth },
      { ['oui-form-bad-news']: displayError },
      { ['is-active']: isOpen }
    );

    const buttonClass = classNames(
      'oui-button',
      { [`oui-button--${style}`]: style },
      { ['oui-button--full soft--left text--left']: fullWidth }
    );

    const iconClass = classNames('push-half--left', {
      ['oui-arrow-inline--down']: arrowIcon === 'down',
      ['oui-arrow-inline--left']: arrowIcon === 'left',
      ['oui-arrow-inline--right']: arrowIcon === 'right',
      ['oui-arrow-inline--up']: arrowIcon === 'up',
    });

    return (
      <Manager>
        <div
          className={ groupClass }
          data-oui-component={ true }
          data-test-section={ testSection }>
          <Reference>
            {({ ref }) => {
              if (buttonContent) {
                return (
                  <button
                    type="button"
                    aria-haspopup="listbox"
                    className={ buttonClass }
                    disabled={ isDisabled }
                    onClick={ this.handleToggle }
                    onBlur={ this.handleOnBlur }
                    ref={ ref }>
                    <div className="flex flex-align--center">
                      <div className="flex--1 truncate">
                        {buttonContent.label ? (
                          <div className="line--tight text--left push--right">
                            <div className="micro muted">
                              {buttonContent.label}
                              <span className="oui-assistive-text">:</span>
                            </div>
                            <div>{buttonContent.content}</div>
                          </div>
                        ) : (
                          buttonContent
                        )}
                      </div>
                      {!!arrowIcon && arrowIcon !== 'none' && (
                        <div className="text--right">
                          <span className={ iconClass } />
                        </div>
                      )}
                    </div>
                  </button>
                );
              }

              if (renderActivator) {
                return renderActivator({
                  ref: ref,
                  buttonRef: ref,
                  disabled: isDisabled,
                  onBlur: this.handleOnBlur,
                  onClick: this.handleToggle,
                  onMouseOver: this.onActivatorMouseOver,
                  onMouseLeave: this.onActivatorMouseLeave,
                  testSection: testSection,
                });
              } else if (this.props.activator) {
                // To be deprecated in favor of renderActivator
                return React.cloneElement(this.props.activator, {
                  buttonRef: ref,
                  ref,
                  onBlur: this.handleOnBlur,
                  onClick: this.handleToggle,
                });
              }
            }}
          </Reference>
          {Dropdown.shouldDisplayChildren(this.props) && (
            <Popper placement={ placement }>
              {({ ref, style: popperStyle, placement: popperPlacement }) => (
                <div
                  ref={ ref }
                  data-placement={ popperPlacement }
                  className="oui-dropdown-children"
                  onMouseOver={ this.onMouseOver }
                  onMouseLeave={ this.onMouseLeave }
                  onClick={ this.handleToggle }
                  style={{
                    zIndex: zIndex,
                    position: 'absolute',
                    width: width,
                    marginTop: 2,
                    marginBottom: 2,
                    borderRadius: 'var(--border-radius)',
                    boxShadow: '0 2px 3px rgba(0,0,0,.1)',
                    ...popperStyle,
                  }}>
                  {typeof children === 'function'
                    ? children({ handleHideChildren: this.handleHideChildren })
                    : children}
                </div>
              )}
            </Popper>
          )}
        </div>
      </Manager>
    );
  }
}

Dropdown.propTypes = {
  /**
   * React element that when clicked activates the dropdown
   * Either this prop OR buttonContent should be used, not both
   * Not included in defaultProps because undefined is an expected value
   */
  activator: PropTypes.elementType,
  /** Arrow icon direction:
   * - Defaults to 'none', which hides the arrow
   * - passing a prop value of false also hides the arrow
   * - passing a prop value of true uses down arrow
   */
  arrowIcon: PropTypes.oneOf(['down', 'left', 'none', 'right', 'up']),
  /**
   * Button text, can be a string or element.
   * Either this prop OR activator should be used, not both
   * Not included in defaultProps because undefined is an expected value
   */
  buttonContent: PropTypes.oneOfType(
    [
      PropTypes.string,
      PropTypes.element,
      PropTypes.shape({label: PropTypes.string, content: PropTypes.string}),
    ]
  ),
  /**
   * Dropdown contents, typically using the <Blocklist> component
   * Use render prop function for custom hide configuration
   */
  children: PropTypes.oneOfType([PropTypes.node, PropTypes.func]).isRequired,
  /** Show error state. */
  displayError: PropTypes.bool,
  /** Button width is either full or inline-block. */
  fullWidth: PropTypes.bool,
  /** Provided by @withToggle HOC */
  hide: PropTypes.func,
  /** Disable button. */
  isDisabled: PropTypes.bool,
  /**
   * Provided by @withToggle HOC
   * Defaults to false but Dropdown can be open by default if true
   */
  isOpen: PropTypes.bool,
  /**
   * Provided by @withState HOC
   * Whether or not the children are currently moused over
   */
  overChildren: PropTypes.bool,
  /** Popper placement property */
  placement: PropTypes.oneOf([
    'top',
    'top-start',
    'top-end',
    'bottom',
    'bottom-start',
    'bottom-end',
    'right',
    'right-start',
    'right-end',
    'left',
    'left-start',
    'left-end',
  ]),
  /**
   * A render prop to render the activator button that when clicked activates
   * the dropdown
   * Either this prop OR buttonContent should be used, not both
   */
  renderActivator: PropTypes.func,
  /** Provided by @withToggle HOC. Control for overChildren value */
  setOverChildren: PropTypes.func,
  /**
   * Whether Dropdown children should be hidden on children click
   * - Defaults to true
   * - Pass render prop function as child prop and use provided
   *   handleHideChildren function to programmatically hide
   */
  shouldHideChildrenOnClick: PropTypes.bool,
  /**
   * Button style, e.g. highlight, danger, outline
   * Not included in defaultProps because undefined is an expected value
   */
  style: PropTypes.string,
  /** For automated testing only. */
  testSection: PropTypes.string,
  /** Provided by @withToggle HOC. Toggle control for isOpen. */
  toggle: PropTypes.func,
  /** Dropdown menu width, in pixels. */
  width: PropTypes.oneOfType([PropTypes.string, PropTypes.number]),
  /** Override default dropdown menu z-index. */
  zIndex: PropTypes.number,
};

Dropdown.defaultProps = {
  arrowIcon: 'none',
  displayError: false,
  fullWidth: false,
  isDisabled: false,
  isOpen: false,
  overChildren: false,
  placement: 'bottom-start',
  renderActivator: null,
  setOverChildren: () => {},
  shouldHideChildrenOnClick: true,
  testSection: '',
  toggle: () => {},
  width: 200,
  zIndex: 999,
};

Dropdown.Contents = DropdownContents;
Dropdown.ListItem = DropdownListItem;
Dropdown.BlockLink = DropdownBlockLink;
Dropdown.BlockLinkText = DropdownBlockLinkText;
Dropdown.BlockLinkSecondaryText = DropdownBlockLinkSecondaryText;

export default Dropdown;

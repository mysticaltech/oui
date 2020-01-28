import PropTypes from 'prop-types';
import React from 'react';
import classNames from 'classnames';

import Button from '../Button';
import Dropdown from '../Dropdown';
import Link from '../Link';

class SelectDropdown extends React.Component {
  static propTypes = {
    /**
     * Style value that is passed to the OUI button that controls the dropdown.
     */
    buttonStyle: PropTypes.string,
    /**
     * Show error by default.
     */
    displayError: PropTypes.bool,
    /**
     * Dropdown direction.
     */
    dropdownDirection: PropTypes.oneOf(['right', 'left']),
    /**
     * Should activator be full width of container
     */
    fullWidth: PropTypes.bool,
    /**
     * An initial value for the dropdown before anything is selected
     */
    initialPlaceholder: PropTypes.node,
    /**
     * The select is greyed out if it is disabled.
     */
    isDisabled: PropTypes.bool,
    /**
     * Whether this dropdown supports Multi Select
     * If true, automatically sets shouldHideChildrenOnClick to false
     */
    isMultiSelect: PropTypes.bool,
    /**
     * Dropdown items that can be selected from the select dropdown.
     */
    items: PropTypes.arrayOf(PropTypes.shape({
      activatorLabel: PropTypes.node,
      description: PropTypes.string,
      isSelected: PropTypes.bool,
      label: PropTypes.node.isRequired,
      value: PropTypes.oneOfType([
        PropTypes.string,
        PropTypes.number,
        PropTypes.bool,
      ]).isRequired,
      linkText: PropTypes.string,
      linkURL: PropTypes.string,
    })).isRequired,
    /**
     * Max width of the activator container.
     */
    maxWidth: PropTypes.oneOfType([
      PropTypes.string,
      PropTypes.number,
    ]),
    /**
     * The minimum width of the dropdown list; any valid CSS width value.
     */
    minDropdownWidth: PropTypes.oneOfType([
      PropTypes.string,
      PropTypes.number,
    ]),
    /**
     * Function that is called when user selects
     * an item from dropdown list.
     */
    onChange: PropTypes.func.isRequired,
    /**
     * Identifier used to create data-test-section attributes for testing.
     */
    testSection: PropTypes.string,
    /**
     * Identifier used to create data-track-id attributes for Heap testing.
     */
    trackId: PropTypes.string,
    /**
     * Value of currently selected item.
     */
    value: PropTypes.oneOfType([
      PropTypes.string,
      PropTypes.number,
      PropTypes.bool,
    ]),
    /**
     * Width of the activator container.
     */
    width: PropTypes.oneOfType([
      PropTypes.string,
      PropTypes.number,
    ]),
    /**
     * zIndex of dropdown group
     */
    zIndex: PropTypes.number,
  };

  static defaultProps = {
    buttonStyle: 'outline',
    initialPlaceholder: '',
    displayError: false,
    dropdownDirection: 'right',
    fullWidth: false,
    width: '100%',
    trackId: '',
    testSection: '',
    value: '',
  };

  renderActivator = ({ buttonRef, onClick, onBlur }) => {
    const { buttonStyle, value, width, maxWidth, isDisabled, initialPlaceholder, trackId, testSection } = this.props;
    let selectedItem;
    this.props.items.forEach(item => {
      if (item.value === value) {
        selectedItem = item;
      }
    });

    const outerClass = classNames(
      {['oui-form-bad-news']: this.props.displayError,
        'oui-dropdown-group__activator': true}
    );

    let activatorLabel = '';
    if (selectedItem) {
      activatorLabel = selectedItem.activatorLabel || selectedItem.label;
    } else if (initialPlaceholder) {
      activatorLabel = initialPlaceholder;
    }

    return (
      <div
        style={{ width: width, maxWidth: maxWidth}}
        className={ outerClass }>
        <Button
          title={ activatorLabel }
          isDisabled={ isDisabled }
          style={ buttonStyle }
          size="narrow"
          testSection={ testSection }
          width="full"
          buttonRef={ buttonRef }
          onClick={ onClick }
          onBlur={ onBlur }>
          <div className="flex flex-align--center" data-track-id={ trackId }>
            <span className="oui-dropdown-group__activator-label flex--1">{ activatorLabel }</span>
            <span className="push--left oui-arrow-inline--down" />
          </div>
        </Button>
      </div>
    );
  };

  handleLinkClick = (e) => {
    e.stopPropagation();
  };

  renderContents = () => {
    const { isMultiSelect, items, onChange, value, minDropdownWidth, dropdownDirection } = this.props;

    return (
      <Dropdown.Contents minWidth={ minDropdownWidth } direction={ dropdownDirection }>
        { items.map((entry, index) => (
          <Dropdown.ListItem key={ entry.value }>
            <Dropdown.BlockLink
              value={ entry.value }
              onClick={ onChange }
              isLink={ entry.value !== value }
              isItemSelected={ entry.isSelected }
              isMultiSelect={ isMultiSelect }
              testSection={ 'dropdown-block-link-' + entry.value }>
              { entry.label }
              { entry.description && (
                <div className="micro muted">
                  { entry.description }
                </div>
              )}
            </Dropdown.BlockLink>
            { entry.linkText && entry.linkURL && (
              <div className="micro muted">
                <Link
                  title={ entry.linkText }
                  onClick={ this.handleLinkClick }
                  newWindow={ true }
                  href={ entry.linkURL }>
                  { entry.linkText}
                </Link>
              </div>
            )}
          </Dropdown.ListItem>
        ))}
      </Dropdown.Contents>
    );
  };

  render() {
    const { fullWidth, isDisabled, isMultiSelect, zIndex } = this.props;

    return (
      <Dropdown
        { ...(zIndex ? { zIndex } : {}) }
        isDisabled={ isDisabled }
        fullWidth={ fullWidth }
        renderActivator={ this.renderActivator }
        shouldHideChildrenOnClick={ !isMultiSelect }>
        { this.renderContents() }
      </Dropdown>
    );
  }
}

export default SelectDropdown;

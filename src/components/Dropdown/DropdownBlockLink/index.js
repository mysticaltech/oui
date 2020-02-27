import React, { useEffect, useRef } from 'react';
import classNames from 'classnames';
import PropTypes from 'prop-types';
import Checkbox from '../../Checkbox';

export const DropdownBlockLink = (props) => {
  const el = useRef(null);

  useEffect(() => {
    if (props.hasFauxFocus && el.current) {
      el.current.scrollIntoView({
        behavior: 'smooth',
        block: 'center',
      });
    }
  });

  function onClick() {
    props.onClick(props.value);
  }

  const styleProps = {};
  if (props.minWidth) {
    styleProps.minWidth = props.minWidth;
  }

  return (
    <div
      className={ classNames({
        'link': props.isLink,
        'isSelected': !props.isLink,
        'oui-dropdown__block-link': props.isLink,
        'oui-dropdown__block-link--has-focus': props.hasFauxFocus,
      }) }
      ref={ el }
      style={ styleProps }
      { ...(props.testSection ? { 'data-test-section': props.testSection } : {}) }
      { ...(props.trackId ? { 'data-track-id': props.trackId } : {}) }
      onClick={ onClick }>
      {
        props.isMultiSelect ?
          <Checkbox
            defaultChecked={ props.isItemSelected }
            label={ props.children }
            isDisabled={ false }
          /> :
          props.children
      }
    </div>
  );
};

DropdownBlockLink.defaultProps = {
  isLink: true,
};

DropdownBlockLink.propTypes = {
  /** Content to be shown in the menu option */
  children: PropTypes.node.isRequired,
  /** Whether or not this element should be highlighted. */
  hasFauxFocus: PropTypes.bool,
  /** Whether or not this item's checkbox is checked' */
  isItemSelected: PropTypes.bool,
  /**
   * Should this be a link or non-clickable text?
   * To indicate item is selected (in single select),
   * isLink should be false.
   */
  isLink: PropTypes.bool.isRequired,
  /** Whether or not this item should include a checkbox */
  isMultiSelect: PropTypes.bool,
  /** Minimum width of the list item, useful if
    * you need to have a block of description text */
  minWidth: PropTypes.oneOfType([
    PropTypes.string,
    PropTypes.number,
  ]),
  /** Click handler for the menu option */
  onClick: PropTypes.func.isRequired,
  /** Used for data-test-section attribute on the link */
  testSection: PropTypes.string,
  /** Used for data-track-id attribute on the link */
  trackId: PropTypes.string,
  /** An optional value to invoke the onClick callback with */
  value: PropTypes.string,
};

export default DropdownBlockLink;

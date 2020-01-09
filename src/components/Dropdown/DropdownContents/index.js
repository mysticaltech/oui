import { isUndefined, noop } from 'lodash';
import React from 'react';
import classNames from 'classnames';
import PropTypes from 'prop-types';

export const DropdownContents = React.forwardRef((props, ref) => {
  const styleProps = {};
  if (!isUndefined(props.isLoading)) {
    // Supports loading spinner over <ul> contents
    styleProps.position = 'relative';
  }

  if (props.minWidth) {
    styleProps.minWidth = props.minWidth;
  }

  if (props.canScroll) {
    styleProps.overflowY = 'visible';
    styleProps.maxHeight = 'none';
  }

  const wrapperClasses = classNames({
    nowrap: props.isNoWrap,
    'oui-dropdown': true,
    'oui-dropdown--right': props.direction === 'left',
    'oui-dropdown--up': props.direction === 'up',
  });

  const listClasses = classNames({ 'min-height--100': props.isLoading });

  return (
    <div ref={ ref } className={ wrapperClasses }>
      {props.renderHeader()}
      <ul
        className={ listClasses }
        role="listbox"
        style={ styleProps }
        { ...(props.testSection ? { 'data-test-section': props.testSection } : {}) }>
        {props.children}
      </ul>
    </div>
  );
});

DropdownContents.displayName = 'DropdownContents';

DropdownContents.propTypes = {
  /** Whether contents can scroll */
  canScroll: PropTypes.bool,
  /** Nodes to display within */
  children: PropTypes.node.isRequired,
  /** Direction of contents */
  direction: PropTypes.oneOf(['left', 'right', 'up']),
  /** Whether or not the dropdown is in a loading state. */
  isLoading: PropTypes.bool,
  /** Whether to wrap contents or not */
  isNoWrap: PropTypes.bool,
  /** Minimum width of contents */
  minWidth: PropTypes.oneOfType([PropTypes.string, PropTypes.number]),
  /** Optional render function to display a header before the list. */
  renderHeader: PropTypes.func,
  /** Test section for element */
  testSection: PropTypes.string,
};

DropdownContents.defaultProps = {
  canScroll: false,
  direction: 'left',
  isLoading: undefined,
  isNoWrap: false,
  renderHeader: noop,
  testSection: '',
};

export default DropdownContents;

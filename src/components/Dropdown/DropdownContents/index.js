import React from 'react';
import classNames from 'classnames';
import PropTypes from 'prop-types';

export default function DropdownContents(props) {
  const styleProps = {};
  if (props.minWidth) {
    styleProps.minWidth = props.minWidth;
  }

  if (props.canScroll) {
    styleProps.overflowY = 'visible';
    styleProps.maxHeight = 'auto';
  }

  const classes = classNames({
    'nowrap': props.isNoWrap,
    'oui-dropdown': true,
    'oui-dropdown--right': props.direction === 'left',
    'oui-dropdown--up': props.direction === 'up',
  });

  return (
    <ul
      className={ classes }
      style={ styleProps }
      { ...(props.testSection ? { 'data-test-section': props.testSection } : {}) }>
      {
        React.Children.map(props.children, (child) => {
          return child && React.cloneElement(child, {
            handleToggle: props.handleToggle,
          });
        })
      }
    </ul>
  );
}

DropdownContents.propTypes = {
  /** Whether contents can scroll */
  canScroll: PropTypes.bool,
  /** Nodes to display within */
  children: PropTypes.node.isRequired,
  /** Direction of contents */
  direction: PropTypes.oneOf(['left', 'right', 'up']),
  /**
   * Function passed to children to determine
   * if dropdown should be hidden
   */
  handleToggle: PropTypes.func,
  /** Whether to wrap contents or not */
  isNoWrap: PropTypes.bool,
  /** Minimum width of contents */
  minWidth: PropTypes.oneOfType([
    PropTypes.string,
    PropTypes.number,
  ]),
  /** Test section for element */
  testSection: PropTypes.string,
};

DropdownContents.defaultProps = {
  canScroll: false,
  direction: 'left',
  handleToggle: () => {},
  isNoWrap: false,
  testSection: '',
};

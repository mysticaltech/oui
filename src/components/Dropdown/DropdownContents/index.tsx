import { isUndefined, noop } from 'lodash';
import React from 'react';
import classNames from 'classnames';

type DropdownContentsProps = {
  /** Whether contents can scroll */
  canScroll?: boolean;

  /** Direction of contents */
  direction?: 'left' | 'right' | 'up';

  /** Whether or not the dropdown is in a loading state. */
  isLoading?: boolean;

  /** Whether to wrap contents or not */
  isNoWrap?: boolean;

  /** Minimum width of contents */
  minWidth?: string | number;

  /** Optional render function to display a header before the list. */
  renderHeader?: (...args: any[]) => any;

  /** Test section for element */
  testSection?: string;
};

export const DropdownContents: React.SFC<DropdownContentsProps> = React.forwardRef(
  ({ renderHeader = noop, ...props }, ref?: React.Ref<HTMLDivElement>) => {
    const styleProps: React.CSSProperties = {};
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
      <div ref={ref} className={wrapperClasses}>
        {renderHeader()}
        <ul
          className={listClasses}
          role="listbox"
          style={styleProps}
          {...(props.testSection ? { 'data-test-section': props.testSection } : {})}
        >
          {props.children}
        </ul>
      </div>
    );
  }
);

DropdownContents.displayName = 'DropdownContents';

DropdownContents.defaultProps = {
  canScroll: false,
  direction: 'left',
  isLoading: undefined,
  isNoWrap: false,
  testSection: '',
};

export default DropdownContents;

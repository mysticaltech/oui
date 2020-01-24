import classNames from 'classnames';
import React from 'react';

type RowProps = {
  /**
   * @default 'row'
   */
  as?: React.ElementType;

  /**
   * Add visible border to row
   */
  border?: 'top' | 'bottom' | 'left' | 'right' | 'sides' | 'ends' | 'all' | 'none';

  /**
   * Display layout as vertical column.
   */
  displayVertical?: boolean;

  /**
   * For testing/debugging only -- show grid hotpink borders and backgrounds.
   */
  outlineDebug?: boolean;

  /**
   * Force overflow scrolling
   */
  overflow?: 'overflow-y--scroll' | 'overflow-x--auto' | 'overflow-y--auto';

  /**
   * Pad inner content.
   */
  paddedContent?: 'none' | 'around' | 'sides' | 'ends' | 'remove';

  /**
   * Removes gutters and negative margins.
   */
  removeGutters?: boolean;

  /** Whether this row should wrap at small screen sizes */
  shouldWrap?: boolean;

  /**
   * How to vertically align content
   */
  verticalAlignment?: 'start' | 'center' | 'end';
};

const Row: React.SFC<RowProps> = React.forwardRef(
  (
    {
      as: Component = 'div',
      border,
      displayVertical,
      overflow,
      outlineDebug,
      paddedContent,
      removeGutters,
      shouldWrap,
      verticalAlignment,
      ...props
    },
    ref
  ) => {
    const classes: string[] = [];
    if (border) {
      classes.push(`border--${border}`);
    }
    if (displayVertical) {
      classes.push('flex--column');
    }
    if (outlineDebug) {
      classes.push('outline--debug');
    }
    if (overflow) {
      classes.push(overflow);
    }
    if (!shouldWrap) {
      classes.push('row--no-wrap');
    }
    if (paddedContent && paddedContent !== 'none') {
      classes.push(`padded-content--${paddedContent}`);
    }
    if (verticalAlignment) {
      classes.push(`flex-align--${verticalAlignment}`);
    }
    return (
      <Component {...props} ref={ref} className={classNames('row', classes, removeGutters && 'gutters--remove')} />
    );
  }
);

Row.displayName = 'Row';

Row.defaultProps = {
  border: 'none',
  displayVertical: false,
  overflow: undefined,
  outlineDebug: false,
  paddedContent: 'none',
  removeGutters: false,
  shouldWrap: true,
};

export default Row;

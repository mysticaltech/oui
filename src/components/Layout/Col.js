import classNames from 'classnames';
import React from 'react';
import PropTypes from 'prop-types';

const DEVICE_SIZES = ['large', 'small'];
const colSize = PropTypes.oneOfType([
  PropTypes.bool,
  PropTypes.number,
  PropTypes.string,
  PropTypes.oneOf([
    'fitContent',
    'fillSpace',
  ]),
]);

const stringOrNumber = PropTypes.oneOfType([
  PropTypes.number,
  PropTypes.string,
]);

const column = PropTypes.oneOfType([
  /** colSize shorthand */
  colSize,
  PropTypes.shape({
    /** Draw border on this single column. */
    border: PropTypes.oneOf([
      'top',
      'bottom',
      'left',
      'right',
      'sides',
      'ends',
      'all',
    ]),
    /** Push columns around with an offset. */
    offset: stringOrNumber,
    /** Specify a content display order different from HTML source order. */
    order: stringOrNumber,
    /** Pad inner content with a default amount. */
    paddedContent: PropTypes.oneOf([
      'none',
      'around',
      'sides',
      'ends',
      'remove',
    ]),
    /** Size of this column; allows for some shorthand. */
    size: colSize,
  }),
]);

const propTypes = {
  /** Specify an element besides <div>. */
  as: PropTypes.elementType,

  /** Add single border column. */
  border: PropTypes.oneOf([
    'top',
    'bottom',
    'left',
    'right',
    'sides',
    'ends',
    'all',
  ]),

  /** Inner contents. */
  children: PropTypes.node,

  /** Whether or not this is a reading column layout */
  isReadingColumn: PropTypes.bool,

  /**
   * The number of columns to span on large devices (≥992px)
   *
   * @type {("fillSpace"|"fitContent"|number|
   *  { span: "fillSpace"|"fitContent"|number, offset: number, order: number }
   * )}
   */
  large: column,

  /**
   * Force overflow scrolling
   */
  overflow: PropTypes.oneOf([
    'overflow-y--scroll',
    'overflow-x--auto',
    'overflow-y--auto',
  ]),

  /** Add default amount of padding. */
  paddedContent: PropTypes.oneOf([
    'around',
    'sides',
    'ends',
  ]),

  /**
   * The number of columns to span on small devices (≥576px)
   *
   * @type {("fillSpace"|"fitContent"|number|
   *  { span: "fillSpace"|"fitContent"|number, offset: number, order: number }
   * )}
   */
  small: column,

};

const defaultProps = {
  as: 'div',
  isReadingColumn: false,
};

const Col = React.forwardRef(
  ({ border, overflow, paddedContent, isReadingColumn, as: Component, ...props }, ref) => {
    const prefix = 'col';
    const spans = [];
    const classes = [];

    if (border) {
      classes.push(`border--${border}`);
    }

    if (overflow) {
      classes.push(overflow);
      classes.push('height--1-1');
    }

    if (paddedContent && paddedContent !== 'none') {
      classes.push(`padded-content--${paddedContent}`);
    }

    if (isReadingColumn) {
      classes.push('reading-column');
    }

    DEVICE_SIZES.forEach(brkPoint => {
      let propValue = props[brkPoint];
      delete props[brkPoint];

      let span;
      let offset;
      let order;
      if (propValue !== null && propValue !== undefined && typeof propValue === 'object') {
        ({ span = 'fillSpace', offset, order } = propValue);
      } else {
        span = propValue;
      }

      if (offset !== null && offset !== undefined) {
        classes.push(`offset-${brkPoint}-${offset}`);
      }

      if (order !== null && order !== undefined) {
        classes.push(`order-${brkPoint}-${order}`);
      }

      if (span !== null && span !== undefined) {
        spans.push(
          span === 'fillSpace' ? `${prefix}-${brkPoint}` : `${prefix}-${brkPoint}-${span}`,
        );
      }

    });

    if (!spans.length) {
      spans.push(prefix); // plain 'col'
    }

    return (
      <Component
        { ...props }
        ref={ ref }
        className={ classNames(
          ...spans,
          ...classes
        ) }
      />
    );
  },
);

Col.displayName = 'Col';
Col.propTypes = propTypes;
Col.defaultProps = defaultProps;

export default Col;

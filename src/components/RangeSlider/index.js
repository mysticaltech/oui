import PropTypes from 'prop-types';
import React from 'react';
import classnames from 'classnames';

import { FILL_COLOR_MAP } from '../../utils/accessibility';

const DEFAULT_FILL_COLOR_NAME = 'default';

const RangeSlider = (props) => {
  const {
    fillColorName,
    value,
    onChange,
    isDisabled,
  } = props;

  const rangeClasses = classnames({
    'oui-rangeslider': true,
    'oui-rangeslider--disabled': isDisabled,
  });

  // ensure valid fillColor name (in the case that propType errors are ignored)
  const validFillColorName = Object.keys(FILL_COLOR_MAP).includes(fillColorName) ? fillColorName : DEFAULT_FILL_COLOR_NAME;
  const fillColor = FILL_COLOR_MAP[validFillColorName];

  return (
    <div className={ rangeClasses } data-test-section={ props.testSection }>
      <div className="oui-grid">
        <div className="oui-grid__cell position--relative">
          <div className="range-labels flex">
            <label className="oui-label muted flush flex--1">
              {props.useOffForLabel ? 'Off' : '0%'}
            </label>
            <label className="oui-label muted flush">100%</label>
          </div>
          <div className="range-display">
            <svg
              preserveAspectRatio="none"
              xmlns="http://www.w3.org/2000/svg"
              width="256"
              height="256"
              viewBox="0 0 256 256">
              <path fill={ fillColor } d="M0 256h256V0z"/>
            </svg>
            <div
              className="range-display range-display-overlay"
              style={{ left: value + '%' }}>
            </div>
          </div>
          <div className="range-grid">
            <div className="gridline grid-1"></div>
            <div className="gridline grid-2"></div>
            <div className="gridline grid-3"></div>
            <div className="gridline grid-4"></div>
            <div className="gridline grid-5"></div>
            <div className="gridline gridline-half grid-h1"></div>
            <div className="gridline gridline-half grid-h2"></div>
            <div className="gridline gridline-half grid-h3"></div>
            <div className="gridline gridline-half grid-h4"></div>
          </div>
          <input
            className="hard position--relative width--1-1"
            data-traffic-group="1"
            type="range"
            min="0"
            max="100"
            step="1"
            value={ value }
            onChange={ onChange }
            disabled={ isDisabled }
          />
        </div>
      </div>
    </div>
  );
};

RangeSlider.propTypes = {
  /** Custom color for slider **/
  fillColorName: PropTypes.oneOf(Object.keys(FILL_COLOR_MAP)),
  /** Whether it is disabled, will render as greyscale if so **/
  isDisabled: PropTypes.bool,
  /** onChange function */
  onChange: PropTypes.func,
  /** Hook for automated JavaScript tests */
  testSection: PropTypes.string,
  /** When true, uses 'Off' instead of '0%' */
  useOffForLabel: PropTypes.bool,
  /** The value */
  value: PropTypes.number,
};

RangeSlider.defaultProps = {
  fillColorName: DEFAULT_FILL_COLOR_NAME,
  isDisabled: false,
  onChange: undefined,
  testSection: undefined,
  useOffForLabel: false,
  value: undefined,
};

export default RangeSlider;

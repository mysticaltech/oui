import React from 'react';
import PropTypes from 'prop-types';
import classNames from 'classnames';
import Label from '../Label';

/**
 * Generates an <select> element
 * @param {Object} props - Properties passed to component
 * @returns {ReactElement}
 */

const Select = ({
  children,
  displayError,
  id,
  isDisabled,
  isFullWidth,
  isOptional,
  isRequired,
  label,
  onChange,
  name,
  note,
  testSection,
}) => {
  const renderSelect = (
    <select
      data-oui-component={ true }
      data-test-section={ testSection }
      disabled={ isDisabled }
      required={ isRequired }
      name={ name }
      id={ id }
      className={ classNames('oui-select', { 'width--1-1': isFullWidth }) }
      onChange={ onChange }>
      {isRequired && <option value="">Please select an option</option>}
      {children}
    </select>
  );

  if (label) {
    return (
      <div
        data-oui-component={ true }
        className={ classNames({ 'oui-form-bad-news': displayError }) }>
        <Label isRequired={ isRequired } isOptional={ isOptional } inputId={ id }>
          {label}
        </Label>
        {renderSelect}
        {note && (
          <div
            className="oui-form-note"
            data-test-section={ testSection && testSection + '-note' }>
            {note}
          </div>
        )}
      </div>
    );
  }
  return renderSelect;
};

Select.propTypes = {
  /** options elements */
  children: PropTypes.node,
  /** Whether or not this Select should be in an error state */
  displayError: PropTypes.bool,
  /** Select ID */
  id: PropTypes.string,
  /** Boolean for when Select is disabled */
  isDisabled: PropTypes.bool,
  /** Boolean to make Select take up 100% width of container */
  isFullWidth: PropTypes.bool,
  /** Boolean to indicate this Select is optional */
  isOptional: PropTypes.bool,
  /** Boolean to indicate this Select is required */
  isRequired: PropTypes.bool,
  /** The label for the Select */
  label: PropTypes.string,
  /** Select name */
  name: PropTypes.string,
  /** Message to show underneath the Select */
  note: PropTypes.string,
  /** Function that fires when value of the select changes */
  onChange: PropTypes.func,
  /** Hook for automated JavaScript tests */
  testSection: PropTypes.string,
};

Select.displayName = 'Select';

export default Select;

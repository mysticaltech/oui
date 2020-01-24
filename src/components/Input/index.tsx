import React, { useCallback } from 'react';
import classNames from 'classnames';

import Label from '../Label';

type InputProps = {
  /** The default value of the input used on initial render */
  defaultValue?: string;

  /** Includes search icon if true */
  displayError?: boolean;

  /** Whether or not to automatically focus this input */
  focus?: boolean;

  /** Id of the input to properly associate with the input's label */
  id?: string;

  /** Prevents input from being modified and appears disabled */
  isDisabled?: boolean;

  /** Includes error if true */
  isFilter?: boolean;

  /** Adds an optional label if there is a label provided */
  isOptional?: any;

  /** Prevents input from being modified but doesn't appear disabled */
  isReadOnly?: boolean;

  /** Includes required asterisk label if true */
  isRequired?: any;

  /** Text that describes the input */
  label?: string;

  /**
   * Max value for the `input`. Should be used only when `type` is `number`.
   */
  max?: number;

  /**
   * Max length of the input value. Should be used only when type is 'text',
   * 'email', 'search', 'password', 'tel', or 'url'.
   */
  maxLength?: number;

  /**
   * Min value for the `input`. Should be used only when `type` is `number`.
   */
  min?: number;

  /** Form note for the input */
  note?: string | null;

  /**
   * Function that fires when the input loses focus. It fires regardless of
   * whether the value has changed.
   */
  onBlur?: (...args: any[]) => any;

  /** Function that fires when the input loses focus after the value changes */
  onChange?: (...args: any[]) => any;

  /** Function that fires when the input is clicked */
  onClick?: (...args: any[]) => any;

  /** Function that fires when the input gains focus */
  onFocus?: (...args: any[]) => any;

  /** Function that fires anytime the input value changes */
  onInput?: (...args: any[]) => any;

  /** Function that fires when a key is pressed down */
  onKeyDown?: (...args: any[]) => any;

  /** Passthrough handler for onMouseDown */
  onMouseDown?: (...args: any[]) => any;

  /** Passthrough handler for onMouseLeave */
  onMouseLeave?: (...args: any[]) => any;

  /** Passthrough handler for onMouseOver */
  onMouseOver?: (...args: any[]) => any;

  /** Input placeholder text */
  placeholder?: string;

  /** Input step value */
  step?: string;

  /** Hook for automated JavaScript tests */
  testSection?: string;

  /** Align text inside input. Default is left. */
  textAlign?: 'left' | 'right';

  /** Supported input types */
  type: 'text' | 'password' | 'date' | 'number' | 'email' | 'url' | 'search' | 'tel' | 'time';

  /** Text within the input */
  value?: string | number;
};

const Input: React.SFC<InputProps> = React.forwardRef((props, ref?: React.Ref<HTMLInputElement>) => {
  const {
    defaultValue,
    displayError,
    focus,
    id,
    isDisabled,
    isFilter,
    isOptional,
    isRequired,
    isReadOnly,
    label,
    max,
    maxLength,
    min,
    note,
    onBlur,
    onChange,
    onClick,
    onFocus,
    onInput,
    onKeyDown,
    onMouseDown,
    onMouseLeave,
    onMouseOver,
    placeholder,
    step,
    testSection,
    textAlign,
    type,
    value,
  } = props;
  const renderNote = useCallback(
    () => (
      <div className="oui-form-note" data-test-section={testSection && testSection + '-note'}>
        {note}
      </div>
    ),
    [note, testSection]
  );
  const renderInput = () => {
    let hasAlignStyle = false;
    if (textAlign) {
      hasAlignStyle = true;
    }
    let classes = classNames(
      'oui-text-input',
      { 'oui-text-input--read-only': isReadOnly },
      { 'oui-text-input--search': isFilter },
      { 'oui-form-bad-news': displayError },
      { [`text--${textAlign}`]: hasAlignStyle }
    );
    return (
      <input
        data-oui-component={true}
        className={classes}
        id={id}
        ref={ref}
        type={type}
        value={value}
        defaultValue={defaultValue}
        placeholder={placeholder}
        required={isRequired}
        readOnly={isReadOnly}
        disabled={isDisabled}
        onInput={onInput}
        onChange={onChange}
        onClick={onClick}
        onBlur={onBlur}
        onKeyDown={onKeyDown}
        onFocus={onFocus}
        onMouseDown={onMouseDown}
        onMouseLeave={onMouseLeave}
        onMouseOver={onMouseOver}
        min={min}
        max={max}
        step={step}
        {...(typeof maxLength === 'undefined' ? {} : { maxLength })}
        data-test-section={testSection}
        autoFocus={focus}
      />
    );
  };
  if (label) {
    return (
      <div data-oui-component={true} className={classNames({ 'oui-form-bad-news': displayError })}>
        <Label
          testSection={testSection && testSection + '-label'}
          isRequired={isRequired}
          isOptional={isOptional}
          inputId={id}
        >
          {label}
        </Label>
        {renderInput()}
        {note && renderNote()}
      </div>
    );
  }
  return (
    <React.Fragment>
      {renderInput()}
      {note && renderNote()}
    </React.Fragment>
  );
});

Input.propTypes = {
  /** Adds an optional label if there is a label provided
   *  @param {Object} props Object of props
   *  @returns {Error} Error or null
   */
  isOptional: function verifyIsOptionalProp(props) {
    if (props.isOptional && !props.label) {
      return new Error('Must include a value for the label prop to use the isOptional prop');
    }
    return null;
  },
  /** Includes required asterisk label if true
   *  @param {Object} props Object of props
   *  @returns {Error} Error or null
   */
  isRequired: function verifyIsRequiredProp(props) {
    if (props.isRequired && !props.label) {
      return new Error('Must include a value for the label prop to use the isRequired prop');
    }
    return null;
  },
};

Input.displayName = 'Input';
Input.defaultProps = {
  note: null,
  isRequired: false,
};

export default Input;

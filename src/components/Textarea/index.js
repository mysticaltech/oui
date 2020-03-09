import React from 'react';
import Label from '../Label';
import classNames from 'classnames';
import PropTypes from 'prop-types';

/**
 * Generates a `textarea` element.
 * @param {Object} props - Properties passed to component
 * @returns {ReactElement}
 */
class Textarea extends React.Component {
  blur() {
    if (this._textarea) {
      this._textarea.blur();
    }
  }

  renderTextarea({
    defaultValue,
    displayError,
    focus,
    isReadOnly,
    isRequired,
    isDisabled,
    maxLength,
    numRows,
    onBlur,
    onChange,
    onFocus,
    onInput,
    onKeyDown,
    placeholder,
    testSection,
    value,
  }) {
    const classes = classNames(
      {'oui-textarea': true},
      {'oui-form-bad-news': displayError},
    );

    return (
      /* eslint-disable react/jsx-no-bind */
      <textarea
        data-oui-component={ true }
        className={ classes }
        ref={ (c) => { this._textarea = c; } }
        value={ value }
        defaultValue={ defaultValue }
        placeholder={ placeholder }
        required={ isRequired }
        readOnly={ isReadOnly }
        disabled={ isDisabled }
        { ...(typeof maxLength === 'undefined' ? {} : { maxLength }) }
        maxLength={ maxLength }
        rows={ numRows }
        onInput={ onInput }
        onChange={ onChange }
        onBlur={ onBlur }
        onKeyDown={ onKeyDown }
        onFocus={ onFocus }
        autoFocus={ focus }
        data-test-section={ testSection }
      />
      /* eslint-enable react/jsx-no-bind */
    );
  }

  renderNote({note, testSection}) {
    return (<div className='oui-form-note' data-test-section={ testSection && testSection + '-note' }>{note}</div>);
  }

  render() {
    const {
      label,
      displayError,
      testSection,
      isOptional,
      isRequired,
      note,
    } = this.props;

    if (label) {
      return (
        <div
          data-oui-component={ true }
          className={ classNames({'oui-form-bad-news': displayError}) }>
          <Label testSection={ testSection && testSection + '-label' }>
            <div className="oui-label">
              { label }
              { isOptional && <span className="oui-label__optional">(Optional)</span> }
              { isRequired && <span className="oui-label--required"></span> }
            </div>
            { this.renderTextarea(this.props) }
          </Label>
          { note && this.renderNote(this.props)}
        </div>
      );
    }

    if (note) {
      return [
        this.renderTextarea(this.props),
        this.renderNote(this.props),
      ];
    }

    return this.renderTextarea(this.props);
  }
}

Textarea.propTypes = {
  /** The default value of the textarea used on initial render */
  defaultValue: PropTypes.string,
  /** Shows error styling if true */
  displayError: PropTypes.bool,
  /** Auto focus the Textaraea if true */
  focus: PropTypes.bool,
  /** Prevents textarea from being modified and appears disabled */
  isDisabled: PropTypes.bool,
  /** Adds an optional label if there is a label provided
   *  @param {Object} props Object of props
   *  @returns {Error} Error or null
   */
  isOptional: function verifyIsOptionalProp(props) {
    if (props.isOptional && !props.label) {
      return new Error('Must include a value for the label prop to use the isOptional prop');
    }
    if (props.isOptional && props.isRequired) {
      return new Error('Textarea cannot be both optional and required, please pick one ');
    }
    return null;
  },
  /** Prevents textarea from being modified but doesn't appear disabled */
  isReadOnly: PropTypes.bool,
  /** Prevents textarea from being submitted without value */
  isRequired: PropTypes.bool,
  /** Text that describes the textarea */
  label: PropTypes.string,
  /**
   * Max length of the input value
   */
  maxLength: PropTypes.number,
  /** Form note for the input */
  note: PropTypes.string,
  /** Number of rows to fit in the textarea */
  numRows: PropTypes.number,
  /**
    Function that fires when the textarea loses focus. It fires regardless of
    whether the value has changed.
  */
  onBlur: PropTypes.func,
  /**
    Function that fires when the textarea loses focus after the value
    changes
  */
  onChange: PropTypes.func,
  /** Function that fires when the textarea gains focus */
  onFocus: PropTypes.func,
  /** Function that fires the the textarea value changes */
  onInput: PropTypes.func,
  /** Function that fires when a key is pressed down */
  onKeyDown: PropTypes.func,
  /** Textarea placeholder text */
  placeholder: PropTypes.string,
  /** Hook for automated JavaScript tests */
  testSection: PropTypes.string,
  /** Text within the textarea */
  value: PropTypes.string,
};

Textarea.defaultProps = {
  displayError: false,
  focus: false,
  label: null,
  note: null,
  numRows: 3,
  isOptional: false,
};

export default Textarea;

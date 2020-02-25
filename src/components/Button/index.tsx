import React from 'react';
import classNames from 'classnames';
import Spinner from '../Spinner';

type ButtonTypes = 'submit' | 'button';
type AnyRef = React.Ref<any> | null;
type ButtonRef = React.Ref<HTMLButtonElement> | null;
type DivRef = React.Ref<HTMLDivElement> | null;

export interface ButtonProps {
  /** Describes buttons that have an icon but no text */
  ariaLabel?: string,
  /** React ref to the underlying button component */
  buttonRef?: AnyRef,
  /** Text within the button */
  children: React.ReactNode,
  /** Render button with active state */
  isActive?: boolean,
  /** Prevent users from interacting with the button */
  isDisabled?: boolean,
  /** Changes the button to a div for insertion within a Link component */
  isLink?: boolean,
  /** When true, adds a spinner to the button and disables the button */
  isLoading?: boolean,
  /** Make the button act as a submit button */
  isSubmit?: boolean,
  /** When the button adds a spinner, it displays this text */
  loadingText?: string,
  /** Function that fires when the button loses focus */
  onBlur?: (e: React.FocusEvent<HTMLButtonElement|HTMLDivElement>) => void,
  /** Function that fires when the button is clicked on */
  onClick?: (e: React.MouseEvent) => void,
  /** Function that fires when the button is mouse downed */
  onMouseDown?: (e: React.MouseEvent) => void,
  /** Various height and width options */
  size?: 'tiny' | 'small' | 'large' | 'narrow' | 'tight' | null,
  /** Various color options */
  style?: 'highlight' | 'danger' | 'danger-outline' | 'outline' | 'outline-reverse' | 'plain' | 'toggle' | 'underline' | 'unstyled' | null,
  /** Hook for automated JavaScript tests */
  testSection?: string,
  /** Title of the button shown as tooltip text when the button is hovered */
  title?: string,
  /** Various height and width options */
  width?: 'default' | 'full',
};

/**
 * @param {Object} props - Properties passed to component
 * @returns {ReactElement}
 */

const Button = ({
  ariaLabel = '',
  isSubmit = false,
  isLink = false,
  children,
  isActive = false,
  isDisabled = false,
  isLoading = false,
  loadingText = '',
  onBlur = () => {},
  onClick = () => {},
  onMouseDown = () => {},
  size = null,
  style = null,
  testSection = '',
  width = 'default',
  buttonRef = null,
  title = '',
}: ButtonProps) => {

  const buttonClassNames: string = classNames(
    'oui-button', {
      [`oui-button--${style}`]: style,
      [`oui-button--${size}`]: size,
      [`oui-button--${width}`]: width,
      'is-active': isActive,
      'oui-button--loading': isLoading,
    });

  const type: ButtonTypes = isSubmit ? 'submit' : 'button';

  function handleOnClick(event: React.MouseEvent): void {
    if (isDisabled || isLoading) {
      return;
    }
    onClick(event);
  }

  if (isLink) {
    const ref: DivRef = buttonRef;
    return (
      <div
        data-oui-component={ true }
        className={ buttonClassNames }
        onBlur={ onBlur }
        data-test-section={ testSection }
        ref={ ref }>
        { children }
      </div>
    );
  }

  const ref: ButtonRef = buttonRef;

  return (
    <button
      data-oui-component={ true }
      className={ buttonClassNames }
      disabled={ isDisabled || isLoading }
      type={ type }
      onBlur={ onBlur }
      onClick={ handleOnClick }
      onMouseDown={ onMouseDown }
      data-test-section={ testSection }
      aria-label={ ariaLabel }
      aria-live="polite"
      title={ title }
      ref={ ref }>
      { isLoading && <Spinner data-test-section="button-spinner" size="tiny"/> }
      { isLoading ? loadingText || 'Processing' : children }
    </button>
  );
};

Button.displayName = 'Button';

export default Button;

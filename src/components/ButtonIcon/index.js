import PropTypes from 'prop-types';
import React from 'react';
import Icon from 'react-oui-icons';
import classNames from 'classnames';
import { FILL_COLOR_MAP } from '../../utils/accessibility';

const ButtonIcon = ({
  iconFill,
  iconName,
  isDisabled,
  onClick,
  size,
  style,
  testSection,
  title,
}) => {

  // ensure valid fillColor name (in the case that propType errors are ignored)
  const fillColor = iconFill && Object.keys(FILL_COLOR_MAP).includes(iconFill) ? FILL_COLOR_MAP[iconFill] : null;

  function handleOnClick(event) {
    if (isDisabled) {
      return;
    }
    onClick(event);
  }

  return (
    <button
      className={ classNames('oui-button', 'oui-button-icon', `oui-button-icon__${size}`, `oui-button--${style}`) }
      data-oui-component={ true }
      data-test-section={ testSection }
      disabled={ isDisabled }
      onClick={ handleOnClick }
      title={ title }>
      <Icon name={ iconName } size={ size } fill={ fillColor }/>
    </button>
  );
};

ButtonIcon.propTypes = {
  /**
   *  Color to use for the fill of the icon
   */
  iconFill: PropTypes.oneOf(Object.keys(FILL_COLOR_MAP)),
  /**
   *  Name of the icon to use
   */
  iconName: PropTypes.string.isRequired,
  /**
   * Prevent users from interacting with the button
   */
  isDisabled: PropTypes.bool,
  /**
   *  Function to perform when the close button is clicked.
   */
  onClick: PropTypes.func.isRequired,
  /**
   *  Size of the button, medium by default
   */
  size: PropTypes.oneOf(['small', 'medium', 'large']),
  /**
   *  Various style options
   */
  style: PropTypes.oneOf([
    'highlight',
    'danger',
    'danger-outline',
    'outline',
    'plain',
  ]),
  /**
   * Hook for automated JavaScript tests
   */
  testSection: PropTypes.string,
  /**
   *  Title of the button used on hover and for screen readers
   */
  title: PropTypes.string.isRequired,
};

ButtonIcon.defaultProps = {
  iconName: 'add',
  onClick: () => {},
  size: 'medium',
  title: '',
};

export default ButtonIcon;

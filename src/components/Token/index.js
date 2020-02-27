import React from 'react';
import PropTypes from 'prop-types';
import Icon from 'react-oui-icons';
import DismissButton from './DismissButton';
import classNames from 'classnames';

const LIGHT_BACKGROUND_STYLES = ['tertiary'];

// Light backgrounds require a dark font and dismiss Icon color.
const getStylingInfo = style =>
  LIGHT_BACKGROUND_STYLES.includes(style)
    ? { fontClass: 'oui-token--font-dark', fillColor: 'black' }
    : { fontClass: 'oui-token--font-light', fillColor: 'white' };

/**
 * Token to be used to make token lists.
 * @param {Object} props - Properties passed to component
 * @returns {ReactElement}
 */
const Token = ({
  description,
  dragHandleProps,
  hasSnugWrap,
  hasWrap,
  isDismissible,
  isDraggable,
  isFullWidth,
  name,
  onDismiss,
  order,
  style,
  showWell,
  testSection,
  usesDragHandle,
}) => {
  const classes = classNames('flex', {
    'oui-token-wrap': hasWrap && !hasSnugWrap,
    'oui-token-wrap--snug': hasSnugWrap,
    'oui-token-wrap--well': showWell,
    'oui-token--full-width': isFullWidth,
  });
  const tokenToolsClasses = classNames({
    'oui-token-tool': isDraggable || order,
    'cursor--grab': isDraggable,
  });
  const { fontClass, fillColor } = getStylingInfo(style);

  if (usesDragHandle) {
    return (
      /* eslint-disable react/jsx-boolean-value */
      <div
        data-oui-component={ true }
        className={ classes }
        data-test-section={ testSection }>
        <div className={ `oui-token oui-token--${style}` }>
          <div className="flex flex-align--center">
            <div className={ tokenToolsClasses } data-token-handle>
              {order && <span className="oui-token__number">{order}</span>}
              {isDraggable && (
                <div className="oui-icon oui-token__move push--right oui-token__move--drag-handle" { ...dragHandleProps }>
                  <Icon name="hamburger" fill="#ffffff" />
                </div>
              )}
            </div>
            <div className={ fontClass }>
              {name}
              {description && (
                <div className="oui-token__description">{description}</div>
              )}
            </div>
          </div>
          {isDismissible && onDismiss && (
            <DismissButton
              onClick={ onDismiss }
              fill={ fillColor }
              testSection={ testSection }
            />
          )}
        </div>
      </div>
      /* eslint-enable */
    );
  }

  return (
    /* eslint-disable react/jsx-boolean-value */
    <div
      data-oui-component={ true }
      className={ classes }
      data-test-section={ testSection }>
      <div
        className={ tokenToolsClasses }
        data-token-handle>
        { order &&
          <span className="oui-token__number">
            { order }
          </span>
        }
        { isDraggable &&
          <div className="oui-icon oui-token__move">
            <Icon name="ellipsis" fill="#c7c7c7" />
          </div>
        }
      </div>
      <div className={ `oui-token oui-token--${style}` }>
        <div className={ fontClass }>
          { name }
          { description &&
            <div className="oui-token__description">
              { description }
            </div>
          }
        </div>
        { (isDismissible && onDismiss) &&
          <DismissButton
            onClick={ onDismiss }
            fill={ fillColor }
            testSection={ testSection }
          />
        }
      </div>
    </div>
    /* eslint-enable */
  );
};

Token.propTypes = {
  /** Description explaining the token */
  description: PropTypes.string,

  /**
   * Set of props provided by react-beautiful-dnd to configure
   * this token's drag handle
   */
  dragHandleProps: PropTypes.object,

  /** Whether or not the token should have a tighter wrap */
  hasSnugWrap: PropTypes.bool,

  /** Whether or not the token should have a wrap */
  hasWrap: PropTypes.bool,

  /**
   * Determines if token has dismissible feature or not. If true, `onDismiss`
   * is required.
   */
  isDismissible: PropTypes.bool,

  /** Shows an icon indicating that the token is draggable */
  isDraggable: PropTypes.bool,

  /** Makes the component full width of container */
  isFullWidth: PropTypes.bool,

  /** Name label on token */
  name: PropTypes.string.isRequired,

  /**
   * Function to call that dismisses the token. Required if the token is
   * dismissible.
   */
  onDismiss: PropTypes.func,

  /** Show a number indicating the token's order */
  order: PropTypes.number,

  /** Whether or not a well is presented around the token. */
  showWell: PropTypes.bool,

  /** Determines style of token depending on priority level or error */
  style: PropTypes.oneOf(['primary', 'secondary', 'tertiary', 'error']),

  /** Hook for automated JavaScript tests */
  testSection: PropTypes.string,

  /** Used to switch drag handle */
  usesDragHandle: PropTypes.bool,
};

Token.defaultProps = {
  dragHandleProps: {},
  hasWrap: true,
  isDismissible: false,
  style: 'secondary',
  showWell: true,
};

export default Token;

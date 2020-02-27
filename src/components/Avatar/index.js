import PropTypes from 'prop-types';
import React from 'react';
import classNames from 'classnames';

const Avatar = ({
  size,
  imageUrl,
  isEmulating,
  testSection,
}) => {

  const avatarClassNames = classNames('oui-avatar', {[`oui-avatar--${size}`]: size, 'color-admin--border': isEmulating });
  const avatarInlineStyles = imageUrl ? { backgroundImage: `url(${imageUrl})` } : {};

  return (
    <div data-test-section={ testSection }>
      <div
        className={ avatarClassNames }
        style={ avatarInlineStyles }
      />
    </div>
  );
};

Avatar.propTypes = {
  /**
   * Image to use for the avatar - default is the anonymous head
   */
  imageUrl: PropTypes.string,
  /**
   * Whether or not the emulating border should appear
   */
  isEmulating: PropTypes.bool,
  /**
   * Size of the avatar, large is default
   */
  size: PropTypes.oneOf(['small', 'medium']),
  /**
   * Data test section to use for testing
   */
  testSection: PropTypes.string,
};

export default Avatar;

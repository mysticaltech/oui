import PropTypes from 'prop-types';
import React from 'react';
import OverlayWrapper from '../OverlayWrapper';
import Popover from '../Popover';
import Icon from 'react-oui-icons';

const HelpPopover = ({
  behavior,
  children,
  horizontalAttachment,
  iconSize,
  isConstrainedToScreen,
  popoverTitle,
  verticalAttachment,
  testSection,
}) => (
  <OverlayWrapper
    behavior={ behavior }
    horizontalAttachment={ horizontalAttachment }
    isConstrainedToScreen={ isConstrainedToScreen }
    overlay={
      <Popover title={ popoverTitle }>
        { children }
      </Popover>
    }
    testSection={ testSection }
    verticalAttachment={ verticalAttachment }>
    <span
      className="cursor--pointer push-half--left"
      data-test-section="help-popover-icon">
      <Icon
        name="help"
        size={ iconSize }
      />
    </span>
  </OverlayWrapper>
);

HelpPopover.propTypes = {
  /** Event to listen to and open the overlay */
  behavior: PropTypes.oneOf(['click', 'hover']),
  /** Description of thing that the person hovered for. */
  children: PropTypes.node.isRequired,
  /** Side of the `overlay` that should attach to the `children` */
  horizontalAttachment: PropTypes.oneOf(['left', 'center', 'right']),
  /** Size of icon */
  iconSize: PropTypes.oneOf(['small', 'medium', 'large']),
  /** Attach `overlay` to an edge of the screen if it is going to move off */
  isConstrainedToScreen: PropTypes.bool,
  /** Title of thing that is being described. */
  popoverTitle: PropTypes.string,
  /** Test section */
  testSection: PropTypes.string,
  /** Vertical edge of the `overlay` that should touch the `children` */
  verticalAttachment: PropTypes.oneOf(['top', 'middle', 'bottom']),
};

HelpPopover.defaultProps = {
  behavior: 'click',
  iconSize: 'medium',
  isConstrainedToScreen: true,
  testSection: 'help-popover',
};

export default HelpPopover;

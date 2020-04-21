import classNames from 'classnames';
import React from 'react';

type ContainerProps = {
  /**
   * Use a custom element for this component
   */
  as?: React.ElementType;

  /**
   * Allow the Container to fill available horizontal space.
   */
  fluid?: boolean;

  /**
   * Allow the Container to fill available vertical space.
   */
  isFullHeight?: boolean;

  /**
   * For testing/debugging only -- show hotpink grid borders and backgrounds.
   */
  outlineDebug?: boolean;

  /**
   * Pad inner content.
   */
  paddedContent?: 'none' | 'around' | 'sides' | 'ends' | 'remove';

  /**
   * Remove first and last child side padding.
   */
  pullRowPadding?: boolean;

  /**
   * Add top margin space between rows.
   */
  pushRowsTop?: boolean;
};

const Container: React.SFC<ContainerProps> = React.forwardRef(
  ({ as: Component = 'div', fluid, isFullHeight, outlineDebug, paddedContent, pullRowPadding, pushRowsTop, ...props }, ref) => {
    const prefix = 'container';
    return (
      <Component
        ref={ref}
        {...props}
        className={classNames(
          fluid ? `${prefix}-fluid` : prefix,
          isFullHeight && 'height--1-1',
          outlineDebug && 'outline--debug',
          paddedContent && `padded-content--${paddedContent}`,
          pullRowPadding && 'container--pull',
          pushRowsTop && 'push-rows--top'
        )}
      />
    );
  }
);

Container.displayName = 'Container';

Container.defaultProps = {
  fluid: false,
  isFullHeight: false,
};

export default Container;

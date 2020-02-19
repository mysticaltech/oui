import React from 'react';
import PropTypes from 'prop-types';
import classNames from 'classnames';

const TH = ({
  children,
  colSpan,
  isCollapsed,
  isNumerical,
  maxWidth,
  minWidth,
  width,
  testSection,
}) => {
  let classes = classNames({
    'oui-numerical': isNumerical,
    'oui-cell-collapse': isCollapsed,
  });

  const styles = {
    maxWidth,
    minWidth,
    width,
  };

  return (
    <th
      className={ classes }
      data-test-section={ testSection }
      style={ styles }
      colSpan={ colSpan }>
      { children }
    </th>
  );
};

TH.propTypes = {
  /** Content within the `Table.TH` component */
  children: PropTypes.node,
  /** Number of columns that the cell should span */
  colSpan: PropTypes.number,
  /**
    Tell the cell to take up the least amount of width possible. This only
    works well if the table layout is `auto`, not `fixed`.
  */
  isCollapsed: PropTypes.bool,
  /** Right-align the cell if the contents are numerical */
  isNumerical: PropTypes.bool,
  /** Hook for automated JavaScript tests */
  testSection: PropTypes.string,
  /** A number with a unit that becomes the width of the `Table` cell */
  width: PropTypes.string,
};

TH.defaultProps = {
  isCollapsed: false,
  isNumerical: false,
};

TH.displayName = 'Table.TH';

export default TH;

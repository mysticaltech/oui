import PropTypes from 'prop-types';
import React from 'react';
import classNames from 'classnames';

const Toolbar = (props) => {
  const toolbarContentClasses = classNames({
    toolbar__content: true,
    'background--white': props.isBottomToolbar,
    'border--top': props.isBottomToolbar,
    'no-border--bottom': props.isBottomToolbar,
    'hard--left': props.isBottomToolbar,
  });

  return (
    <div
      data-oui-component={ true }
      className="toolbar"
      data-test-section={ props.testSection }>
      <div className={ toolbarContentClasses }>
        { props.children }
      </div>
    </div>
  );
};

Toolbar.defaultProps = {
  isBottomToolbar: false,
};

Toolbar.propTypes = {
  children: PropTypes.node.isRequired,
  isBottomToolbar: PropTypes.bool,
  testSection: PropTypes.string,
};

const Left = props => {
  return (
    <div className="toolbar__left">{ props.children }</div>
  );
};

Left.propTypes = {
  children: PropTypes.node.isRequired,
};

const Right = props => {
  return (
    <div className="toolbar__right">{ props.children }</div>
  );
};

Right.propTypes = {
  children: PropTypes.node.isRequired,
};

const ToolbarButtonContents = props => (
  <div className="flex flex-align--center editor__select-size__text">
    { props.icon && (
      <svg className="lego-icon push--right vertical-align--middle">
        <use xlinkHref={ props.icon } />
      </svg>
    )}
    <div>
      { props.title && (
        <div className="editor__select-size__value">
          { props.title }
        </div>
      )}

      <span>{ props.label }</span>
    </div>

    { props.isDropdown && (
      <span className="lego-arrow-inline--down push--left" />
    )}
  </div>
);

ToolbarButtonContents.propTypes = {
  icon: PropTypes.string,
  isDropdown: PropTypes.bool,
  label: PropTypes.oneOfType([
    PropTypes.string.isRequired,
    PropTypes.node.isRequired,
  ]).isRequired,
  title: PropTypes.string,
};

const ToolbarLink = (props, context) => (
  <a
    className={ classNames({
      flex: true,
      toolbar__button: true,
      'is-active': props.isActive,
      ['link--disabled']: props.isDisabled,
      'pointer-events--none': props.isDisabled,
    }) }
    data-test-section={ props.testSection }
    href={ props.href }>
    { ToolbarButtonContents(props) }
  </a>
);

ToolbarLink.propTypes = {
  href: PropTypes.string,
  icon: PropTypes.string,
  isActive: PropTypes.bool,
  isDisabled: PropTypes.bool,
  isDropdown: PropTypes.bool,
  label: PropTypes.oneOfType([
    PropTypes.string.isRequired,
    PropTypes.node.isRequired,
  ]).isRequired,
  onClick: PropTypes.func,
  testSection: PropTypes.string,
  title: PropTypes.string,
};

const ToolbarButton = (props, context) => (
  <button
    className={ classNames({
      toolbar__button: true,
      'is-active': props.isActive,
    }) }
    type="button"
    disabled={ props.isDisabled }
    data-test-section={ props.testSection }
    data-track-id={ props.testSection }
    onClick={ props.onClick }>
    { ToolbarButtonContents(props) }
  </button>
);

ToolbarButton.propTypes = {
  icon: PropTypes.string,
  isActive: PropTypes.bool,
  isDisabled: PropTypes.bool,
  isDropdown: PropTypes.bool,
  label: PropTypes.oneOfType([
    PropTypes.node.isRequired,
    PropTypes.string.isRequired,
  ]).isRequired,
  onClick: PropTypes.func,
  testSection: PropTypes.string,
  title: PropTypes.string,
};

ToolbarButton.defaultProps = {
  isDropdown: false,
  isActive: false,
  isDisabled: false,
};

Toolbar.Button = ToolbarButton;
Toolbar.Link = ToolbarLink;
Toolbar.Right = Right;
Toolbar.Left = Left;

export default Toolbar;

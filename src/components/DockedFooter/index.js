import PropTypes from 'prop-types';
import React from 'react';
import ButtonRow from '../ButtonRow';
import classNames from 'classnames';

class DockedFooter extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      isDocked: true,
      listenersSet: false,
      dockedFooterNode: null,
      parentNode: null,
      atBottom: true,
      shouldDockByHeight: true,
    };
    this.dockedFooterRef = React.createRef();
    this.storeThisNode = this.storeThisNode.bind(this);
    this.domNodesInState = this.domNodesInState.bind(this);
    this.setShouldDockByHeight = this.setShouldDockByHeight.bind(this);
    this.setAtBottom = this.setAtBottom.bind(this);
    this.setEventListeners = this.setEventListeners.bind(this);
    this.throttle = this.throttle.bind(this);
  }

  componentDidMount() {
    this.storeThisNode();
  }

  componentDidUpdate(prevProps, prevState) {
    if (this.props.scrollRef !== prevProps.scrollRef) {
      this.setState({ parentNode: this.props.scrollRef });
    }

    if (this.state.parentNode !== prevState.parentNode) {
      this.setShouldDockByHeight();
      this.setAtBottom();
    }

    if (this.state.shouldDockByHeight !== prevState.shouldDockByHeight) {
      this.setState({ isDocked: this.state.shouldDockByHeight});
    }

    if (this.state.atBottom !== prevState.atBottom) {
      this.setState({ isDocked: !this.state.atBottom});
    }

    this.setEventListeners();
  }

  storeThisNode() {
    if (this.dockedFooterRef.current !== null) {
      this.setState({ dockedFooterNode: this.dockedFooterRef.current });
    }
  }

  domNodesInState() {
    return !!this.state.dockedFooterNode && !!this.state.parentNode;
  }

  setEventListeners() {
    if (!this.state.listenersSet && this.domNodesInState()) {
      let scrollContainer = this.state.parentNode;
      window.addEventListener(
        'resize',
        this.throttle(3, this.setShouldDockByHeight),
        { passive: false },
        { useCapture: true }
      );
      window.addEventListener(
        'mousemove',
        this.throttle(3, this.setShouldDockByHeight),
        { passive: false },
        { useCapture: true }
      );
      scrollContainer.addEventListener(
        'scroll',
        this.throttle(3, this.setAtBottom),
        { passive: true }
      );
      scrollContainer.addEventListener(
        'wheel',
        this.throttle(3, this.setAtBottom),
        { passive: true }
      );
      scrollContainer.addEventListener('click', this.setShouldDockByHeight, {
        passive: true,
      });
      scrollContainer.addEventListener('keydown', this.setShouldDockByHeight, {
        passive: true,
      });
      this.setState({ listenersSet: true });
    }
  }

  throttle(delay, fn) {
    let lastCall = 0;
    return function(...args) {
      const now = (new Date()).getTime();
      if (now - lastCall < delay) {
        return;
      }
      lastCall = now;
      return fn(...args);
    };
  }

  setShouldDockByHeight() {
    if (this.domNodesInState()) {
      const newState = {
        shouldDockByHeight:
      this.state.dockedFooterNode.offsetTop >=
      this.state.parentNode.offsetHeight -
        this.state.dockedFooterNode.offsetHeight,
      };
      this.setState(newState);
    }
    this.setAtBottom();
  }

  setAtBottom() {
    if (this.domNodesInState()) {
      let newState = {
        atBottom: this.state.parentNode.scrollHeight - this.state.parentNode.scrollTop === this.state.parentNode.clientHeight,
      };
      this.setState(newState);
    }
  }

  componentWillUnmount() {
    window.removeEventListener('resize', this.throttle(3, this.shouldDock));
    window.removeEventListener(
      'mousemove',
      this.throttle(5, this.setShouldDockByHeight),
      { passive: false },
      { useCapture: true }
    );
    this.state.parentNode.removeEventListener(
      'scroll',
      this.throttle(3, this.setAtBottom),
      { passive: true }
    );
    this.state.parentNode.removeEventListener('wheel', this.throttle(3, this.setAtBottom), {
      passive: true,
    });
    this.state.parentNode.removeEventListener('click', this.shouldDock, {
      passive: true,
    });
    this.state.parentNode.removeEventListener('keydown', this.shouldDock, {
      passive: true,
    });
  }

  render() {
    return (
      <div
        data-test-section={ this.props.testSection }
        ref={ this.dockedFooterRef }
        className={ classNames({
          'oui-docked-footer': true,
          'oui-docked-footer--is-docked': this.state.isDocked,
          'push-double--top': this.props.includesMargin,
        }) }>
        <ButtonRow
          leftGroup={ this.props.leftGroup }
          centerGroup={ this.props.centerGroup }
          rightGroup={ this.props.rightGroup }
          testSection={ this.props.testSection }
        />
      </div>
    );
  }
}

DockedFooter.propTypes = {
  /**
   *  Any components to be included in the DockedFooter
   */
  centerGroup: PropTypes.arrayOf(PropTypes.element),
  /**
   *  Used to determine if there should be top margin
   */
  includesMargin: PropTypes.bool,
  /**
   * Array of buttons for left side
   */
  leftGroup: PropTypes.arrayOf(PropTypes.element),
  /**
   * Array of buttons for right side
   */
  rightGroup: PropTypes.arrayOf(PropTypes.element),
  /**
   * Ref from parent element for DockedFooter to set listeners
   */
  scrollRef: PropTypes.node,
  /**
   * Identifier used to create data-test-section attributes for testing.
   */
  testSection: PropTypes.string.isRequired,
};

DockedFooter.defaultProps = {
  scrollRef: null,
  includesMargin: false,
  testSection: '',
};

export default DockedFooter;

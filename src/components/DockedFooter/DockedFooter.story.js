import React from 'react';
import PropTypes from 'prop-types';

import { storiesOf } from '@storybook/react';
import noop from 'lodash.noop';
import { action } from '@storybook/addon-actions';

import DockedFooter from './index.js';
import Button from '../Button';
import PaginationControls from '../PaginationControls/index.js';
import Code from '../Code/index.js';

/**
 * The DockedFooter has a unique relationship with a parent container component
 * When implementing the DockedFooter, select the parent component or
 * element where you would like the DockedFooter to set its event listeners.
 * Once selected, set a reference on the component or element using
 * React.creatRef() https://reactjs.org/docs/refs-and-the-dom.html
 *
 * After creating and setting a reference on the parent component,
 * pass the reference to the DockedFooter as a prop. See implementation
 * of the ScrollContainer component below.
 */

class ScrollContainer extends React.Component {
  constructor(props) {
    super(props);
    // 1.) create the reference here.
    this.scrollableNodeRef = React.createRef();
    this.state = { scrollable: null };
  }

  componentDidMount() {
    // 3.) Use the ref to store the node in state
    this.setState({ scrollable: this.scrollableNodeRef.current });
  }

  render() {
    return (
      <div
        // 2.) assign the reference to the parent container element/component
        ref={ this.scrollableNodeRef }
        data-test-section="scroll container"
        className="height--300 overflow-y--auto">
        {this.props.children}
        <DockedFooter
          // 4.) Pass the node to the DockedFooter as a prop
          scrollRef={ this.state.scrollable }
          testSection={ 'docked-footer-more-content' }
          includesMargin={ true }
          rightGroup={ !this.props.hasCenterGroup && [
            <Button style="plain" key={ 0 } onClick={ noop }>
              Cancel
            </Button>,
            <Button style="highlight" key={ 1 } onClick={ noop }>
              Confirm
            </Button>,
          ] }
          centerGroup={ this.props.hasCenterGroup && [
            <PaginationControls
              key={ 0 }
              currentPage={ 2 }
              totalPages={ 10 }
              goToPage={ action('page changed') }
            />,
          ] }
        />
      </div>
    );
  }
}

ScrollContainer.propTypes = {
  children: PropTypes.node,
  hasCenterGroup: PropTypes.bool,
};

const stories = storiesOf('DockedFooter', module);
stories
  .addDecorator(story => <div className="soft-quad--sides">{story()}</div>);

stories
  .add(
    'With Less Content', (() => (
      <ScrollContainer >
        <h2 className="push-double--top">Test</h2>
        <p>If the content doesn't overflow the container, the footer has no shadow</p>
      </ScrollContainer>
    ))
  )
  .add(
    'With More Content', (() => (
      <ScrollContainer>
        <div>
          <h2 className="push-double--top">Test</h2>
          <p>Usage of this DockedFooter component looks like:</p>
          <Code
            hasCopyButton={ true }
            testSection='my-code-box'
            type={ 'block' }
            language={ 'js' }>
            { '<DockedFooter \n\t' +
            '// Pass the node to the DockedFooter as a prop' +
            '\n\tscrollRef={ this.state.scrollable }' + '\n\ttestSection=`docked-footer-more-content` }' +
            '\n\tincludesMargin={ true }' +
            '\n\trightGroup={[ \n\t\t<Button style="plain" key={ 0 }' +
            'onClick={ noop }> \n\t\t\tCancel\n\t\t</Button>,' +
            '\n\t\t<Button style="highlight" key={ 1 }' +
            'onClick={ noop }>\n\t\t\tConfirm' +
            '\n\t\t</Button>,\n\t ]} \n />' }
          </Code>
          <p>Test content...</p>
          <p>Test content...</p>
          <p>Test content...</p>
          <p>Keep scrolling...</p>
          <p>Test content...</p>
          <p>Test content...</p>
          <p>Test content...</p>
          <p>Test content...</p>
          <p>Test content...</p>
          <p>Test content...</p>
          <p>Test content...</p>
          <p>Test content...</p>
          <p>Test content...</p>
          <p>Test content...</p>
          <p>Almost there...</p>
          <p>Test content...</p>
          <p>Test content...</p>
          <p>Test content...</p>
          <p>Test content...</p>
          <p>Test content...</p>
          <p>Test content...</p>
          <p>Test content...</p>
          <p>Test content...</p>
          <p>Test content...</p>
          <p>Test content...</p>
          <p>Test content...</p>
          <p>Test content...</p>
        </div>
      </ScrollContainer>
    ))
  ).add(
    'With Different Button Row Content', (() => (
      <ScrollContainer hasCenterGroup={ true }>
        <div>
          <h2 className="push-double--top">Test</h2>
          <p>Usage of this DockedFooter component looks like:</p>
          <Code
            hasCopyButton={ true }
            testSection='my-code-box'
            type={ 'block' }
            language={ 'js' }>
            { '<DockedFooter \n\t' +
            '// Pass the node to the DockedFooter as a prop' +
            '\n\tscrollRef={ this.state.scrollable }' + '\n\ttestSection=`docked-footer-more-content` }' +
            '\n\tincludesMargin={ true }' +
            '\n\tcenterGroup={[ \n\t\t<PaginationControls' +
            '\n\t\t\tkey={ 0 }' +
            '\n\t\t\tcurrentPage={ 2 }' +
            '\n\t\t\ttotalPages={ 10 }' +
            '\n\t\t\tgoToPage={ noop }' +
            '\n\t\t/>' +
            '\n\t ]} \n />' }
          </Code>
          <p>Test content...</p>
          <p>Test content...</p>
          <p>Test content...</p>
          <p>Test content...</p>
          <p>Test content...</p>
          <p>Test content...</p>
          <p>Test content...</p>
          <p>Test content...</p>
          <p>Test content...</p>
          <p>Test content...</p>
          <p>Test content...</p>
          <p>Test content...</p>
          <p>Test content...</p>
          <p>Test content...</p>
          <p>Test content...</p>
          <p>Test content...</p>
          <p>Test content...</p>
          <p>Test content...</p>
          <p>Test content...</p>
          <p>Test content...</p>
          <p>Test content...</p>
          <p>Test content...</p>
          <p>Test content...</p>
          <p>Test content...</p>
          <p>Test content...</p>
        </div>
      </ScrollContainer>
    ))
  );

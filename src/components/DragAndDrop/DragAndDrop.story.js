/* eslint-disable react/prop-types */
import React from 'react';

import { storiesOf } from '@storybook/react';
import { withKnobs } from '@storybook/addon-knobs';
import { action } from '@storybook/addon-actions';

import DragAndDropStateless from './index';
import Token from '../Token';

const itemsWithoutGroups = [
  { id: 1, type: 'item', text: 'Item A' },
  { id: 2, type: 'item', text: 'Item B' },
  { id: 3, type: 'item', text: 'Item C' },
  { id: 4, type: 'item', text: 'Item D' },
  { id: 5, type: 'item', text: 'Item E' },
];

const renderTokenItem = ({ item, index, snapshot }) => (
  <div>
    <Token
      isDraggable={ true }
      name={ item['text'] + '- isDragging? ' + snapshot.isDragging }
      order={ index + 1 }
      showWell={ false }
    />
  </div>
);

const renderTokenItemWithAdjustedDragging = ({ item, index, snapshot, dragHandleProps }) => (
  <div>
    <Token
      isDraggable={ true }
      name={ item['text'] + '- isDragging? ' + snapshot.isDragging }
      showWell={ false }
      usesDragHandle={ true }
      dragHandleProps={ dragHandleProps }
    />
  </div>
);

// Helper wrapper class to store the state so the stories are usable/interactive
class DragAndDrop extends React.Component {
  state = {
    items: this.props.items,
  };

  updateItemOrder = (items) => {
    this.setState({ items });
    this.props.onDragEnd(items);
  };

  render() {
    const { renderItem, idForDroppableRegion, onBeforeCapture, useCustomDragHandle } = this.props;
    return (
      <DragAndDropStateless
        idForDroppableRegion={ idForDroppableRegion }
        items={ this.state.items }
        onBeforeCapture={ onBeforeCapture }
        onDragEnd={ this.updateItemOrder }
        renderItem={ renderItem }
        useCustomDragHandle={ useCustomDragHandle }
      />
    );
  }
}

DragAndDrop.propTypes = DragAndDropStateless.propTypes;
DragAndDrop.defaultProps = DragAndDropStateless.defaultProps;

const stories = storiesOf('DragAndDrop', module);
stories
  .addDecorator(withKnobs)
  .addDecorator(story => <div id="root-preview">{story()}</div>);

stories
  .add('Reordering flat list', () => {
    return (
      <DragAndDrop
        idForDroppableRegion={ 'droppable-story-demo' }
        items={ itemsWithoutGroups }
        onBeforeCapture={ action('do something before dragging begins') }
        onDragEnd={ action('get new order of items') }
        renderItem={ renderTokenItem }
      />
    );
  })
  .add('With custom drag handle', () => {
    return (
      <DragAndDrop
        idForDroppableRegion={ 'droppable-story-demo' }
        items={ itemsWithoutGroups }
        onBeforeCapture={ action('do something before dragging begins') }
        onDragEnd={ action('get new order of items') }
        useCustomDragHandle={ true }
        renderItem={ renderTokenItemWithAdjustedDragging }
      />
    );
  });

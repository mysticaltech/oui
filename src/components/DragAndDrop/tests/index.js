/* eslint-disable react/prop-types */
import React from 'react';
import { mount } from 'enzyme';

import DragAndDrop from '../index';
import Token from '../../Token';

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

describe('components/DragAndDrop', function() {
  it('renders multiple draggable items', () => {
    const component = mount(
      <DragAndDrop
        items={ itemsWithoutGroups }
        renderItem={ renderTokenItem }
        idForDroppableRegion={ 'droppable-test-demo' }
      />
    );
    expect(component.find('li').length).toBe(5);
    expect(component.find('.oui-token').length).toBe(5);
  });

  it('passes drag handle props into child when needed', () => {
    const component = mount(
      <DragAndDrop
        idForDroppableRegion={ 'droppable-test-demo' }
        items={ itemsWithoutGroups }
        useCustomDragHandle={ true }
        renderItem={ renderTokenItemWithAdjustedDragging }
      />
    );
    expect(
      component.find('.oui-token__move [data-rbd-drag-handle-draggable-id="5"]').length
    ).toBe(1);
  });

});

import React from 'react';
import { action } from '@storybook/addon-actions';
import { DragDropContext } from 'react-dnd';
import HTML5Backend from 'react-dnd-html5-backend';
import { withKnobs, boolean } from '@storybook/addon-knobs';
import { storiesOf } from '@storybook/react';

import Token from '../Token';

import { UnwrappedSortable } from './index';

const itemsWithoutGroups = [
  { id: 1, type: 'item', text: 'Item A' },
  { id: 2, type: 'item', text: 'Item B' },
  { id: 3, type: 'item', text: 'Item C' },
  { id: 4, type: 'item', text: 'Item D' },
  { id: 5, type: 'item', text: 'Item E' },
];

const itemsWithGroups = [
  { id: 1, type: 'item', text: 'Item A' },
  [
    { id: 3, type: 'item', text: 'Item B' },
    { id: 4, type: 'item', text: 'Item C' },
  ],
  { id: 5, type: 'item', text: 'Item E' },
  { id: 6, type: 'item', text: 'Item D' },
];

const renderItem = ({
  item,
  position,
  connectDragSource,
}) => connectDragSource(
  <div>
    <Token
      isDraggable={ true }
      name={ item.get('text') }
      order={ position[0] + 1 }
      showWell={ false }
    />
  </div>
);

/**
 * Please note: In order for Storybook's withInfo add-on to parse the Nestable
 * component's prop types, the component cannot be wrapped in its default
 * HTML5Backend context. Therefore, the unwrapped version is imported here and
 * and the DND context is applied to the story preview itself.
 */
const DNDContextContainer = DragDropContext(HTML5Backend)(({ children }) => (
  <div>{ children }</div>
));

const stories = storiesOf('Sortable', module);
stories
  .addDecorator(withKnobs)
  .addDecorator(story => (
    <DNDContextContainer>
      <div id="root-preview">
        { story() }
      </div>
    </DNDContextContainer>
  ));

const changeHandler = (data) => action('onChange')(data.toJS());

stories
  .add('Normal Sorting', (() => {
    return (
      <UnwrappedSortable
        allowGrouping={ boolean('allowGrouping', false) }
        defaultValue={ itemsWithoutGroups }
        onChange={ changeHandler }
        renderItem={ renderItem }
      />
    );
  }))
  .add('Grouped Sorting', (() => {
    return (
      <UnwrappedSortable
        allowGrouping={ boolean('allowGrouping', true) }
        defaultValue={ itemsWithGroups }
        onChange={ changeHandler }
        renderItem={ renderItem }
      />
    );
  }));


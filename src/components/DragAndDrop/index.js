import PropTypes from 'prop-types';
import React from 'react';
import { useCallback } from 'react';
import { DragDropContext, Droppable } from 'react-beautiful-dnd';
import DraggableItem from './DraggableItem';

const DragAndDrop = ({
  idForDroppableRegion,
  items,
  onBeforeCapture,
  onDragEnd,
  renderItem,
  useCustomDragHandle,
}) => {

  const updateOrderOfItems = useCallback(result => {
    const { destination, source } = result;
    if (!destination) {
      return;
    }

    if (
      destination.droppableId === source.droppableId &&
      destination.index === source.index
    ) {
      return;
    }

    const currentItems = items;
    const newOrderOfItems = Array.from(currentItems);
    const [removedItem] = newOrderOfItems.splice(source.index, 1);
    newOrderOfItems.splice(destination.index, 0, removedItem);

    onDragEnd(newOrderOfItems);
  }, [onDragEnd]);

  return (
    <DragDropContext onBeforeCapture={ onBeforeCapture } onDragEnd={ updateOrderOfItems }>
      <Droppable droppableId={ idForDroppableRegion }>
        {provided => (
          <div
            className="oui-sortable"
            ref={ provided.innerRef }
            { ...provided.droppableProps }>
            <ul>
              {items.map((item, index) => (
                <DraggableItem
                  key={ item.id }
                  item={ item }
                  id={ item.id }
                  index={ index }
                  renderFunc={ renderItem }
                  useCustomDragHandle={ useCustomDragHandle }
                />
              ))}
            </ul>
            {provided.placeholder}
          </div>
        )}
      </Droppable>
    </DragDropContext>
  );
};

DragAndDrop.propTypes = {
  /**
   * ID used for this Droppable region
   */
  idForDroppableRegion: PropTypes.string.isRequired,
  /**
   * Array of items to render as DraggableItems
   */
  items: PropTypes.arrayOf(PropTypes.shape({
    id: PropTypes.number,
  })).isRequired,
  /**
   * Function to perform an action before item dimensions are captured
   */
  onBeforeCapture: PropTypes.func,
  /**
   * Function to perform an action after dragging has finished
   */
  onDragEnd: PropTypes.func,
  /**
   * Function used to render each draggable item
   */
  renderItem: PropTypes.func.isRequired,
  /**
   * Whether or not items themselves will make use of the drag handle
   */
  useCustomDragHandle: PropTypes.bool,
};

DragAndDrop.defaultProps = {
  onBeforeCapture: () => {},
  onDragEnd: () => {},
  useCustomDragHandle: false,
};

export default DragAndDrop;

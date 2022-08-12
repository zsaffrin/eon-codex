import { arrayOf, shape, string } from 'prop-types';
import { closestCenter, DndContext, PointerSensor, useSensor, useSensors } from '@dnd-kit/core';
import { SortableContext, verticalListSortingStrategy } from '@dnd-kit/sortable';

import SortableItemListItem from './SortableItemListItem';

const SortableItemList = ({ items, sortKey, handleOrderChange }) => {
  const sensors = useSensors(
    useSensor(PointerSensor)
  );

  const handleDragEnd = ({ active, over }) => {
    handleOrderChange({
      recordId: active.data.current.recordId,
      targetLocation: over.id,
    });
  };

  const itemData = items.map((item) => ({
    ...item,
    id: item[sortKey],
  }));
  
  const listItems = itemData.map((item) => (
    <SortableItemListItem item={item} key={item.key} id={item.id} />
  ));
  
  return (
    <DndContext
      sensors={sensors}
      collisionDetection={closestCenter}
      onDragEnd={handleDragEnd}
    >
      <SortableContext
        items={itemData}
        strategy={verticalListSortingStrategy}
      >
        {listItems}
      </SortableContext>
    </DndContext>
  );
};
SortableItemList.propTypes = {
  items: arrayOf(shape({})),
  sortKey: string,
};
SortableItemList.defaultProps = {
  items: [],
};

export default SortableItemList;

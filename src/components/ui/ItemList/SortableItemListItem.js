import { MdDragHandle } from 'react-icons/md';
import { useSortable } from '@dnd-kit/sortable';
import { CSS } from '@dnd-kit/utilities';
import styled from 'styled-components';

const StyledListItem = styled.div(({ theme, transform, transition }) => {
  const { app, layout, space } = theme;
  
  return `
    background: ${app.backgroundLevel[1]};
    border-radius: ${layout.borderRadius}; 
    display: grid;
    align-items: center;
    grid-gap: ${space.md};
    grid-template-columns: min-content 1fr;
    padding: ${space.md};
    transition: ${transition || 'inherit'};
  `;
});
const StyledHandle = styled(MdDragHandle)`
  cursor: grab;
`;

const SortableItemListItem = ({ item }) => {
  const {attributes, listeners, setNodeRef, transform, transition} = useSortable({
    id: item.id,
    data: {
      recordId: item.key,
    }
  });
  
  return (
    <StyledListItem
      ref={setNodeRef}
      transition={transition}
      id={item.id}
      style={{ transform: CSS.Transform.toString(transform) }}
    >
      <StyledHandle {...attributes} {...listeners} />
      {item.content}
    </StyledListItem>
  );
};
SortableItemListItem.propTypes = {};
SortableItemListItem.defaultProps = {};

export default SortableItemListItem;

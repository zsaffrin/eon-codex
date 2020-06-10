const nextItem = (items, currentItem) => {
  const currentItemIndex = items.findIndex((i) => i.id === currentItem.id);
  const itemIsLast = () => currentItemIndex === items.length + 1;
  const nextItemIndex = currentItemIndex + 1;

  return itemIsLast() ? null : items[nextItemIndex];
};

export default nextItem;

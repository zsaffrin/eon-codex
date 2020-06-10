const prevItem = (items, currentItem) => {
  const currentItemIndex = items.findIndex((i) => i.id === currentItem.id);
  const itemIsFirst = () => currentItemIndex === 1;
  const prevItemIndex = currentItemIndex - 1;

  return itemIsFirst() ? null : items[prevItemIndex];
};

export default prevItem;

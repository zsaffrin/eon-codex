const moveArrayItem = (items, currentIndex, newIndex) => {
  items.splice(newIndex, 0, items.splice(currentIndex, 1)[0]);
  return items;
};

export default moveArrayItem;

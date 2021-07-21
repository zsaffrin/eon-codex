const formatDate = (date, withDay = true) => {
  const options = {
    year: 'numeric',
    month: 'short',
    day: 'numeric',
  };
  if (withDay) {
    options.weekday = 'short';
  }
  
  return date.toLocaleDateString('en-US', options);
};

export default formatDate;

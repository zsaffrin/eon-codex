/**
 * Render date object as formatted string
 * @param {date} date The date object to format
 * @param {boolean} withDay False to suppress DayOfWeek string
 * @returns {string} Formatted date
 */
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

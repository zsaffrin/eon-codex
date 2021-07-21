const maxFieldValue = (items, fieldKey, min) => items.reduce((acc, item) => {
  if (min) {
    return (
      acc && acc <= item[fieldKey] ? acc : item[fieldKey]
    );
  }

  return (
    acc && acc >= item[fieldKey] ? acc : item[fieldKey]
  );
}, null);

export default maxFieldValue;

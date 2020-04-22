import useCollection from './useCollection';

const useSchemaFields = (schemaId) => {
  const [fields, fieldsLoading, fieldsError] = useCollection('schemaFields', [
    'schema',
    '==',
    schemaId,
  ]);
  return [fields, fieldsLoading, fieldsError];
};

export default useSchemaFields;

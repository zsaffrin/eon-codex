import { useCollection, useDocument } from './';
import { sortByKey } from '../utilities';

const useSchema = (schemaId) => {
  const [schema, schemaLoading, schemaError] = useDocument(`schemas/${schemaId}`);
  const [schemaFields, schemaFieldsLoading, schemaFieldsError] = useCollection('schemaFields', [
    'schema', '==', schemaId
  ]);

  const isLoading = schemaLoading || schemaFieldsLoading;

  const error = schemaError || schemaFieldsError || null;

  const schemaData = isLoading || !schema || !schemaFields ? null : {
    ...schema,
    fields: sortByKey(schemaFields, 'displayOrder'),
  };

  return [schemaData, isLoading, error];
};

export default useSchema;

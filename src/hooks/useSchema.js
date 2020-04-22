import useDocument from './useDocument';

const useSchema = (schemaId) => {
  const [schema, schemaLoading, schemaError] = useDocument(
    `schemas/${schemaId}`,
  );
  return [schema, schemaLoading, schemaError];
};

export default useSchema;

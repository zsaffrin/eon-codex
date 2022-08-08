import { arrayOf, shape } from "prop-types";
import { useEffect, useState } from "react";

const useFormValidation = (rules) => {
  const [isFormValid, setIsFormValid] = useState(false);

  useEffect(() => {
    setIsFormValid(rules.reduce((rule, acc) => {
      return acc ? false : acc;
    }, true));
  }, [rules]);

  return [isFormValid];
};
useFormValidation.propTypes = {
  rules: arrayOf(shape({})),
};

export default useFormValidation;

import { useState } from "react";

const useInput = (defaultVal) => {
  const [value, setValue] = useState(defaultVal);
  const [formErrors, setFormErrors] = useState({});
  const [IsFormValid, setIsFormValid] = useState(false);

  const onChangeHandler = (e) => {
    const { name, value } = e.target;
    if (value === "") {
      setIsFormValid(false);
    } else {
      setIsFormValid(true);
    }

    setValue((prevValue) => {
      return {
        ...prevValue,
        [name]: value,
      };
    });
  };

  const onBlurHandler = (e) => {
    const { name, value } = e.target;
    if (value === "") {
      setIsFormValid(false);
    } else {
      setIsFormValid(true);
    }
    if (name === "habitName" && value === "") {
      setFormErrors((prevValue) => {
        return {
          ...prevValue,
          [name]: "Habit name cannot be empty",
        };
      });
    }
  };

  return {
    value,
    formErrors,
    IsFormValid,
    onChangeHandler,
    onBlurHandler,
  };
};

export default useInput;

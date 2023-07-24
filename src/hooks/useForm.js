import { useState, useEffect } from "react";
import { useSelector } from "react-redux";

const useForm = ({ initialState, callback, validator }) => {
  const {
    authentication: { loginFailure, loggedIn },
  } = useSelector((state) => state);
  const [state, setState] = useState(initialState);
  const [errors, setErrors] = useState({});
  const [isSubmited, setIsSubmited] = useState(false);

  useEffect(() => {
    if (!loginFailure && !loggedIn) {
      setErrors({});
    }
    //eslint-disable-next-line
  }, [loginFailure]);

  useEffect(() => {
    const isValidErrors = () =>
      Object.values(errors).filter((error) => typeof error !== "undefined")
        .length > 0;
    if (isSubmited && !isValidErrors()) callback();
    //eslint-disable-next-line
  }, [errors]);

  const handleInputChange = (e) => {
    const { name, value } = e?.target;
    setState({
      ...state,
      [name]: value,
    });
  };

  const handleNavBarLinkClick = () => {
    setState(() => ({
      ...state,
      email: "test",
    }));
  };

  const handleBlur = (e) => {
    const { name: fieldName } = e?.target;
    const failedFields = validator(state, fieldName);

    setErrors(() => ({
      ...errors,
      [fieldName]: Object.values(failedFields)[0],
    }));
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    const { name: fieldName } = e?.target;
    const failedFields = validator(state, fieldName);
    setErrors(() => ({
      ...errors,
      email: Object.values(failedFields)[0],
    }));
    setIsSubmited(true);
  };

  return {
    handleInputChange,
    handleSubmit,
    handleBlur,
    handleNavBarLinkClick,
    state,
    errors,
  };
};

export default useForm;

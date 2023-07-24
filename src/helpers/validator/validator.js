import { errorTexts } from "constants/errorTexts";

import ErrorMessage from "components/ErrorMessage/ErrorMessage";

export const validator = (values, fieldName) => {
  let errors = {};
  switch (fieldName) {
    case "email":
      validateEmail(values?.email, errors);
      break;
    case "password":
      validatePassword(values?.password, errors);
      break;
    case "campaignId":
      validateCampaignId(values?.campaignId, errors);
      break;
    case "budgetPercentage":
      validateBudgetPercentage(values?.budgetPercentage, errors);
      break;
    default:
  }
  return errors;
};

const validateEmail = (email, errors) => {
  let result = true;
  const emailRegex =
    /^(([^<>()[\]\\.,;:\s@"]+(\.[^<>()[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
  result = emailRegex.test(String(email).toLowerCase());
  if (!result && email) {
    errors.email = <ErrorMessage text={errorTexts.invalidEmail} />;
  }

  return result;
};

const validatePassword = (pass, errors) => {
  let result = true;
  if (pass) {
    const passwordRegex =
      /(?=[A-Za-z0-9@#$%^&+!=]+$)^(?=.*[a-z])(?=.*[A-Z])(?=.*[0-9])(?=.{8,}).*$/;
    result = passwordRegex.test(pass);

    if (!result) {
      errors.password = <ErrorMessage text={errorTexts.password} />;
      result = false;
    } else if (pass.length < 10) {
      errors.password = <ErrorMessage text={errorTexts.password} />;
      result = false;
    }
  }
  return result;
};

export const validateDomain = (email, companyNameArr) => {
  let match = email.split(/^\w+@(\w+).\w+$/);
  return match !== null && companyNameArr.includes(match[1]);
};

export const validateCampaignId = (campaignId, errors) => {
  let result = true;
  const onlyNumbers = /^[0-9]*$/;
  result = !onlyNumbers.test(campaignId);

  if (result) {
    errors.campaignId = <ErrorMessage text={errorTexts.campaignId} />;
  }

  return result;
};

export const validateBudgetPercentage = (budgetPercentage, errors) => {
  let result = true;
  const onlyNumbers = /^[0-9]*$/;
  result =
    onlyNumbers.test(budgetPercentage) &&
    budgetPercentage > 0 &&
    budgetPercentage <= 100;

  if (!result) {
    errors.budgetPercentage = <ErrorMessage text="only numbers" />;
  }
};

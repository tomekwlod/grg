export const validationString = ({ value }) => {
  return value !== "";
};

export const validationEmail = ({ value }) => {
  if (
    /^[a-zA-Z0-9.!#$%&'*+/=?^_`{|}~-]+@[a-zA-Z0-9-]+(?:\.[a-zA-Z0-9-]+)*$/.test(
      value
    )
  ) {
    return true;
  }
  return false;
};

export const validationCheckbox = ({ value }) => {
  return value;
};

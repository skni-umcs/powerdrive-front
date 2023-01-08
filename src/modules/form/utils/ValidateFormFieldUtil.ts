import { FormFieldData } from "../../../models/ui/FormFieldData";

export const validateFormField = (formField: FormFieldData): FormFieldData => {
  let hasError = false;
  let errorText = " ";
  formField.validators.forEach((validator) => {
    let validationRes = validator(formField.content);
    if (validationRes.hasError) {
      hasError = true;
      errorText = validationRes.errorText;
    }
  });

  return {
    ...formField,
    hasError,
    errorText,
  };
};

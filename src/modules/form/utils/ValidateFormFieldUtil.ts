import { FormFieldData } from "../../../models/ui/FormFieldData";
import { LANGUAGE } from "../../../services/LanguageService";

export const validateFormField = (formField: FormFieldData): FormFieldData => {
  let hasError = false;
  let errorText = " ";
  formField.validators.forEach((validator) => {
    let validationRes = validator(formField.content);
    if (validationRes.hasError) {
      hasError = true;
      errorText =
        LANGUAGE.AUTH.ERRORS[
          validationRes.errorText as keyof typeof LANGUAGE.AUTH.ERRORS
        ];
    }
  });

  return {
    ...formField,
    hasError,
    errorText,
  };
};

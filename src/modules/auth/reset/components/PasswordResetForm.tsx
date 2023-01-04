import React, { useState } from "react";
import { RequiredValidator } from "../../../form/validators/RequiredValidator";
import { PasswordResetFormData } from "../../../../models/ui/PasswordResetFormData";
import { FormValidatorFunction } from "../../../../models/ui/FormValidatorFunction";
import { PasswordRepValidator } from "../../../form/validators/PasswordRepValidator";
import { validateFormField } from "../../../form/utils/ValidateFormFieldUtil";
import { LANGUAGE } from "../../../../services/LanguageService";
import { PropsBase } from "../../../../models/api/PropsBase";
import { PasswordResetData } from "../../../../models/api/PasswordResetData";
import { TextField } from "@mui/material";
import { LoadingButton } from "@mui/lab";
import { PasswordValidator } from "../../../form/validators/PasswordValidator";

interface PasswordResetFormProps extends PropsBase {
  onSubmit: (formData: PasswordResetData) => void;
  isLoading: boolean;
}
const PasswordResetForm = ({ onSubmit, isLoading }: PasswordResetFormProps) => {
  const [formData, setFormData] = useState<PasswordResetFormData>({
    password: {
      content: "",
      hasError: false,
      errorText: "",
      validators: [RequiredValidator, PasswordValidator],
    },
    repeatPassword: {
      content: "",
      hasError: false,
      errorText: "",
      validators: [RequiredValidator],
    },
  });

  const [formValidators] = useState<FormValidatorFunction[]>([
    PasswordRepValidator,
  ]);

  const handleFormChange = (
    value: string,
    fieldName: keyof PasswordResetFormData
  ): void => {
    const updatedFormField = {
      ...formData[fieldName],
      content: value,
    };

    setFormData({
      ...formData,
      [fieldName]: validateFormField(updatedFormField),
    });
  };

  const handleSubmit = (): void => {
    const currentFormData: PasswordResetFormData = { ...formData };
    let hasError = false;

    for (let field in currentFormData) {
      currentFormData[field as keyof PasswordResetFormData] = validateFormField(
        currentFormData[field as keyof PasswordResetFormData]
      );

      hasError =
        hasError ||
        currentFormData[field as keyof PasswordResetFormData].hasError;
    }

    for (let validator of formValidators) {
      const validationRes = validator(currentFormData);
      for (let error of validationRes) {
        currentFormData[error.fieldName].hasError = true;
        currentFormData[error.fieldName].errorText =
          LANGUAGE.AUTH.ERRORS[
            error.errorText as keyof typeof LANGUAGE.AUTH.ERRORS
          ];
      }

      hasError = hasError || validationRes.length > 0;
    }

    setFormData(currentFormData);

    if (hasError) return;
    else
      onSubmit({
        resetId: "",
        password: formData.password.content,
      });
  };

  return (
    <div className="app__auth__card__form">
      <TextField
        error={formData.password.hasError}
        fullWidth
        margin="dense"
        type="password"
        label={LANGUAGE.AUTH.PASSWORD}
        variant="filled"
        value={formData.password.content}
        onChange={(e) => handleFormChange(e.target.value, "password")}
        helperText={
          formData.password.hasError ? formData.password.errorText : " "
        }
      />
      <TextField
        error={formData.repeatPassword.hasError}
        fullWidth
        margin="dense"
        type="password"
        label={LANGUAGE.AUTH.REPEAT_PASSWORD}
        variant="filled"
        value={formData.repeatPassword.content}
        onChange={(e) => handleFormChange(e.target.value, "repeatPassword")}
        helperText={
          formData.repeatPassword.hasError
            ? formData.repeatPassword.errorText
            : " "
        }
      />
      <div className="app__m-2">
        <LoadingButton
          loading={isLoading}
          onClick={handleSubmit}
          variant="contained"
        >
          {LANGUAGE.AUTH.REGISTER}
        </LoadingButton>
      </div>
    </div>
  );
};

export default PasswordResetForm;

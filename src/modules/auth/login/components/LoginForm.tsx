import React, { useState } from "react";
import { TextField } from "@mui/material";
import { LoadingButton } from "@mui/lab";
import { LoginFormData } from "../../../../models/ui/LoginFormData";
import { RequiredValidator } from "../../../form/validators/RequiredValidator";
import { FormFieldData } from "../../../../models/ui/FormFieldData";
import { PropsBase } from "../../../../models/api/PropsBase";
import { LoginData } from "../../../../models/api/LoginData";

interface LoginFormProps extends PropsBase {
  onSubmit: (formData: LoginData) => void;
  isLoading: boolean;
}
const LoginForm = ({ onSubmit, isLoading }: LoginFormProps) => {
  const [formData, setFormData] = useState<LoginFormData>({
    username: {
      content: "",
      hasError: false,
      errorText: "",
      validators: [RequiredValidator],
    },
    password: {
      content: "",
      hasError: false,
      errorText: "",
      validators: [RequiredValidator],
    },
  });

  const validateFormField = (formField: FormFieldData): FormFieldData => {
    let hasError = false;
    let errorText = "";
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

  const handleFormChange = (
    value: string,
    fieldName: keyof LoginFormData
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
    const currentFormData: LoginFormData = { ...formData };
    let hasError = false;

    for (let field in currentFormData) {
      currentFormData[field as keyof LoginFormData] = validateFormField(
        currentFormData[field as keyof LoginFormData]
      );

      hasError =
        hasError || currentFormData[field as keyof LoginFormData].hasError;
    }

    setFormData(currentFormData);

    if (hasError) return;
    else
      onSubmit({
        username: formData.username.content,
        password: formData.password.content,
      });
  };

  return (
    <div className="app__auth__card__form">
      <TextField
        error={formData.username.hasError}
        fullWidth
        margin="normal"
        label="Nazwa użytkownika"
        variant="filled"
        value={formData.username.content}
        onChange={(e) => handleFormChange(e.target.value, "username")}
        helperText={
          formData.username.hasError ? formData.username.errorText : ""
        }
      />
      <TextField
        error={formData.password.hasError}
        fullWidth
        margin="normal"
        type="password"
        label="Hasło"
        variant="filled"
        value={formData.password.content}
        onChange={(e) => handleFormChange(e.target.value, "password")}
        helperText={
          formData.password.hasError ? formData.password.errorText : ""
        }
      />
      <div className="app__m-2">
        <LoadingButton
          loading={isLoading}
          onClick={handleSubmit}
          variant="contained"
        >
          Zaloguj
        </LoadingButton>
      </div>
    </div>
  );
};

export default LoginForm;

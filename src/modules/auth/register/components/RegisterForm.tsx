import React, { useEffect, useState } from "react";
import { RegisterFormData } from "../../../../models/ui/RegisterFormData";
import { RequiredValidator } from "../../../form/validators/RequiredValidator";
import { language$ } from "../../../../services/LanguageService";
import { PropsBase } from "../../../../models/api/PropsBase";
import { RegisterData } from "../../../../models/api/RegisterData";
import { RegisterErrorTypeEnum } from "../../../../enums/RegisterErrorTypeEnum";
import { Grid, Snackbar, TextField } from "@mui/material";
import { Alert, LoadingButton } from "@mui/lab";
import { EmailValidator } from "../../../form/validators/EmailValidator";
import { PasswordValidator } from "../../../form/validators/PasswordValidator";
import { FormValidatorFunction } from "../../../../models/ui/FormValidatorFunction";
import { PasswordRepValidator } from "../../../form/validators/PasswordRepValidator";
import { validateFormField } from "../../../form/utils/ValidateFormFieldUtil";
import { bind } from "react-rxjs";

const [useLanguage] = bind(language$);

interface RegisterFormProps extends PropsBase {
  onSubmit: (formData: RegisterData) => void;
  isLoading: boolean;
  error: RegisterErrorTypeEnum | null;
  attempts: number;
}
const RegisterForm = ({
  onSubmit,
  isLoading,
  error,
  attempts,
}: RegisterFormProps) => {
  const LANGUAGE = useLanguage();
  const [formData, setFormData] = useState<RegisterFormData>({
    email: {
      content: "",
      hasError: false,
      errorText: " ",
      validators: [RequiredValidator, EmailValidator],
    },
    first_name: {
      content: "",
      hasError: false,
      errorText: " ",
      validators: [RequiredValidator],
    },
    last_name: {
      content: "",
      hasError: false,
      errorText: " ",
      validators: [RequiredValidator],
    },
    username: {
      content: "",
      hasError: false,
      errorText: " ",
      validators: [RequiredValidator],
    },
    password: {
      content: "",
      hasError: false,
      errorText: " ",
      validators: [RequiredValidator, PasswordValidator],
    },
    repeatPassword: {
      content: "",
      hasError: false,
      errorText: " ",
      validators: [RequiredValidator],
    },
  });

  const [formValidators] = useState<FormValidatorFunction[]>([
    PasswordRepValidator,
  ]);
  const [errorSnackbarOpen, setErrorSnackbarOpen] = useState(false);

  const handleCloseErrorSnackbar = () => {
    setErrorSnackbarOpen(false);
  };

  useEffect(() => {
    if (error) {
      if (error === RegisterErrorTypeEnum.EMAIL_ALREADY_IN_USE) {
        setFormData((prev) => ({
          ...prev,
          email: {
            ...prev.email,
            hasError: true,
            errorText:
              LANGUAGE.AUTH.ERRORS[error as keyof typeof LANGUAGE.AUTH.ERRORS],
          },
        }));
      } else if (error === RegisterErrorTypeEnum.USERNAME_TAKEN) {
        setFormData((prev) => ({
          ...prev,
          username: {
            ...prev.username,
            hasError: true,
            errorText:
              LANGUAGE.AUTH.ERRORS[error as keyof typeof LANGUAGE.AUTH.ERRORS],
          },
        }));
      } else {
        setErrorSnackbarOpen(true);
      }
    }
  }, [error, attempts]);

  const handleFormChange = (
    value: string,
    fieldName: keyof RegisterFormData
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
    const currentFormData: RegisterFormData = { ...formData };
    let hasError = false;

    for (let field in currentFormData) {
      currentFormData[field as keyof RegisterFormData] = validateFormField(
        currentFormData[field as keyof RegisterFormData]
      );

      hasError =
        hasError || currentFormData[field as keyof RegisterFormData].hasError;
    }

    for (let validator of formValidators) {
      const validationRes = validator(currentFormData);
      for (let error of validationRes) {
        currentFormData[error.fieldName].hasError = true;
        currentFormData[error.fieldName].errorText = error.errorText;
      }

      hasError = hasError || validationRes.length > 0;
    }

    setFormData(currentFormData);

    if (hasError) return;
    else
      onSubmit({
        email: formData.email.content,
        first_name: formData.first_name.content,
        last_name: formData.last_name.content,
        username: formData.username.content,
        password: formData.password.content,
      });
  };

  return (
    <div
      className="app__auth__card__form"
      onKeyDown={(event) => (event.key === "Enter" ? handleSubmit() : null)}
    >
      <Grid container spacing={2}>
        <Grid item xs={12} sm={6}>
          <TextField
            error={formData.email.hasError}
            fullWidth
            margin="dense"
            label={LANGUAGE.AUTH.EMAIL}
            variant="filled"
            value={formData.email.content}
            onChange={(e) => handleFormChange(e.target.value, "email")}
            helperText={
              formData.email.hasError
                ? LANGUAGE.AUTH.ERRORS[formData.email.errorText]
                : " "
            }
          />
          <TextField
            error={formData.first_name.hasError}
            fullWidth
            margin="dense"
            label={LANGUAGE.AUTH.NAME}
            variant="filled"
            value={formData.first_name.content}
            onChange={(e) => handleFormChange(e.target.value, "first_name")}
            helperText={
              formData.first_name.hasError
                ? LANGUAGE.AUTH.ERRORS[formData.name.errorText]
                : " "
            }
          />
          <TextField
            error={formData.last_name.hasError}
            fullWidth
            margin="dense"
            label={LANGUAGE.AUTH.SURNAME}
            variant="filled"
            value={formData.last_name.content}
            onChange={(e) => handleFormChange(e.target.value, "last_name")}
            helperText={
              formData.last_name.hasError
                ? LANGUAGE.AUTH.ERRORS[formData.surname.errorText]
                : " "
            }
          />
        </Grid>
        <Grid item xs={12} sm={6}>
          <TextField
            error={formData.username.hasError}
            fullWidth
            margin="dense"
            label={LANGUAGE.AUTH.USERNAME}
            variant="filled"
            value={formData.username.content}
            onChange={(e) => handleFormChange(e.target.value, "username")}
            helperText={
              formData.username.hasError
                ? LANGUAGE.AUTH.ERRORS[formData.username.errorText]
                : " "
            }
          />
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
              formData.password.hasError
                ? LANGUAGE.AUTH.ERRORS[formData.password.errorText]
                : " "
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
                ? LANGUAGE.AUTH.ERRORS[formData.repeatPassword.errorText]
                : " "
            }
          />
        </Grid>
      </Grid>
      <div className="app__m-2">
        <LoadingButton
          loading={isLoading}
          onClick={handleSubmit}
          variant="contained"
        >
          {LANGUAGE.AUTH.REGISTER}
        </LoadingButton>
      </div>
      <Snackbar
        open={errorSnackbarOpen}
        autoHideDuration={6000}
        onClose={handleCloseErrorSnackbar}
        anchorOrigin={{ vertical: "bottom", horizontal: "right" }}
      >
        <Alert severity="error" onClose={handleCloseErrorSnackbar}>
          {LANGUAGE.AUTH.ERRORS.SERVER_ERROR}
        </Alert>
      </Snackbar>
    </div>
  );
};

export default RegisterForm;

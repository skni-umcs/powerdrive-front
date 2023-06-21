import React, { useEffect, useState } from "react";
import { IconButton, InputAdornment, Snackbar, TextField } from "@mui/material";
import { Alert, LoadingButton } from "@mui/lab";
import { LoginFormData } from "../../../../models/ui/LoginFormData";
import { RequiredValidator } from "../../../form/validators/RequiredValidator";
import { PropsBase } from "../../../../models/api/PropsBase";
import { LoginData } from "../../../../models/api/LoginData";
import { language$ } from "../../../../services/LanguageService";
import { LoginErrorTypeEnum } from "../../../../enums/LoginErrorTypeEnum";
import { validateFormField } from "../../../form/utils/ValidateFormFieldUtil";
import { bind } from "react-rxjs";
import { Visibility, VisibilityOff } from "@mui/icons-material";

const [useLanguage] = bind(language$);

interface LoginFormProps extends PropsBase {
  onSubmit: (formData: LoginData) => void;
  isLoading: boolean;
  error: LoginErrorTypeEnum | null;
  attempts: number;
}
const LoginForm = ({
  onSubmit,
  isLoading,
  error,
  attempts,
}: LoginFormProps) => {
  const LANGUAGE = useLanguage();
  const [passwordVisible, setPasswordVisible] = useState(false);
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
  const [errorSnackbarOpen, setErrorSnackbarOpen] = useState(false);

  const handleCloseErrorSnackbar = () => {
    setErrorSnackbarOpen(false);
  };

  useEffect(() => {
    if (error) {
      if (error === LoginErrorTypeEnum.LOGIN_ERROR) {
        setFormData((prev) => ({
          ...prev,
          password: {
            ...prev.password,
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
    <div
      className="app__auth__card__form"
      onKeyDown={(event) => (event.key === "Enter" ? handleSubmit() : null)}
    >
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
        type={passwordVisible ? "text" : "password"}
        label={LANGUAGE.AUTH.PASSWORD}
        variant="filled"
        value={formData.password.content}
        onChange={(e) => handleFormChange(e.target.value, "password")}
        helperText={
          formData.password.hasError
            ? LANGUAGE.AUTH.ERRORS[formData.password.errorText]
            : " "
        }
        InputProps={{
          endAdornment: (
            <InputAdornment position="end">
              <IconButton
                onClick={() => setPasswordVisible(!passwordVisible)}
                edge="end"
              >
                {passwordVisible ? <Visibility /> : <VisibilityOff />}
              </IconButton>
            </InputAdornment>
          ),
        }}
      />
      <div className="app__m-2">
        <LoadingButton
          loading={isLoading}
          onClick={handleSubmit}
          variant="contained"
        >
          {LANGUAGE.AUTH.LOGIN}
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

export default LoginForm;

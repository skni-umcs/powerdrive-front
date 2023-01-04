import React, { useState } from "react";
import { TextField } from "@mui/material";
import { LANGUAGE } from "../../../../services/LanguageService";
import { LoadingButton } from "@mui/lab";
import { FormFieldData } from "../../../../models/ui/FormFieldData";
import { RequiredValidator } from "../../../form/validators/RequiredValidator";
import { EmailValidator } from "../../../form/validators/EmailValidator";
import { validateFormField } from "../../../form/utils/ValidateFormFieldUtil";
import { PropsBase } from "../../../../models/api/PropsBase";
import { AccountRetrievalData } from "../../../../models/api/AccountRetrievalData";

interface AccountRetrievalFormProps extends PropsBase {
  onSubmit: (formData: AccountRetrievalData) => void;
  isLoading: boolean;
}
const AccountRetrievalForm = ({
  onSubmit,
  isLoading,
}: AccountRetrievalFormProps) => {
  const [emailField, setEmailField] = useState<FormFieldData>({
    content: "",
    hasError: false,
    errorText: "",
    validators: [RequiredValidator, EmailValidator],
  });

  const handleFormChange = (value: string): void => {
    const updatedFormField = { ...emailField, content: value };
    setEmailField(validateFormField(updatedFormField));
  };

  const handleSubmit = (): void => {
    const updatedFormField = validateFormField(emailField);
    setEmailField(updatedFormField);
    if (updatedFormField.hasError) return;

    onSubmit({ email: updatedFormField.content });
  };

  return (
    <div className="app__auth__card__form">
      <TextField
        error={emailField.hasError}
        fullWidth
        margin="dense"
        label={LANGUAGE.AUTH.EMAIL}
        variant="filled"
        value={emailField.content}
        onChange={(e) => handleFormChange(e.target.value)}
        helperText={emailField.hasError ? emailField.errorText : " "}
      />
      <div className="app__m-2">
        <LoadingButton
          loading={isLoading}
          onClick={handleSubmit}
          variant="contained"
        >
          {LANGUAGE.AUTH.SEND_LINK}
        </LoadingButton>
      </div>
    </div>
  );
};

export default AccountRetrievalForm;
